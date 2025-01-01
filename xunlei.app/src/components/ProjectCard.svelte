<script>
    import { onMount } from "svelte";

    export let name = "";
    export let description = "";
    export let language = "";
    export let tags = [];
    export let httpsLink = "";
    export let sshLink = "";
    export let website = "";

    export let currentPopup = "";
    export let setCurrentPopup;

    let selectedProtocol = "HTTPS";

    $: cloneUrl = selectedProtocol === "HTTPS"
        ? httpsLink
        : selectedProtocol === "SSH"
        ? sshLink
        : selectedProtocol === "Website" && website
        ? website
        : "";

    const languageColors = {
        Svelte: "#FF3E00",
        Python: "#3572A5",
        HTML: "#E34C26",
        Rust: "#DEA584",
        C: "#178600",
        Default: "#999",
    };

    $: languageColor = languageColors[language] || languageColors.Default;

    $: isPopupVisible = currentPopup === name;

    const closePopup = () => {
        setCurrentPopup("");
    };

    const adjustPopupPosition = () => {
        const popup = document.querySelector(`.popup[data-name="${name}"]`);
        const codeButton = document.querySelector(`.code-button[data-name="${name}"]`);

        if (popup instanceof HTMLElement && codeButton instanceof HTMLElement) {
            const buttonRect = codeButton.getBoundingClientRect();
            const popupHeight = popup.offsetHeight;
            const viewportHeight = window.innerHeight;

            // 检查弹窗是否超出视图底部
            if (buttonRect.bottom + popupHeight + 8 > viewportHeight) {
                // 如果超出，则调整到按钮上方
                popup.style.top = "auto";
                popup.style.bottom = "20%"; // 在按钮上方
                popup.style.transform = "translateX(-50%) translateY(-8px)"; // 上方微调
            } else {
                // 否则保持在按钮下方
                popup.style.top = "100%"; // 在按钮下方
                popup.style.bottom = "auto";
                popup.style.transform = "translateX(-50%) translateY(8px)"; // 下方微调
            }

            // 显示弹窗
            popup.style.visibility = "visible";
        }
    };












    const handleOutsideClick = (event) => {
        const popup = document.querySelector(`.popup[data-name="${name}"]`);
        const codeButton = document.querySelector(`.code-button[data-name="${name}"]`);

        if (
            (popup && popup.contains(event.target)) ||
            (codeButton && codeButton.contains(event.target))
        ) {
            return;
        }

        if (isPopupVisible) {
            closePopup();
        }
    };

    onMount(() => {
        document.addEventListener("click", handleOutsideClick);
        window.addEventListener("resize", adjustPopupPosition);

        // 调整初始弹窗位置
        if (isPopupVisible) {
            adjustPopupPosition();
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
            window.removeEventListener("resize", adjustPopupPosition);
        };
    });
</script>

<!-- 项目卡片 -->
<div class="project-card-container">
    <div class="project-card">
        <div class="content">
            <h2>{name}</h2>
            <p>{description}</p>
            <div class="language">
                <span
                    class="language-dot"
                    style="background-color: {languageColor};"
                ></span>
                {language}
            </div>
            {#if tags.length > 0}
                <div class="tags">
                    {#each tags as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="actions">
            <button
                class="code-button"
                data-name={name}
                on:click={() => {
                    setCurrentPopup(isPopupVisible ? "" : name); // 切换弹窗显示状态
                    if (!isPopupVisible) {
                        setTimeout(adjustPopupPosition, 0); // 调整弹窗位置
                    }
                }}
            >
                Code
            </button>
        </div>
    </div>

    {#if isPopupVisible}
        <div class="popup" data-name={name}>
            <div class="popup-content">
                <div class="protocol-switch">
                    <button
                        class:selected={selectedProtocol === "HTTPS"} 
                        on:click={() => (selectedProtocol = "HTTPS")} 
                    >
                        HTTPS
                    </button>
                    <button
                        class:selected={selectedProtocol === "SSH"} 
                        on:click={() => (selectedProtocol = "SSH")} 
                    >
                        SSH
                    </button>
                    {#if website}
                        <button
                            class:selected={selectedProtocol === "Website"} 
                            on:click={() => (selectedProtocol = "Website")} 
                        >
                            Website
                        </button>
                    {/if}
                </div>
                <div class="link-display">
                    <input type="text" value={cloneUrl} readonly />
                </div>
            </div>
        </div>
    {/if}
</div>


<style>
    /* 项目卡片容器样式 */
    .project-card-container {
        position: relative; /* 确保弹窗的定位基于整个卡片容器 */
        display: flex;
        justify-content: center; /* 水平居中 */
        margin-bottom: 1rem; /* 每个项目卡片之间的间距 */
    }

    /* 项目卡片样式 */
    .project-card {
        background: #1e1e1e; /* 卡片背景颜色 */
        color: white; /* 字体颜色 */
        padding: 0.5rem; /* 内边距 */
        border-radius: 8px; /* 圆角边框 */
        display: flex; /* 使用 flex 布局 */
        flex-direction: column; /* 子元素垂直排列 */
        align-items: stretch; /* 子元素宽度与父容器一致 */
        width: 50%; /* 卡片宽度 */
    }

    /* 操作区域样式 */
    .actions {
        display: flex;
        justify-content: flex-end; /* 按钮对齐到右侧 */
        align-items: flex-start; /* 按钮与顶部对齐 */
        height: 100%; /* 高度与卡片内容匹配 */
    }

    /* Code 按钮样式 */
    .code-button {
        padding: 0.5rem 1rem; /* 按钮内边距 */
        background-color: #007bff; /* 按钮背景色 */
        color: white; /* 按钮文字颜色 */
        border: none; /* 无边框 */
        border-radius: 4px; /* 按钮圆角 */
        cursor: pointer; /* 鼠标悬停样式 */
        position: relative; /* 设置相对定位 */
        z-index: 10; /* 确保按钮在最上方 */
    }

    /* Code 按钮悬停样式 */
    .code-button:hover {
        border-bottom: 2px solid #007bff; /* 悬停时显示下划线 */
        color: #0056b3; /* 悬停时文字颜色 */
    }

  
    .popup {
        position: absolute; /* 基于父容器定位 */
        top: 100%; /* 默认在按钮下方 */
        left: 70%; /* 水平居中 */
        transform: translateX(-50%) translateY(8px); /* 微调位置 */
        background: #333; /* 弹窗背景色 */
        color: white; /* 字体颜色 */
        padding: 1rem; /* 内边距 */
        border-radius: 8px; /* 圆角边框 */
        z-index: 1000; /* 确保弹窗在最上层 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
        width: 300px; /* 弹窗宽度 */
        max-width: 90%; /* 防止弹窗过宽 */
        word-wrap: break-word; /* 自动换行 */
        visibility: hidden; /* 默认隐藏 */
        transition: transform 0.2s ease, top 0.2s ease; /* 平滑过渡效果 */
    }





    /* 协议切换按钮组样式 */
    .protocol-switch button {
        margin-right: 8px; /* 按钮之间的间距 */
    }

    /* 协议切换按钮选中样式 */
    .protocol-switch button.selected {
        background: #007bff; /* 高亮选中按钮的背景颜色 */
    }

    /* 链接输入框样式 */
    .link-display input {
        width: 100%; /* 输入框宽度 */
        padding: 0.5rem; /* 内边距 */
        border: 1px solid #555; /* 边框颜色 */
        border-radius: 4px; /* 圆角 */
        background: #222; /* 输入框背景色 */
        color: white; /* 输入框文字颜色 */
    }

    /* 显示编程语言部分样式 */
    .language {
        display: flex; /* 使用 flex 布局 */
        align-items: center; /* 垂直居中对齐 */
        margin-bottom: 0.5rem; /* 与下面标签部分保持一定间距 */
        font-size: 1rem; /* 字体大小 */
    }

    /* 小圆点样式，用于表示语言颜色 */
    .language-dot {
        width: 10px; /* 小圆点宽度 */
        height: 10px; /* 小圆点高度 */
        border-radius: 50%; /* 圆形 */
        margin-right: 0.5rem; /* 小圆点与语言文字之间的间距 */
    }

    /* 标签容器样式 */
    .tags {
        display: flex; /* 使用 flex 布局 */
        flex-wrap: wrap; /* 如果标签太多则换行 */
        gap: 0.5rem; /* 标签之间的间距 */
        margin-top: 0.5rem; /* 与 Language 部分保持一定间距 */
    }

    /* 单个标签样式 */
    .tag {
        padding: 0.2rem 0.5rem; /* 标签内边距 */
        background-color: #222; /* 标签背景色 */
        color: white; /* 标签文字颜色 */
        border-radius: 4px; /* 标签圆角 */
        font-size: 0.9rem; /* 字体大小 */
        white-space: nowrap; /* 防止标签文字换行 */
        border: 1px solid #444; /* 标签边框颜色 */
    }
</style>
