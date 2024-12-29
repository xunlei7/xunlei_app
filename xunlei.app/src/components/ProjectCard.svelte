<script>
    export let name = ""; // 项目名称
    export let description = ""; // 项目描述
    export let language = ""; // 编程语言
    export let tags = []; // 标签数组
    export let github = ""; // GitHub 链接
  </script>
  
  <div class="project-card">
    <h2>{name}</h2>
    <p>{description}</p>
    <p><strong>Language:</strong> {language}</p>
    
    <!-- 标签列表 -->
    {#if tags.length > 0}
      <div class="tags">
        {#each tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    {/if}
    
    <!-- GitHub 链接 -->
    <a class="github-link" href={github} target="_blank">Code</a>
  </div>
  
  <style>
    .project-card {
      background-color: #1e1e1e;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 600px;
      text-align: left;
      margin: auto;
    }
  
    .project-card h2 {
      margin: 0;
      font-size: 1.5rem;
    }
  
    .project-card p {
      margin: 0.5rem 0;
    }
  
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0.5rem 0;
    }
  
    .tag {
      background-color: #333;
      color: white;
      padding: 0.3rem 0.6rem;
      border-radius: 5px;
      font-size: 0.9rem;
    }
  
    .github-link {
      display: inline-block;
      margin-top: 1rem;
      color: #007bff;
      text-decoration: none;
      font-weight: bold;
    }
  
    .github-link:hover {
      text-decoration: underline;
    }
  </style>
  