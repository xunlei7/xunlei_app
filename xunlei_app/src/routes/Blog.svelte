<script>
    export let isDayTime;
    import { blogEntries } from '../data/data.js';

    let showAllBlogs = false; // 控制是否展开博客
 
</script>

<div class="blog-container {isDayTime ? 'day-theme' : 'night-theme'}">
    <h1 class="blog-title">Welcome to My World </h1>
    <p class="blog-intro">Where every story, lesson, and discovery is a window into the passions that fuel my life.</p>

    <!-- Iterate over blog entries to display each entry -->
    {#each (showAllBlogs ? blogEntries : blogEntries.slice(0, 5)) as entry, index}
    <div class="blog-entry">
      <p class="post-date">{entry.date}</p>
      <h2 class="post-title">{entry.title}</h2>
      {#if entry.image}
        <img class="post-image" src={entry.image} alt={entry.alt}>
      {/if}
      <p class="post-text">{@html entry.text}</p>
      <hr class="divider" style="border-top: 1px solid #d3d3d3;">
    </div>
    {/each}

    <!-- 展开/折叠按钮 -->
    {#if blogEntries.length > 5}
      <div class="toggle-button-container">
          <button class="toggle-button" on:click={() => showAllBlogs = !showAllBlogs}>
              {showAllBlogs ? "Show Less" : "Show More"}
          </button>
      </div>
    {/if}
</div>

<style>
    .blog-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background-color: inherit;
      text-align: left;
    }

    .blog-title {
      font-size: 2.5rem;
      font-weight: bold;
      color: inherit;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .blog-intro {
      font-size: 1.25rem;
      color: #555;
      margin-bottom: 2rem;
      line-height: 1.6;
      text-align: center;
    }

    .blog-entry {
      background-color: transparent;
      margin-bottom: 1rem; /* Reduced to keep the content close */
      padding: 1rem 0;
    }

    .blog-entry .post-date {
      font-size: 0.9rem;
      color: inherit;
      margin-bottom: 0.5rem; /* Reduced gap */
    }

    .blog-entry p {
      font-size: 1rem;
      color: inherit;
      line-height: 1.8;
      margin-bottom: 0.5rem; /* Reduced spacing after text */
    }

    .post-image {
      width: 100%;
      max-width: 200px; /* 限制图片最大宽度 */
      height: auto;
      margin: 1rem 0;
      border: none;
    }
    .post-title {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: inherit;
    }

    .divider {
      border: none;
      border-top: 1px solid #d3d3d3;
      margin: 0.8rem 0;
    }

    .day-theme.blog-container {
        background-color: white;
        color: black;
    }

    .night-theme.blog-container {
      background-color: #000;
      color: #f0f0f0;
    }

    .night-theme .blog-entry {
      background-color: transparent;
      color: inherit;
    }

    .night-theme .post-date {
      color: #bbb;
    }

    .night-theme .divider {
      border-top: 1px solid #555;
    }

    .day-theme .post-text {
      color: #333;
    }

    .night-theme .post-text {
      color: #ccc;
    }

    .day-theme .post-image {
      border: none;
    }

    .night-theme .post-image {
      border: none;
    }

    /* Ensure no borders, padding, or background inconsistencies */
    .blog-container, .blog-entry, .post-image, .divider {
      box-shadow: none;
    }

    .toggle-button-container {
        text-align: center;
        margin-top: 1rem;
    }

    .toggle-button {
      background-color: inherit;
      color: inherit;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      border: 2px solid #999;  /* 灰色边框 */
    }

    .toggle-button:hover {
        border: 2px solid #d3d3d3;
        background-color: #f5f5f5;
        color: #000000;
        transition: all 0.3s ease;
    }

    .toggle-button:focus {
        outline: none;
    }
</style>
