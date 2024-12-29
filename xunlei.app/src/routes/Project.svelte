<script>
    import ProjectCard from '../components/ProjectCard.svelte'; // 引入 ProjectCard 组件
  
    // 项目数据
    const projects = [
      {
        name: "xunlei.app",
        description: "This site",
        language: "Svelte",
        tags: ["SvelteKit", "Web App", "Server Side Rendering", "Single Page Application", "Hydration"],
        github: "https://github.com/xunlei7/xunlei.app.git"
      },
      {
        name: "Toxic Comments Detection System in AI Arte",
        description: "",
        language: "Python#",
        tags: ["Jupyter Notebook"],
        github: "https://github.com/5400FinalGroup/5400Final.git"
      },
      {
        name: "YouTube-Video-Success",
        description: "Collection, preprocessing, and analysis of YouTube video data to extract meaningful insights",
        language: "Python#",
        tags: ["Python", "Mechine Learning"],
        github: "https://xunlei.georgetown.domains/portfolio_project/"
        
      },
      {
        name: "Fuzzy Name Matching Algorithm",
        description: "Implement a Fuzzy Name Matching algorithm that computes a similarity score between two given names.",
        language: "Python#",
        tags: ["Python#"],
        github: "https://github.com/DSAN5400-F24/fall-2024-assignment-04-xunlei7"
      }
    ];
  </script>
  
  <main class="projects-container">
    {#each projects as project}
      <ProjectCard
        name={project.name}
        description={project.description}
        language={project.language}
        tags={project.tags}
        github={project.github}
      />
    {/each}
  </main>
  
  <style>
    .projects-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 2rem;
      background-color: #121212;
      color: white;
    }
  </style>
  