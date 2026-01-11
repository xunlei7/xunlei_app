<script>
    import { onMount } from "svelte";
    import { isDayTime } from '../stores/theme.js';
    export let name = "";
    export let description = "";
    export let language = "";
    export let tags = [];
    export let httpsLink = "";
    export let sshLink = "";
    export let website = "";

    export let currentPopup = "";
    export let setCurrentPopup;
    export let hoveredLanguage = "";
    export let onMouseEnter = () => {};
    export let onMouseLeave = () => {};

    let selectedProtocol = "HTTPS";
    let copied = false;
    let copyTimeout;

    $: cloneUrl = selectedProtocol === "HTTPS"
        ? httpsLink
        : selectedProtocol === "SSH"
        ? sshLink
        : selectedProtocol === "Website" && website
        ? website
        : "";

    $: canOpenLink = selectedProtocol === "HTTPS" || selectedProtocol === "Website";

    const languageColors = {
        Svelte: "#FF3E00",
        Python: "#3572A5",
        HTML: "#E34C26",
        RISC_V: "#DEA584",
        C: "#178600",
        Default: "#999",
    };

    $: languageColor = languageColors[language] || languageColors.Default;

    $: isPopupVisible = currentPopup === name;
    $: isHighlighted = hoveredLanguage !== "" && hoveredLanguage === language;
    $: isDimmed = hoveredLanguage !== "" && hoveredLanguage !== language;

    const closePopup = () => {
        setCurrentPopup("");
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(cloneUrl);
            copied = true;
            
            // Clear existing timeout if any
            if (copyTimeout) {
                clearTimeout(copyTimeout);
            }
            
            // Reset copied state after 2 seconds
            copyTimeout = setTimeout(() => {
                copied = false;
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            try {
                const textArea = document.createElement("textarea");
                textArea.value = cloneUrl;
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                copied = true;
                if (copyTimeout) {
                    clearTimeout(copyTimeout);
                }
                copyTimeout = setTimeout(() => {
                    copied = false;
                }, 2000);
            } catch (fallbackErr) {
                console.error('Failed to copy:', fallbackErr);
            }
        }
    };

    const openLink = () => {
        if (canOpenLink && cloneUrl) {
            window.open(cloneUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const adjustPopupPosition = () => {
        const popup = document.querySelector(`.popup[data-name="${name}"]`);
        const codeButton = document.querySelector(`.code-button[data-name="${name}"]`);

        if (popup instanceof HTMLElement && codeButton instanceof HTMLElement) {
            const buttonRect = codeButton.getBoundingClientRect();
            const popupHeight = popup.offsetHeight;
            const viewportHeight = window.innerHeight;
            const popupWidth = popup.offsetWidth;
            const viewportWidth = window.innerWidth;

            // Check if popup exceeds viewport bottom
            if (buttonRect.bottom + popupHeight + 8 > viewportHeight) {
                // If exceeds, adjust to above button
                popup.style.top = "auto";
                popup.style.bottom = "20%";
                popup.style.transform = "translateX(-50%) translateY(-8px)";
            } else {
                // Otherwise keep below button
                popup.style.top = "95%";
                popup.style.bottom = "auto";
                popup.style.transform = "translateX(-50%) translateY(8px)";
            }

            // Adjust horizontal position to stay within viewport
            const popupLeft = buttonRect.left + (buttonRect.width / 2) - (popupWidth / 2);
            if (popupLeft < 8) {
                popup.style.left = "8px";
                popup.style.transform = popup.style.transform.replace("translateX(-50%)", "translateX(0)");
            } else if (popupLeft + popupWidth > viewportWidth - 8) {
                popup.style.left = "auto";
                popup.style.right = "8px";
                popup.style.transform = popup.style.transform.replace("translateX(-50%)", "translateX(0)");
            }

            // Show popup
            popup.style.visibility = "visible";
            popup.style.zIndex = "9999";
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
        copied = false; // Reset copied state when protocol changes
        setTimeout(() => {
            adjustPopupPosition(); // Ensure popup position adjusts correctly after switching
        }, 0);
    };

    onMount(() => {
        document.addEventListener("click", handleOutsideClick);
        window.addEventListener("resize", adjustPopupPosition);

        // Adjust initial popup position
        if (isPopupVisible) {
            adjustPopupPosition();
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
            window.removeEventListener("resize", adjustPopupPosition);
            if (copyTimeout) {
                clearTimeout(copyTimeout);
            }
        };
    });
</script>

<!-- Project Card -->
<div class="project-card-container">
    <div 
        class="project-card"
        class:highlighted={isHighlighted}
        class:dimmed={isDimmed}
        on:mouseenter={() => onMouseEnter()}
        on:mouseleave={() => onMouseLeave()}
    >
        <div class="content">
            <h2>{name}</h2>
            <p class="description">{description}</p>
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
                    setCurrentPopup(isPopupVisible ? "" : name); // Toggle popup display state
                    if (!isPopupVisible) {
                        setTimeout(adjustPopupPosition, 0); // Adjust popup position
                    }
                }}
            >
                Code
            </button>
        </div>
    </div>
    
    {#if isPopupVisible}
        <div
            class="popup"
            data-name={name}
            style="width: calc({cloneUrl.length}ch + 4.5rem); min-width: 320px; max-width: 95vw;"
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
                        class:clickable={canOpenLink}
                        style="width: calc({cloneUrl.length}ch + 2rem);"
                        on:click={canOpenLink ? openLink : undefined}
                        title={canOpenLink ? "Click to open link" : "Read-only link"}
                    />
                    {#if canOpenLink}
                        <button
                            class="open-button"
                            on:click={openLink}
                            title="Open link in new tab"
                        >
                            <span class="open-icon">🔗</span>
                        </button>
                    {/if}
                    <button
                        class="copy-button"
                        on:click={copyToClipboard}
                        class:copied={copied}
                        title={copied ? "Copied!" : "Copy to clipboard"}
                    >
                        {#if copied}
                            <span class="copy-icon">✓</span>
                        {:else}
                            <span class="copy-icon">📋</span>
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    /* Project card container styles */
    .project-card-container {
        position: relative;
        width: 100%;
        z-index: auto;
    }

    .project-card {
        background: inherit;
        color: inherit;
        padding: 1.5rem;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        height: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease, transform 0.2s ease, opacity 0.3s ease;
        border: 1px solid rgba(128, 128, 128, 0.2);
    }

    .project-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }

    .project-card.highlighted {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
        opacity: 1;
    }

    .project-card.dimmed {
        opacity: 0.3;
        pointer-events: none;
    }

    .project-card.dimmed:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transform: none;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .content h2 {
        font-size: 1.5rem;
        margin: 0 0 0.75rem 0;
        color: inherit;
        font-weight: 600;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(128, 128, 128, 0.2);
    }

    .code-button {
        padding: 0.5rem 1rem;
        background-color: inherit;
        color: inherit;
        border: 2px solid currentColor;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }

    .code-button:hover {
        background-color: var(--popup-bg, #f5f5f5);
        border-color: var(--popup-text, #007bff);
        transform: translateY(-1px);
    }

    .popup {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(8px);
        padding: 1.25rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        word-wrap: break-word;
        visibility: hidden;
        transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border: 2px solid #cccccc;
        z-index: 9999;
        background-color: var(--popup-bg, #ffffff);
        color: var(--popup-text, #000000);
    }

    .popup-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        gap: 1rem;
    }

    .protocol-switch {
        display: flex;
        gap: 0.5rem;
        width: 100%;
        flex-wrap: wrap;
    }

    .protocol-switch button {
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f5f5f5;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.85rem;
        color: inherit;
    }

    .protocol-switch button:hover {
        background-color: #e0e0e0;
    }

    .protocol-switch button.selected {
        background: #007bff;
        color: white;
        border-color: #007bff;
    }

    .link-display {
        width: 100%;
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .link-display input.auto-width {
        flex: 1;
        min-width: 0;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: inherit;
        color: inherit;
        font-size: 0.9rem;
        cursor: text;
    }

    .link-display input.auto-width.clickable {
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .link-display input.auto-width.clickable:hover {
        border-color: #007bff;
        background-color: rgba(0, 123, 255, 0.05);
    }

    .open-button {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: inherit;
        color: inherit;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 40px;
        height: 38px;
    }

    .open-button:hover {
        background-color: #007bff;
        border-color: #007bff;
        color: white;
    }

    .open-icon {
        font-size: 1rem;
    }

    .copy-button {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: inherit;
        color: inherit;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 40px;
        height: 38px;
    }

    .copy-button:hover {
        background-color: #f0f0f0;
        border-color: #007bff;
    }

    .copy-button.copied {
        background-color: #28a745;
        border-color: #28a745;
        color: white;
    }

    .copy-icon {
        font-size: 1rem;
    }

    .language {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        color: inherit;
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
        margin-top: 0.75rem;
    }

    .tag {
        padding: 0.25rem 0.5rem;
        background-color: inherit;
        color: inherit;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: nowrap;
        border: 1px solid #ccc;
        transition: border-color 0.2s ease;
    }

    .tag:hover {
        border-color: #007bff;
    }

    .description {
        color: inherit;
        font-size: 0.95rem;
        margin-bottom: 0.75rem;
        line-height: 1.5;
        flex: 1;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
        .popup {
            left: 50%;
        }
    }

    @media (max-width: 768px) {
        .project-card {
            padding: 1rem;
        }

        .popup {
            left: 50%;
            width: calc(100vw - 2rem) !important;
            min-width: 280px !important;
            max-width: 95vw !important;
            padding: 1rem;
        }

        .protocol-switch {
            width: 100%;
        }

        .protocol-switch button {
            flex: 1;
            min-width: 70px;
        }

        .link-display {
            flex-direction: column;
            align-items: stretch;
        }

        .link-display input.auto-width {
            width: 100%;
        }

        .open-button,
        .copy-button {
            width: 100%;
            margin-top: 0.5rem;
        }
    }

    @media (max-width: 480px) {
        .tags {
            gap: 0.25rem;
        }

        .tag {
            font-size: 0.75rem;
            padding: 0.2rem 0.4rem;
        }

        .content h2 {
            font-size: 1.25rem;
        }
    }
</style>
