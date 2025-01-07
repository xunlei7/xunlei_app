<script>
    import ProjectCard from '../components/ProjectCard.svelte'; // 引入 ProjectCard 组件
    export let isDayTime; // 接收从 App.svelte 传递的 isDayTime
    import { projects } from '../data/data.js';

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

