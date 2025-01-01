<script>
    import { onMount } from "svelte"; // 引入 Svelte 的 onMount 生命周期，用于在组件挂载时执行操作

    export let name = ""; // 项目名称，从父组件接收，用于标识项目
    export let description = ""; // 项目描述，从父组件接收，用于描述项目功能
    export let language = ""; // 编程语言，从父组件接收，用于显示项目主要使用的编程语言
    export let tags = []; // 标签数组，从父组件接收，用于标记项目特性
    export let httpsLink = ""; // HTTPS 链接，从父组件接收，用于克隆项目代码
    export let sshLink = ""; // SSH 链接，从父组件接收，用于克隆项目代码
    export let website = ""; // 可选的 Website 链接，从父组件接收，用于跳转到项目网站

    export let currentPopup = ""; // 当前显示弹窗的项目名称，从父组件接收，用于控制弹窗显示
    export let setCurrentPopup; // 父组件传递的函数，用于设置当前弹窗的状态

    let selectedProtocol = "HTTPS"; // 默认选中的协议是 HTTPS

    // 动态生成克隆链接，根据用户选择的协议返回对应的链接
    $: cloneUrl = selectedProtocol === "HTTPS"
        ? httpsLink
        : selectedProtocol === "SSH"
        ? sshLink
        : selectedProtocol === "Website" && website
        ? website
        : ""; // 如果没有匹配到协议则返回空字符串

    // 定义编程语言与颜色的映射，用于动态显示语言标识颜色
    const languageColors = {
        Svelte: "#FF3E00", // Svelte 的橙色
        Python: "#3572A5", // Python 的蓝色
        HTML: "#E34C26", // HTML 的红色
        Rust: "#DEA584", // Rust 的棕色
        C: "#178600", // C 的绿色
        Default: "#999", // 默认的灰色
    };

    // 动态获取编程语言对应的颜色，如果语言未定义颜色则使用默认颜色
    $: languageColor = languageColors[language] || languageColors.Default;

    // 判断弹窗是否可见，基于父组件传递的 currentPopup 和当前项目名称
    $: isPopupVisible = currentPopup === name;

    // 关闭弹窗的方法，调用父组件的 setCurrentPopup 函数并传递空字符串
    const closePopup = () => {
        setCurrentPopup(""); // 将 currentPopup 设置为空字符串，关闭弹窗
    };

    // 点击页面其他地方关闭弹窗
    const handleOutsideClick = (event) => {
        const popup = document.querySelector(`.popup[data-name="${name}"]`); // 获取当前项目对应的弹窗元素
        const codeButton = document.querySelector(`.code-button[data-name="${name}"]`); // 获取当前项目的按钮元素

        // 如果点击的目标是弹窗或按钮，则不关闭弹窗
        if (
            (popup && popup.contains(event.target)) ||
            (codeButton && codeButton.contains(event.target))
        ) {
            return;
        }

        // 如果弹窗可见，则关闭弹窗
        if (isPopupVisible) {
            closePopup();
        }
    };

    // 在组件挂载时添加全局点击事件监听器，并在组件卸载时移除监听器
    onMount(() => {
        document.addEventListener("click", handleOutsideClick); // 添加全局点击事件监听器
        return () => {
            document.removeEventListener("click", handleOutsideClick); // 移除全局点击事件监听器
        };
    });
</script>

<!-- 项目卡片 -->
<div class="project-card-container"> <!-- 包含每个项目卡片的容器，保证卡片居中 -->
    <div class="project-card"> <!-- 主容器，用于显示项目基本信息 -->
        <div class="content"> <!-- 内容部分 -->
            <h2>{name}</h2> <!-- 项目名称 -->
            <p>{description}</p> <!-- 项目描述 -->
            <div class="language"> <!-- 显示项目编程语言和颜色标识 -->
                <span
                    class="language-dot"
                    style="background-color: {languageColor};"
                ></span>
                {language} <!-- 项目语言名称 -->
            </div>
            {#if tags.length > 0} <!-- 条件渲染标签列表，如果存在标签则显示 -->
                <div class="tags">
                    {#each tags as tag} <!-- 循环渲染每个标签 -->
                        <span class="tag">{tag}</span> <!-- 单个标签 -->
                    {/each}
                </div>
            {/if}
        </div>

        <div class="actions"> <!-- 操作区域 -->
            <button
                class="code-button"
                data-name={name} 
                on:click={() => {
                    setCurrentPopup(isPopupVisible ? "" : name); // 切换弹窗显示状态
                }}
            >
                Code <!-- 按钮文本 -->
            </button>
        </div>
    </div>
</div>

{#if isPopupVisible} <!-- 条件渲染弹窗内容，如果弹窗可见则显示 -->
    <div class="popup" data-name="{name}" style="top: auto; margin-top: 1rem;"> <!-- 弹窗容器，调整位置使其显示在按钮下方 -->
        <div class="popup-content"> <!-- 弹窗内容 -->
            <div class="protocol-switch"> <!-- 协议切换区域 -->
                <button
                    class:selected={selectedProtocol === "HTTPS"} 
                    on:click={() => (selectedProtocol = "HTTPS")} 
                >
                    HTTPS <!-- 按钮文本 -->
                </button>
                <button
                    class:selected={selectedProtocol === "SSH"} 
                    on:click={() => (selectedProtocol = "SSH")} 
                >
                    SSH <!-- 按钮文本 -->
                </button>
                {#if website} <!-- 条件渲染 Website 按钮，如果存在 website 属性则显示 -->
                    <button
                        class:selected={selectedProtocol === "Website"} 
                        on:click={() => (selectedProtocol = "Website")} 
                    >
                        Website <!-- 按钮文本 -->
                    </button>
                {/if}
            </div>
            <div class="link-display"> <!-- 链接显示区域 -->
                <input type="text" value={cloneUrl} readonly /> <!-- 当前选中的克隆链接，设置为只读 -->
            </div>
        </div>
    </div>
{/if}

<style>
    .project-card-container {
        display: flex;
        justify-content: center; /* 水平居中 */
        margin-bottom: 1rem; /* 每个项目卡片之间的间距 */
    }

    .project-card {
        background: #1e1e1e; /* 卡片背景颜色 */
        color: white; /* 字体颜色 */
        padding: 0.5rem; /* 内边距 */
        border-radius: 8px; /* 圆角边框 */
        display: flex; /* 使用 flex 布局 */
        flex-direction: column; /* 子元素垂直排列 */
        align-items: space-between; /* 水平居中对齐子元素 */
        width: 80%; /* 卡片宽度，保证居中效果 */
    }

    .language-dot {
        width: 10px; /* 小圆点宽度 */
        height: 10px; /* 小圆点高度 */
        border-radius: 50%; /* 圆形 */
        margin-right: 0.5rem; /* 与文本的右侧间距 */
    }

    .popup {
        background: #333; /* 弹窗背景颜色 */
        color: white; /* 字体颜色 */
        padding: 1rem; /* 内边距 */
        border-radius: 8px; /* 圆角边框 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
        width: 300px; /* 弹窗宽度 */
        margin-top: 1rem; /* 调整弹窗距离按钮的间距 */
    }

    .protocol-switch button.selected {
        background: #007bff; /* 高亮选中按钮的背景颜色 */
    }

</style>
