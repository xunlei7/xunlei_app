<script>
    import { onMount } from "svelte";
    export let isDayTime = true; // 从父组件传递的主题状态
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
                popup.style.top = "95%"; // 在按钮下方
                popup.style.bottom = "auto";
                popup.style.transform = "translateX(-50%) translateY(8px)"; // 下方微调
            }

            // 显示弹窗
            popup.style.visibility = "visible";
            popup.style.zIndex = "9999"; // 保证层级最高
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

    const handleProtocolChange = (protocol) => {
        selectedProtocol = protocol;
        setTimeout(() => {
            adjustPopupPosition(); // 确保弹窗位置在切换后正确调整
        }, 0);
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
        <div
            class="popup {isDayTime ? 'day-theme' : 'night-theme'}"
            data-name={name}
            style="width: calc({cloneUrl.length}ch + 4.5rem); min-width: 320px;"
        >
            <div class="popup-content">
                <div class="protocol-switch">
                    <button
                        class:selected={selectedProtocol === "HTTPS"} 
                        on:click={() => handleProtocolChange("HTTPS")} 
                    >
                        HTTPS
                    </button>
                    <button
                        class:selected={selectedProtocol === "SSH"} 
                        on:click={() => handleProtocolChange("SSH")} 
                    >
                        SSH
                    </button>
                    {#if website}
                        <button
                            class:selected={selectedProtocol === "Website"} 
                            on:click={() => handleProtocolChange("Website")} 
                        >
                            Website
                        </button>
                    {/if}
                </div>
                <div class="link-display">
                    <input
                        type="text"
                        value={cloneUrl}
                        readonly
                        class="auto-width"
                        style="width: calc({cloneUrl.length}ch + 2rem);"
                    />
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    /* 项目卡片容器样式 */
    .project-card-container {
        position: relative;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
        z-index: auto;
    }

    .project-card {
        background: inherit;
        color: inherit;
        padding: 0.5rem;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 50%;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        height: 100%;
    }

    .code-button {
        padding: 0.5rem 1rem;
        background-color: inherit;
        color: inherit;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
    }

    .code-button:hover {
        border: 2px solid #d3d3d3;
        background-color: #f5f5f5;
        color: #000000;
        transition: all 0.3s ease;
    }

    .popup {
        position: absolute;
        top: 100%;
        left: 70%;
        transform: translateX(-50%) translateY(8px);
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        word-wrap: break-word;
        visibility: hidden;
        transition: background-color 0.5s ease, color 0.5s ease, transform 0.2s ease;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .popup-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    
    }


    .protocol-switch {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .protocol-switch button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        background-color: #f5f5f5;
        cursor: pointer;
    }

    .protocol-switch button.selected {
        background: #007bff;
        color: white;
    }

    .link-display {
        width: 100%;
    }

    .link-display input.auto-width {
        max-width: 100%;
        padding: 0.5rem;
        border: 1px solid #555;
        border-radius: 4px;
        background-color: inherit;
        color: inherit;
    }

    .language {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        font-size: 1rem;
    }

    .language-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 0.5rem;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }

    .tag {
        padding: 0.2rem 0.5rem;
        background-color: inherit;
        color: inherit;
        border-radius: 4px;
        font-size: 0.9rem;
        white-space: nowrap;
        border: 1px solid #444;
    }
</style>
