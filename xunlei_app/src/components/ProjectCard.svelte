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
    export let hoveredLanguages = [];
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
        R: "#276DC3",
        Default: "#999",
    };

    // Split language string by " & " to handle multiple languages
    $: languages = language.split(" & ").map(l => l.trim());

    $: isPopupVisible = currentPopup === name;
    // Check if any of the card's languages match any of the hovered languages
    $: isHighlighted = hoveredLanguages.length > 0 && languages.some(lang => hoveredLanguages.includes(lang));
    $: isDimmed = hoveredLanguages.length > 0 && !languages.some(lang => hoveredLanguages.includes(lang));

    const closePopup = () => {
        setCurrentPopup("");
        // Remove popup-active class from container
        const popup = document.querySelector(`.popup[data-name="${name}"]`);
        if (popup) {
            const container = popup.closest('.project-card-container');
            if (container instanceof HTMLElement) {
                container.classList.remove('popup-active');
            }
        }
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
            const margin = 8; // Minimum margin from viewport edges
            const gap = 8; // Gap between button and popup

            // Always try to show below button first
            let showAbove = false;
            if (buttonRect.bottom + popupHeight + gap + margin > viewportHeight) {
                // Not enough space below, show above
                showAbove = true;
            }

            // Set vertical position (relative to button)
            if (showAbove) {
                popup.style.top = "auto";
                popup.style.bottom = "100%";
            } else {
                popup.style.top = "100%";
                popup.style.bottom = "auto";
            }

            // Calculate horizontal position relative to button
            // Get button's position relative to viewport
            const buttonLeft = buttonRect.left;
            const buttonRight = buttonRect.right;
            const buttonCenterX = buttonRect.left + (buttonRect.width / 2);
            const buttonWidth = buttonRect.width;

            // Try to center popup on button
            let idealPopupLeft = buttonCenterX - (popupWidth / 2);
            let popupLeft = 0; // Relative to button's left edge

            // Check if centered position fits within viewport
            if (idealPopupLeft >= margin && idealPopupLeft + popupWidth <= viewportWidth - margin) {
                // Centered position works
                popupLeft = idealPopupLeft - buttonLeft;
            } else {
                // Centered doesn't fit, try other alignments
                // Try right-aligning popup to button's right edge
                const rightAlignLeft = buttonRight - popupWidth;
                if (rightAlignLeft >= margin) {
                    // Right-align works
                    popupLeft = buttonWidth - popupWidth;
                } else {
                    // Try left-aligning to button's left edge
                    const leftAlignLeft = buttonLeft;
                    if (leftAlignLeft + popupWidth <= viewportWidth - margin) {
                        // Left-align works
                        popupLeft = 0;
                    } else {
                        // Need to adjust based on viewport constraints
                        if (buttonLeft < viewportWidth / 2) {
                            // Button is on left side, align popup to left margin
                            popupLeft = margin - buttonLeft;
                        } else {
                            // Button is on right side, align popup to right margin
                            popupLeft = (viewportWidth - margin - popupWidth) - buttonLeft;
                        }
                    }
                }
            }

            // Apply horizontal position (relative to button)
            popup.style.left = `${popupLeft}px`;
            popup.style.right = "auto";
            
            // Apply vertical transform
            if (showAbove) {
                popup.style.transform = "translateY(-8px)";
            } else {
                popup.style.transform = "translateY(8px)";
            }

            // Show popup
            popup.style.visibility = "visible";
            popup.style.zIndex = "99999";
            
            // Ensure container has high z-index when popup is visible
            const container = popup.closest('.project-card-container');
            if (container instanceof HTMLElement) {
                container.classList.add('popup-active');
            }
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

    // Watch for popup visibility changes to manage container z-index
    $: if (isPopupVisible) {
        // Popup is visible, ensure container has high z-index
        setTimeout(() => {
            const popup = document.querySelector(`.popup[data-name="${name}"]`);
            if (popup) {
                const container = popup.closest('.project-card-container');
                if (container instanceof HTMLElement) {
                    container.classList.add('popup-active');
                }
            }
        }, 0);
    } else {
        // Popup is hidden, remove popup-active class
        setTimeout(() => {
            const popup = document.querySelector(`.popup[data-name="${name}"]`);
            if (popup) {
                const container = popup.closest('.project-card-container');
                if (container instanceof HTMLElement) {
                    container.classList.remove('popup-active');
                }
            }
        }, 0);
    }

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
    <!-- svelte-ignore a11y-no-static-element-interactions -->
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
                {#each languages as lang}
                    <span class="language-item">
                        <span
                            class="language-dot"
                            style="background-color: {languageColors[lang] || languageColors.Default};"
                        ></span>
                        {lang}
                    </span>
                {/each}
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
            <div class="code-button-wrapper">
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
                            <span class="open-text">Open</span>
                        </button>
                    {/if}
                    <button
                        class="copy-button"
                        on:click={copyToClipboard}
                        class:copied={copied}
                        title={copied ? "Copied!" : "Copy to clipboard"}
                    >
                        {#if copied}
                            <span class="copy-text">Copied</span>
                        {:else}
                            <span class="copy-text">Copy</span>
                        {/if}
                    </button>
                </div>
            </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    /* Project card container styles */
    .project-card-container {
        position: relative;
        width: 100%;
        z-index: auto;
    }

    /* When popup is visible, ensure container has high z-index */
    /* svelte-ignore css-unused-selector */
    :global(.project-card-container.popup-active) {
        z-index: 99998;
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
        position: relative;
        z-index: 0; /* Default z-index, lower than popup */
    }

    .project-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }

    /* When popup is active, prevent card from appearing above popup */
    /* svelte-ignore css-unused-selector */
    :global(.project-card-container.popup-active .project-card),
    /* svelte-ignore css-unused-selector */
    :global(.project-card-container.popup-active .project-card:hover),
    /* svelte-ignore css-unused-selector */
    :global(.project-card-container.popup-active .project-card.highlighted) {
        z-index: 1; /* Keep card below popup (z-index: 99999) */
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

    .code-button-wrapper {
        position: relative;
        z-index: 1; /* Ensure wrapper is above card content */
    }

    .code-button {
        padding: 0.5rem 1rem;
        background-color: inherit;
        color: inherit;
        border: 2px solid currentColor;
        border-radius: 4px;
        cursor: pointer;
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
        left: 0;
        transform: translateY(8px);
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
        z-index: 99999;
        background-color: var(--popup-bg, #ffffff);
        color: var(--popup-text, #000000);
        isolation: isolate; /* Create new stacking context */
        will-change: transform; /* Optimize for transform animations */
    }
    
    /* Ensure popup is always on top, even when card is hovered */
    /* svelte-ignore css-unused-selector */
    :global(.project-card-container.popup-active .popup) {
        z-index: 99999;
        position: absolute;
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
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: inherit;
        color: inherit;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 60px;
        height: 38px;
    }

    .open-button:hover {
        background-color: #007bff;
        border-color: #007bff;
        color: white;
    }

    .open-text {
        font-size: 0.9rem;
        font-weight: 500;
    }

    .copy-button {
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: inherit;
        color: inherit;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 60px;
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

    .copy-text {
        font-size: 0.9rem;
        font-weight: 500;
    }

    .language {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        color: inherit;
    }

    .language-item {
        display: flex;
        align-items: center;
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
