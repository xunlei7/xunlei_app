<script>
    export let name = ""; // 项目名称
    export let description = ""; // 项目描述
    export let language = ""; // 编程语言
    export let tags = []; // 标签数组
    export let httpsLink = ""; // HTTPS 链接
    export let sshLink = ""; // SSH 链接
    export let website = ""; // 可选 Website 链接

    export let currentPopup = ""; // 当前打开的弹窗
    export let setCurrentPopup; // 父组件传递的函数，用于设置当前弹窗状态

    let selectedProtocol = "HTTPS"; // 默认选中的协议

    // 动态生成克隆链接
    $: cloneUrl = selectedProtocol === "HTTPS" ? httpsLink : sshLink;

    // 语言对应颜色
    const languageColors = {
        Svelte: "#FF3E00",
        Python: "#3572A5",
        HTML: "#E34C26",
        Rust: "#DEA584",
        C: "#178600",
        Default: "#999",
    };

    $: languageColor = languageColors[language] || languageColors.Default; // 根据语言动态获取颜色

    // 判断弹窗是否显示
    $: isPopupVisible = currentPopup === name;

    // 关闭弹窗
    const closePopup = () => setCurrentPopup("");
</script>

<div class="project-card">
    <!-- 项目内容 -->
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

    <!-- 操作按钮 -->
    <div class="actions">
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
            <!-- 链接显示 -->
            <div class="link-display">
                <input type="text" value={cloneUrl} readonly />
            </div>
            <!-- 关闭按钮 -->
            <button class="close-button" on:click={closePopup}>Close</button>
        </div>
    </div>
{/if}

<style>
    /* 卡片样式 */
    .project-card {
        background: #1e1e1e;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    /* 语言标识样式 */
    .language-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 0.5rem;
    }

    /* 弹窗样式 */
    .popup {
        position: absolute;
        background: #333;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        width: 300px;
        top: 2rem;
        right: 0;
    }

    .protocol-switch button.selected {
        background: #007bff;
    }

    .close-button {
        margin-top: 1rem;
        background: #444;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

    .close-button:hover {
        background: #555;
    }
</style>
