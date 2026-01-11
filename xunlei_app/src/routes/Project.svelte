<script>
    import ProjectCard from '../components/ProjectCard.svelte';
    import { projects } from '../data/data.js';
    import { isDayTime } from '../stores/theme.js';

    let currentPopup = ""; // Currently opened popup project name
    let hoveredLanguage = ""; // Language of the currently hovered project card

    // Function to set current popup, supports multiple popup interactions
    const setCurrentPopup = (popupName) => {
        currentPopup = currentPopup === popupName ? "" : popupName;
    };

    // Function to handle mouse enter on a project card
    const handleMouseEnter = (language) => {
        hoveredLanguage = language;
    };

    // Function to handle mouse leave
    const handleMouseLeave = () => {
        hoveredLanguage = "";
    };

</script>

<main class="projects-container {$isDayTime ? 'day-theme' : 'night-theme'}">
    <h1 class="projects-title">Projects</h1>
    
    <div class="projects-grid">
        {#each projects as project (project.name)}
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
                hoveredLanguage={hoveredLanguage}
                onMouseEnter={() => handleMouseEnter(project.language)}
                onMouseLeave={handleMouseLeave}
            />
        {/each}
    </div>
</main>

<style>
    .projects-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem 1rem;
        background-color: inherit;
        color: inherit;
    }

    .projects-title {
        font-size: 2.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 3rem;
        color: inherit;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        width: 100%;
    }

    @media (max-width: 1200px) {
        .projects-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .projects-container {
            padding: 1.5rem 0.5rem;
        }

        .projects-title {
            font-size: 2rem;
            margin-bottom: 2rem;
        }

        .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
    }

    @media (max-width: 480px) {
        .projects-title {
            font-size: 1.5rem;
        }

        .projects-grid {
            gap: 1rem;
        }
    }
</style>
