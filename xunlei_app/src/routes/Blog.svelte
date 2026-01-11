<script>
    import { blogEntries } from '../data/data.js';
    import { isDayTime } from '../stores/theme.js';

    // Extract description from text, remove URLs
    function getDescription(text) {
        if (typeof text === 'string') {
            // Remove URLs (http://, https://)
            let cleaned = text.replace(/https?:\/\/[^\s]+/g, '').trim();
            // Remove trailing colon and spaces
            cleaned = cleaned.replace(/:\s*$/, '').trim();
            // Get first sentence or first line
            const firstLine = cleaned.split('.')[0] || cleaned.split('\n')[0];
            return firstLine.length > 100 ? firstLine.substring(0, 100) + '...' : firstLine || 'Blog entry';
        }
        return 'Blog entry';
    }

    function handlePreview(entry) {
        // Extract URL from text if available, or open in new tab
        if (entry.text && typeof entry.text === 'string') {
            const urlMatch = entry.text.match(/https?:\/\/[^\s]+/);
            if (urlMatch) {
                window.open(urlMatch[0], '_blank');
            }
        }
    }
</script>

<div class="{$isDayTime ? 'day-theme' : 'night-theme'} blog-container">
    <h1 class="blog-title">Pick the Blog Post You Love</h1>

    <div class="blog-grid">
        {#each blogEntries as entry}
            <div class="blog-card">
                {#if entry.image}
                    <div class="blog-image-container">
                        <img class="blog-image" src={entry.image} alt={entry.title || entry.alt} loading="lazy">
                    </div>
                {/if}
                <div class="blog-card-content">
                    <h2 class="blog-card-title">{entry.title}</h2>
                    <p class="blog-card-description">{getDescription(entry.text)}</p>
                    <p class="blog-card-date">{entry.date}</p>
                    <button class="preview-button" on:click={() => handlePreview(entry)}>
                        Preview
                    </button>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .blog-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 3rem 2rem;
        background-color: inherit;
        color: inherit;
    }

    .blog-title {
        font-size: 2.5rem;
        font-weight: bold;
        color: inherit;
        margin-bottom: 3rem;
        text-align: center;
    }

    .blog-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        width: 100%;
    }

    .blog-card {
        background-color: inherit;
        border: 1px solid rgba(128, 128, 128, 0.2);
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .blog-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .blog-image-container {
        width: 100%;
        overflow: hidden;
        background-color: #f5f5f5;
        aspect-ratio: 4 / 3;
        max-height: 180px;
    }

    .blog-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease;
    }

    .blog-card:hover .blog-image {
        transform: scale(1.05);
    }

    .blog-card-content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .blog-card-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: inherit;
        margin: 0 0 0.75rem 0;
        line-height: 1.3;
    }

    .blog-card-description {
        font-size: 0.95rem;
        color: inherit;
        opacity: 0.8;
        margin: 0 0 0.5rem 0;
        line-height: 1.5;
        flex: 1;
    }

    .blog-card-date {
        font-size: 0.85rem;
        color: inherit;
        opacity: 0.6;
        margin: 0 0 1rem 0;
    }

    .preview-button {
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        align-self: flex-start;
        margin-top: auto;
    }

    .preview-button:hover {
        background-color: #0056b3;
        transform: translateY(-1px);
    }

    .preview-button:active {
        transform: translateY(0);
    }

    .night-theme .blog-card {
        border-color: rgba(255, 255, 255, 0.2);
    }

    .night-theme .blog-image-container {
        background-color: rgba(255, 255, 255, 0.05);
    }

    .night-theme .preview-button {
        background-color: #4da6ff;
    }

    .night-theme .preview-button:hover {
        background-color: #3385cc;
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
        .blog-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .blog-container {
            padding: 2rem 1rem;
        }

        .blog-title {
            font-size: 2rem;
            margin-bottom: 2rem;
        }

        .blog-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .blog-card-content {
            padding: 1.25rem;
        }

        .blog-card-title {
            font-size: 1.25rem;
        }
    }

    @media (max-width: 480px) {
        .blog-title {
            font-size: 1.5rem;
        }

        .preview-button {
            width: 100%;
            padding: 0.75rem;
        }
    }
</style>
