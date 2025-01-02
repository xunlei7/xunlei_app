<script>
    import ProjectCard from '../components/ProjectCard.svelte'; // 引入 ProjectCard 组件
    export let isDayTime; // 接收从 App.svelte 传递的 isDayTime
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
            language: "Python",
            tags: ["Mechine Learning"],
            httpsLink: "https://github.com/dsan-5000/YouTube-Video-Success.git",
            sshLink: "git@github.com:dsan-5000/YouTube-Video-Success.git",
            website: "https://xunlei.georgetown.domains/portfolio_project/"
        },
        {
            name: "Fuzzy Name Matching Algorithm",
            description: "Implement a Fuzzy Name Matching algorithm that computes a similarity score between two given names.",
            language: "Python",
            tags: [],
            httpsLink: "https://github.com/DSAN5400-F24/fall-2024-assignment-04-xunlei7",
            sshLink: "git@github.com:DSAN5400-F24/fall-2024-assignment-04-xunlei7.git"
        },
        {
            name: "Naive Bayes Classifier",
            description: "Implements a Naive Bayes classifier to predict presidential speech authors, using custom and scikit-learn methods, with visualizations.",
            language: "Python",
            tags: ["Mechine Learning"],
            httpsLink: "https://github.com/DSAN5400-F24/fall-2024-assignment-03-xunlei7.git",
            sshLink: "git@github.com:DSAN5400-F24/fall-2024-assignment-03-xunlei7.git"
        }
    ];

    let currentPopup = ""; // 当前打开弹窗的项目名称

    // 设置当前弹窗的函数，支持多弹窗交互
    const setCurrentPopup = (popupName) => {
        currentPopup = currentPopup === popupName ? "" : popupName;
    };

</script>

<main class="projects-container">
    <!-- 遍历项目数据并渲染项目卡片 -->
    {#each projects as project (project.name)} <!-- 使用唯一标识符优化渲染 -->
        <ProjectCard 
            name={project.name}
            description={project.description}
            language={project.language}
            tags={project.tags}
            httpsLink={project.httpsLink}
            sshLink={project.sshLink}
            website={project.website}
            currentPopup={currentPopup} 
            setCurrentPopup={setCurrentPopup} 
            isDayTime={isDayTime}
        
        />
    {/each}
</main>

