<script>
    // 从父组件接收的属性，描述项目的基本信息
    export let name = ""; // 项目名称
    export let description = ""; // 项目描述
    export let language = ""; // 编程语言
    export let tags = []; // 标签数组
    export let httpsLink = ""; // HTTPS 链接
    export let sshLink = ""; // SSH 链接
    export let website = ""; // 可选的 Website 链接

    // 当前显示弹窗的项目名称，由父组件传递，用于判断弹窗是否显示
    export let currentPopup = "";

    // 父组件传递的函数，用于设置当前弹窗的状态
    export let setCurrentPopup;

    // 默认选中的协议是 HTTPS
    let selectedProtocol = "HTTPS";

    // 动态生成克隆链接，根据选中的协议返回对应的链接
    $: cloneUrl = selectedProtocol === "HTTPS" ? httpsLink : sshLink;

    // 定义编程语言对应的颜色，用于显示语言的小圆点
    const languageColors = {
        Svelte: "#FF3E00", // Svelte 的橙色
        Python: "#3572A5", // Python 的蓝色
        HTML: "#E34C26", // HTML 的橙色
        Rust: "#DEA584", // Rust 的棕色
        C: "#178600", // C 的绿色
        Default: "#999", // 默认灰色
    };

    // 根据语言动态获取颜色，如果语言不在字典中，则使用默认颜色
    $: languageColor = languageColors[language] || languageColors.Default;

    // 判断弹窗是否需要显示，条件是当前项目名称等于当前打开的弹窗名称
    $: isPopupVisible = currentPopup === name;

    // 关闭弹窗的方法，调用父组件传递的函数，将当前弹窗状态设置为空
    const closePopup = () => setCurrentPopup("");
</script>

<!-- 项目卡片 -->
<div class="project-card">
    <!-- 显示项目内容 -->
    <div class="content">
        <!-- 项目名称 -->
        <h2>{name}</h2>
        <!-- 项目描述 -->
        <p>{description}</p>
        <!-- 编程语言及其颜色标识 -->
        <div class="language">
            <span
                class="language-dot"
                style="background-color: {languageColor};"
            ></span>
            {language}
        </div>
        <!-- 如果有标签，则显示标签 -->
        {#if tags.length > 0}
            <div class="tags">
                {#each tags as tag}
                    <span class="tag">{tag}</span>
                {/each}
            </div>
        {/if}
    </div>

    <!-- 操作按钮 -->
    <div class="actions">
        <!-- Code 按钮，点击后显示或关闭弹窗 -->
        <button
            class="code-button"
            on:click={() => setCurrentPopup(isPopupVisible ? "" : name)}
        >
            Code
        </button>
    </div>
</div>

<!-- 弹窗 -->
{#if isPopupVisible}
    <div class="popup">
        <div class="popup-content">
            <h3>Clone Repository</h3>
            <!-- 协议选择 -->
            <div class="protocol-switch">
                <!-- HTTPS 按钮，切换到 HTTPS 协议 -->
                <button
                    class:selected={selectedProtocol === "HTTPS"}
                    on:click={() => (selectedProtocol = "HTTPS")}
                >
                    HTTPS
                </button>
                <!-- SSH 按钮，切换到 SSH 协议 -->
                <button
                    class:selected={selectedProtocol === "SSH"}
                    on:click={() => (selectedProtocol = "SSH")}
                >
                    SSH
                </button>
                <!-- 如果有 Website，则显示 Website 按钮 -->
                {#if website}
                    <button
                        class:selected={selectedProtocol === "Website"}
                        on:click={() => (selectedProtocol = "Website")}
                    >
                        Website
                    </button>
                {/if}
            </div>
            <!-- 显示选中的链接 -->
            <div class="link-display">
                <input type="text" value={cloneUrl} readonly />
            </div>
            <!-- 关闭按钮 -->
            <button class="close-button" on:click={closePopup}>Close</button>
        </div>
    </div>
{/if}

<style>
    /* 项目卡片样式 */
    .project-card {
        background: #1e1e1e; /* 卡片背景色 */
        color: white; /* 字体颜色 */
        padding: 1rem; /* 内边距 */
        border-radius: 8px; /* 圆角 */
        display: flex; /* 使用 Flex 布局 */
        justify-content: space-between; /* 左右对齐 */
        margin-bottom: 1rem; /* 卡片之间的间距 */
    }

    /* 编程语言颜色标识 */
    .language-dot {
        width: 10px; /* 小圆点宽度 */
        height: 10px; /* 小圆点高度 */
        border-radius: 50%; /* 圆形 */
        margin-right: 0.5rem; /* 右侧间距 */
    }

    /* 弹窗样式 */
    .popup {
        position: absolute; /* 定位在项目卡片内 */
        background: #333; /* 弹窗背景色 */
        color: white; /* 字体颜色 */
        padding: 1rem; /* 内边距 */
        border-radius: 8px; /* 圆角 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
        width: 300px; /* 弹窗宽度 */
        top: 2rem; /* 距离顶部 2rem */
        right: 0; /* 靠右对齐 */
    }

    /* 选中的协议按钮样式 */
    .protocol-switch button.selected {
        background: #007bff; /* 选中按钮背景色 */
    }

    /* 关闭按钮样式 */
    .close-button {
        margin-top: 1rem; /* 顶部间距 */
        background: #444; /* 按钮背景色 */
        color: white; /* 字体颜色 */
        border: none; /* 无边框 */
        border-radius: 4px; /* 圆角 */
        padding: 0.5rem 1rem; /* 内边距 */
        cursor: pointer; /* 鼠标样式 */
    }

    /* 关闭按钮悬停样式 */
    .close-button:hover {
        background: #555; /* 更深的背景色 */
    }
</style>
