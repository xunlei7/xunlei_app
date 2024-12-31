<script>
    import ProjectCard from '../components/ProjectCard.svelte'; // 引入 ProjectCard 组件

    const projects = [
        {
            name: "xunlei.app",
            description: "This site",
            language: "Svelte",
            tags: ["SvelteKit", "Web App", "Server Side Rendering"],
            httpsLink: "https://github.com/xunlei7/xunlei.app.git",
            sshLink: "git@github.com:xunlei7/xunlei.app.git"
        },
        {
            name: "Toxic Comments Detection System in AI Arte",
            description: "A machine learning-based system to detect toxic comments",
            language: "Python",
            tags: ["Jupyter Notebook"],
            httpsLink: "https://github.com/5400FinalGroup/5400Final.git",
            sshLink: "git@github.com:5400FinalGroup/5400Final.git"
        },
        {
            name: "YouTube-Video-Success",
            description: "Collection, preprocessing, and analysis of YouTube video data to extract meaningful insights",
            language: "Python#",
            tags: ["Python", "Mechine Learning"],
            httpsLink: "https://github.com/dsan-5000/YouTube-Video-Success.git",
            sshLink: "git@github.com:dsan-5000/YouTube-Video-Success.git",
            webkitURL: "https://xunlei.georgetown.domains/portfolio_project/"
            
        },
        {
            name: "Fuzzy Name Matching Algorithm",
            description: "Implement a Fuzzy Name Matching algorithm that computes a similarity score between two given names.",
            language: "Python#",
            tags: ["Python#"],
            httpsLink: "https://github.com/DSAN5400-F24/fall-2024-assignment-04-xunlei7",
            sshLink: "git@github.com:DSAN5400-F24/fall-2024-assignment-04-xunlei7.git"
        }
    ];


    let currentPopup = ""; // 当前打开弹窗的项目名称

    // 设置当前弹窗的函数
    const setCurrentPopup = (popupName) => {
        currentPopup = currentPopup === popupName ? "" : popupName;
    };
</script>

<main class="projects-container">
    {#each projects as project}
        <ProjectCard
            name={project.name}
            description={project.description}
            language={project.language}
            tags={project.tags}
            httpsLink={project.httpsLink}
            sshLink={project.sshLink}
            currentPopup={currentPopup}
            setCurrentPopup={setCurrentPopup} 
        />
    {/each}
</main>

<style>
    .projects-container {
        padding: 2rem;
        background-color: #121212;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
