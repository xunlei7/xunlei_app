<script>
  import { isDayTime, toggleTheme } from '../stores/theme.js';
  import { projects as projectData } from '../data/data.js';

  const profile = {
    name: 'Xun Lei',
    chineseName: '雷 迅',
    summary:
      "I am a Master's student at Georgetown University specializing in Data Science and Analytics. I focus on data-driven decision-making, transforming complex data into actionable insights through analytics, visualization, and storytelling.",
    interests:
      'I enjoy collaborating on projects involving machine learning, data visualization, and data-driven storytelling.'
  };

  const links = {
    linkedin: 'https://www.linkedin.com/in/xun-lei-2485aa283',
    github: 'https://github.com/xunlei7',
    gmail: 'mailto:tonylei233@gmail.com',
    resume: '/resume.pdf'
  };

  const awards = [
    {
      title: "UCSC Dean's UGRD Award",
      year: '2024'
    }
  ];

  const experiences = [
    {
      role: 'Intern',
      organization: 'Qianji Technology',
      period: 'Apr. 2024 - Jun. 2024',
      logo: '/qianji-logo.png',
      logoAlt: 'Qianji Technology',
      description: 'Trained AI models, built resource libraries, and collaborated on creative AI solutions.',
      bullets: [
        'Trained and refined AI model outputs for creative workflows.',
        'Built reusable resource libraries to support prompt design and content production.',
        'Collaborated with team members on AI-assisted creative solution development.'
      ]
    },
    {
      organization: 'University of California, Santa Cruz',
      logo: '/uc-santa-cruz.png',
      logoAlt: 'UC Santa Cruz',
      entries: [
        {
          role: 'Banking Economics Research Assistant',
          period: 'Jul. 2023 - Sep.\u00a02023',
          bullets: [
            'Conducted comprehensive analysis of global bank annual reports to evaluate how exchange rate fluctuations affect financial indicators such as cash flow, external transactions, and currency adjustments.',
            'Worked collaboratively to refine financial data handling, improving information integrity and precision through rigorous validation techniques and transparent communication channels.',
            'Utilized Excel to enhance data collection and analysis processes, improving workflow optimization and team productivity.'
          ]
        }
      ]
    }
  ];

  const education = [
    {
      school: 'Georgetown University',
      degree: 'M.S. in Data Science and Analytics',
      year: '2024 - Present',
      logo: '/georgetown.png',
      logoAlt: 'Georgetown University'
    },
    {
      school: 'University of California, Santa Cruz',
      degree: 'B.S. in Information Technology and Management',
      year: '2020 - 2023',
      logo: '/uc-santa-cruz.png',
      logoAlt: 'UC Santa Cruz'
    }
  ];

  const publication = {
    title:
      "Assessing The Impact Of Prompting, Persona, And Chain Of Thought Methods On ChatGPT's Arithmetic Capabilities",
    href: 'https://arxiv.org/abs/2312.15006',
    year: '2023'
  };

  const projectDescriptions = {
    'Coffee-Bean-Brochure':
      "We created this online coffee brochure to walk you through the different types of coffee beans, the processing steps they undergo, their geospatial distribution around the world, and trends in the global coffee bean market. Finally, we'll also take a look at how people talk about coffee online — especially on platforms like Reddit.",
    'Toxic Comments Detection System in AI Arte':
      'This project analyzes online discussions around AI-generated art by detecting toxic comments and exploring public sentiment. As AI art sparks both excitement and criticism, the system helps identify harmful language, classify toxicity, and reveal the emotional and social dynamics shaping conversations about creativity, technology, and digital communities.'
  };

  const projectImages = {
    'Toxic Comments Detection System in AI Arte': '/toxic-comments-ai-art.png'
  };

  const projectCategoryTags = {
    'Coffee-Bean-Brochure': ['Data Visualization'],
    'Toxic Comments Detection System in AI Arte': ['NLP', 'Machine Learning'],
    'YouTube-Video-Success': ['Machine Learning', 'Statistical Learning']
  };

  const projectDisplayOrder = [
    'Coffee-Bean-Brochure',
    'Toxic Comments Detection System in AI Arte',
    'YouTube-Video-Success'
  ];

  const salesDashboardProject = {
    id: 'sales-performance-analysis-dashboard',
    title: 'Sales Performance Analysis Dashboard',
    description:
      'A Tableau customer analytics dashboard designed to help sales managers, executives, and marketing teams explore customer performance, sales trends, order behavior, and business insights through interactive filters and KPI views.',
    tags: ['Tableau'],
    language: 'Tableau',
    repo: '',
    live: 'https://public.tableau.com/views/good_17679358106320/CustomerDashboard?:showVizHome=no&:embed=true&:display_count=n&:language=en-US&:device=desktop',
    previewUrl:
      'https://public.tableau.com/views/good_17679358106320/CustomerDashboard?:showVizHome=no&:embed=true&:display_count=n&:language=en-US&:device=desktop',
    image: '',
    accent: '#2f3a46',
    previewMode: 'dashboard'
  };

  const mappedProjects = projectDisplayOrder.map((projectName, index) => {
    const project = projectData.find((item) => item.name === projectName);

    return {
      id: project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: project.name,
      description: projectDescriptions[project.name] || project.description,
      tags: projectCategoryTags[project.name] || project.tags || [],
      language: project.language,
      repo: project.httpsLink,
      live: project.website,
      previewUrl: project.website || '',
      image: projectImages[project.name] || project.image || '',
      accent: ['#303741', '#263342', '#3b3f49'][index % 3]
    };
  });

  const newProjects = [
    {
      id: 'dsan-6700-final-project-group-5',
      title: 'SnapStyle — Smart Wardrobe Assistant',
      description:
        'SnapStyle is an end-to-end AI-powered virtual wardrobe system that helps users digitize their clothing, search for visually compatible items, and generate outfit recommendations from both visual similarity and natural-language style prompts. It was developed as the DSAN 6700 final project and deployed as an interactive Streamlit app on Hugging Face Spaces.',
      tags: ['Machine Learning', 'NLP'],
      language: 'Python',
      repo: 'https://github.com/CJ-TA-ORG/dsan-6700-f25-final-project-group-5',
      live: 'https://huggingface.co/spaces/jerryslade/snapstyle',
      previewUrl: '',
      image: '/snapstyle.png',
      accent: '#33404d'
    },
    {
      id: 'big-data-and-cloud-computing-project',
      title: 'Reddit Big Data Analysis',
      description:
        'This DSAN 6000 group project analyzes large-scale data with big data tools that go beyond single-machine processing. Using Apache Spark on an EC2 cluster, the project combines EDA, NLP, and machine learning to answer focused business questions from hundreds of millions of rows, then presents the findings through a structured analytical website.',
      tags: ['AWS', 'NLP'],
      language: 'Python',
      repo: 'https://github.com/gu-dsan6000/fall-2025-project-team11',
      live: '',
      previewUrl: '',
      image: '/reddit-big-data-analysis.png',
      accent: '#2d3945'
    },
    {
      id: 'dc-green-space-equity',
      title: 'D.C. Green Space Equity',
      description:
        'This project examines environmental equity in Washington, D.C. by analyzing how income and geography relate to urban park access. It investigates whether higher-income neighborhoods benefit from better green-space access and highlights potential structural disparities in city planning.',
      tags: ['Geospatial Data', 'Data Visualization'],
      language: 'R',
      repo: 'https://github.com/xunlei7/dc-green-space-equity',
      live: '',
      previewUrl: '',
      image: '/dc-green-space-equity.png',
      accent: '#5a7c3a'
    },
    {
      id: 'cybersecurity-digital-literacy',
      title: 'Cybersecurity Digital Literacy',
      description:
        'This project builds an adaptive cybersecurity literacy test using Item Response Theory and the 3PL model. The Shiny application selects True/False cybersecurity questions in real time, estimates user ability, tracks standard error, and visualizes ICC/IIC curves to make the adaptive testing process transparent and efficient.',
      tags: ['Statistical Learning'],
      language: 'R',
      repo: 'https://github.com/xunlei7/Cybersecurity-Digital-Literacy',
      live: '',
      previewUrl: '',
      image: '/cybersecurity-digital-literacy.png',
      accent: '#2f7fa5'
    }
  ];

  const featuredProjects = [
    mappedProjects[0],
    salesDashboardProject,
    ...newProjects,
    ...mappedProjects.slice(1)
  ];

  let selectedProject = featuredProjects[0];
  let showProjectModal = false;
  let activeProjectFilter = 'All';

  const projectFilters = [
    'All',
    'Data Visualization',
    'Geospatial Data',
    'Tableau',
    'Machine Learning',
    'NLP',
    'Statistical Learning',
    'AWS'
  ];

  $: filteredProjects =
    activeProjectFilter === 'All'
      ? featuredProjects
      : featuredProjects.filter((project) =>
          project.tags.some((tag) => tag.toLowerCase().includes(activeProjectFilter.toLowerCase()))
        );

  $: projectRows = filteredProjects.reduce((rows, project, index) => {
    if (index % 2 === 0) {
      rows.push([project]);
    } else {
      rows[rows.length - 1].push(project);
    }
    return rows;
  }, []);

  const navItems = [
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'achieve', label: 'Achieve' },
    { id: 'education', label: 'Education' },
    { id: 'resume', label: 'Resume' }
  ];

  const selectProject = (project) => {
    if (showProjectModal && selectedProject.id === project.id) {
      closeProjectModal();
      return;
    }
    selectedProject = project;
    showProjectModal = true;
  };

  const closeProjectModal = () => {
    showProjectModal = false;
  };

  const setProjectFilter = (filter) => {
    activeProjectFilter = filter;
    closeProjectModal();
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleWindowClick = (event) => {
    if (!showProjectModal || !(event.target instanceof Element)) {
      return;
    }

    if (!event.target.closest('.visual-project-card-wrap') && !event.target.closest('.project-popover')) {
      closeProjectModal();
    }
  };
</script>

<svelte:window on:click={handleWindowClick} />

<main class="portfolio-page {$isDayTime ? 'day-theme' : 'night-theme'}">
  <div class="portfolio-shell">
    <aside class="sidebar" aria-label="Portfolio sections">
      <div>
        <div class="identity-card">
          <img class="profile-photo" src="/profile-photo.jpg" alt="Xun Lei" loading="eager" />
          <p class="sidebar-name">{profile.name}</p>
        </div>

        <nav class="sidebar-nav">
          {#each navItems as item}
            <a
              href={`#${item.id}`}
              class="nav-link"
              on:click|preventDefault={() => scrollToSection(item.id)}
            >
              {item.label}
            </a>
          {/each}
        </nav>

        <button class="theme-menu-button" type="button" on:click={toggleTheme}>
          {#if $isDayTime}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 14.2A8.5 8.5 0 0 1 9.8 3a7 7 0 1 0 11.2 11.2z" />
            </svg>
            <span>Night Mode</span>
          {:else}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4.2a1 1 0 0 0 1-1V2a1 1 0 1 0-2 0v1.2a1 1 0 0 0 1 1zm0 15.6a1 1 0 0 0-1 1V22a1 1 0 1 0 2 0v-1.2a1 1 0 0 0-1-1zM4.2 12a1 1 0 0 0-1-1H2a1 1 0 1 0 0 2h1.2a1 1 0 0 0 1-1zm17.8-1h-1.2a1 1 0 1 0 0 2H22a1 1 0 1 0 0-2zM5.8 4.4a1 1 0 1 0-1.4 1.4l.8.8a1 1 0 1 0 1.4-1.4l-.8-.8zm13 13a1 1 0 1 0-1.4 1.4l.8.8a1 1 0 0 0 1.4-1.4l-.8-.8zM18.2 4.4l-.8.8a1 1 0 1 0 1.4 1.4l.8-.8a1 1 0 1 0-1.4-1.4zM5.2 17.4l-.8.8a1 1 0 1 0 1.4 1.4l.8-.8a1 1 0 1 0-1.4-1.4zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
            </svg>
            <span>Light Mode</span>
          {/if}
        </button>

        <div class="social-links" aria-label="External links">
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.32 8.03h4.36V23H.32V8.03zM8.08 8.03h4.18v2.05h.06c.58-1.1 2-2.26 4.12-2.26 4.41 0 5.23 2.9 5.23 6.68V23h-4.35v-7.54c0-1.8-.03-4.11-2.5-4.11-2.51 0-2.89 1.96-2.89 3.98V23H8.08V8.03z" />
            </svg>
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18A11.1 11.1 0 0 1 12 6.07c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.11c0 .31.21.68.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a href={links.gmail} aria-label="Gmail">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 5.5A2.5 2.5 0 0 1 5 3h14a2.5 2.5 0 0 1 2.5 2.5v13A2.5 2.5 0 0 1 19 21H5a2.5 2.5 0 0 1-2.5-2.5v-13zm2.4-.2 7.1 5.33 7.1-5.33H4.9zm14.6 2.1-6.78 5.08a1.2 1.2 0 0 1-1.44 0L4.5 7.4v11.1c0 .28.22.5.5.5h14a.5.5 0 0 0 .5-.5V7.4z" />
            </svg>
          </a>
        </div>
      </div>
    </aside>

    <div class="content">
      <section id="about" class="hero-section">
        <div class="hero-grid">
          <div>
            <h1>{profile.name}</h1>
            <p class="lead">{profile.summary}</p>
            <p class="lead muted">{profile.interests}</p>
          </div>
          <div class="name-block" aria-label="Chinese name">{profile.chineseName}</div>
        </div>
      </section>

      <section id="projects" class="content-section">
        <div class="section-heading">
          <h2>Projects</h2>
        </div>

        <div class="project-filter-list" aria-label="Project filters">
          {#each projectFilters as filter}
            <button
              type="button"
              class:active={activeProjectFilter === filter}
              on:click={() => setProjectFilter(filter)}
            >
              {filter}
            </button>
          {/each}
        </div>

        <div class="visual-project-rows">
          {#each projectRows as row}
            <div class="visual-project-grid">
              {#each row as project}
                <div
                  class:popup-active={showProjectModal && selectedProject.id === project.id}
                  class="visual-project-card-wrap"
                >
                  <button
                    type="button"
                    class:selected={showProjectModal && selectedProject.id === project.id}
                    class="visual-project-card"
                    on:click={() => selectProject(project)}
                  >
                    <div
                      class:dashboard-preview={project.previewMode === 'dashboard' || project.previewMode === 'dashboard-padded'}
                      class:padded-preview={project.previewMode === 'padded' || project.previewMode === 'dashboard-padded'}
                      class="project-image"
                      style={`--accent: ${project.accent};`}
                    >
                      {#if project.previewUrl}
                        <iframe
                          src={project.previewUrl}
                          title={`${project.title} preview`}
                          loading="lazy"
                          scrolling="no"
                        ></iframe>
                        <div class="preview-shade"></div>
                      {:else if project.image}
                        <img src={project.image} alt={project.title} loading="lazy" />
                      {:else}
                        <div class="image-placeholder">
                          <span>{project.language}</span>
                        </div>
                      {/if}
                    </div>
                    <div class="project-title-band">
                      <h3>{project.title}</h3>
                    </div>
                    <div class="project-tags">
                      {#each project.tags.slice(0, 3) as tag}
                        <span>{tag}</span>
                      {/each}
                    </div>
                  </button>
                </div>
              {/each}
            </div>

            {#if showProjectModal && row.some((project) => project.id === selectedProject.id)}
              <div
                class="project-popover"
                role="dialog"
                aria-modal="false"
                aria-labelledby="project-popover-title"
              >
                <button class="popover-close" type="button" aria-label="Close project details" on:click={closeProjectModal}>
                  ×
                </button>
                <p class="eyebrow">Project Summary</p>
                <h3 id="project-popover-title">{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                <div class="detail-tags">
                  {#each selectedProject.tags as tag}
                    <span>{tag}</span>
                  {/each}
                </div>
                <div class="project-links">
                  {#if selectedProject.repo}
                    <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer">View Project</a>
                  {:else if selectedProject.live}
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">View Project</a>
                  {/if}
                  {#if selectedProject.live}
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">View Website</a>
                  {/if}
                </div>
              </div>
            {/if}
          {/each}
        </div>

        {#if filteredProjects.length === 0}
          <p class="empty-projects">No projects match this filter yet.</p>
        {/if}
      </section>

      <section id="experience" class="content-section">
        <div class="section-heading">
          <h2>Experience</h2>
        </div>

        <div class="experience-list">
          {#each experiences as item, index}
            <div class:logo-right={index % 2 === 1} class="experience-card">
              <div class="experience-logo">
                {#if item.logo}
                  <img src={item.logo} alt={item.logoAlt || item.organization} loading="lazy" />
                {/if}
              </div>
              <div class="experience-copy">
                {#if item.entries}
                  {#each item.entries as entry}
                    <div class="experience-entry">
                      <h3>{entry.role}</h3>
                      <p class="experience-meta">{item.organization} | {entry.period}</p>
                      <ul>
                        {#each entry.bullets as bullet}
                          <li>{bullet}</li>
                        {/each}
                      </ul>
                    </div>
                  {/each}
                {:else}
                  <h3>{item.role}</h3>
                  <p class="experience-meta">{item.organization} | {item.period}</p>
                  <ul>
                    {#each item.bullets as bullet}
                      <li>{bullet}</li>
                    {/each}
                  </ul>
                {/if}
              </div>
            </div>
          {/each}
        </div>

      </section>

      <section id="achieve" class="content-section">
        <div class="section-heading">
          <h2>Achieve</h2>
        </div>

        <div class="achievement-card">
          <h3>Publication & Awards</h3>
          <div class="extra-entry">
            <p class="extra-label">Publication</p>
            <a class="publication-link" href={publication.href} target="_blank" rel="noopener noreferrer">
              {publication.title}
            </a>
            <p class="year">{publication.year}</p>
          </div>
          <div class="extra-entry">
            <p class="extra-label">Awards</p>
            {#each awards as award}
              <p class="award-title">{award.title}</p>
              <p class="year">{award.year}</p>
            {/each}
          </div>
        </div>
      </section>

      <section id="education" class="content-section">
        <div class="section-heading">
          <h2>Education</h2>
        </div>

        <div class="timeline-list">
          {#each education as item}
            <div class="timeline-item">
              <img class="education-logo" src={item.logo} alt={item.logoAlt || item.school} loading="lazy" />
              <div class="education-copy">
                <h3>{item.school}</h3>
                <p>{item.degree}</p>
              </div>
              <span>{item.year}</span>
            </div>
          {/each}
        </div>
      </section>

      <section id="resume" class="resume-section">
        <a class="resume-button" href={links.resume} target="_blank" rel="noopener noreferrer">Resume PDF</a>
      </section>
    </div>
  </div>
</main>

<style>
  .portfolio-page {
    min-height: 100vh;
    background-color: inherit;
    color: inherit;
  }

  .portfolio-shell {
    display: grid;
    grid-template-columns: 240px minmax(0, 1fr);
    gap: 3rem;
    width: min(1280px, calc(100% - 3rem));
    margin: 0 auto;
    padding: 2rem 0 5rem;
  }

  .sidebar {
    position: sticky;
    top: 2rem;
    align-self: start;
    color: inherit;
  }

  .identity-card {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);
    margin-bottom: 1.5rem;
  }

  .profile-photo {
    width: 9rem;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
    object-position: 64% 50%;
    display: block;
    margin-bottom: 1rem;
    border: 2px solid rgba(128, 128, 128, 0.35);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  }

  .sidebar-name {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
  }

  .sidebar-nav {
    display: grid;
    gap: 0.25rem;
  }

  .nav-link {
    color: inherit;
    text-decoration: none;
    padding: 0.45rem 0;
    opacity: 0.72;
    transition: opacity 0.2s ease, padding-left 0.2s ease, color 0.2s ease;
  }

  .nav-link:hover {
    color: #336fa6;
    opacity: 1;
    padding-left: 0.35rem;
  }

  .night-theme .nav-link:hover {
    color: #7db7ed;
  }

  .theme-menu-button {
    width: 100%;
    margin-top: 0.6rem;
    padding: 0.45rem 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font: inherit;
    text-align: left;
    opacity: 0.72;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    transition: opacity 0.2s ease, padding-left 0.2s ease, color 0.2s ease;
  }

  .theme-menu-button svg {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
    flex-shrink: 0;
  }

  .theme-menu-button:hover {
    color: #336fa6;
    opacity: 1;
    padding-left: 0.35rem;
  }

  .night-theme .theme-menu-button:hover {
    color: #7db7ed;
  }

  .social-links {
    display: flex;
    gap: 0.7rem;
    padding-top: 1rem;
  }

  .social-links a {
    width: 2.35rem;
    height: 2.35rem;
    display: grid;
    place-items: center;
    border: 1px solid rgba(128, 128, 128, 0.36);
    border-radius: 50%;
    color: inherit;
    opacity: 0.78;
    transition: transform 0.2s ease, opacity 0.2s ease, border-color 0.2s ease;
  }

  .social-links a:hover {
    opacity: 1;
    transform: translateY(-2px);
    border-color: currentColor;
  }

  .social-links svg {
    width: 1.15rem;
    height: 1.15rem;
    fill: currentColor;
  }

  .content {
    min-width: 0;
  }

  .hero-section,
  .content-section {
    scroll-margin-top: 2rem;
    border-bottom: 1px solid rgba(128, 128, 128, 0.24);
  }

  .hero-section {
    padding: 2rem 0 4rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 2.5rem;
    align-items: start;
  }

  .eyebrow {
    margin: 0 0 0.7rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    opacity: 0.58;
  }

  h1,
  h2,
  h3,
  p {
    color: inherit;
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 5.2rem);
    line-height: 0.95;
    margin: 0 0 1.5rem;
    text-align: center;
  }

  h2 {
    font-size: clamp(1.8rem, 3vw, 2.45rem);
    line-height: 1.1;
    margin: 0;
  }

  h3 {
    margin: 0;
    font-size: 1.08rem;
    line-height: 1.35;
  }

  .lead {
    max-width: 760px;
    font-size: 1.1rem;
    line-height: 1.75;
    margin: 0 0 1rem;
  }

  .muted,
  .timeline-item p {
    opacity: 0.76;
  }

  .name-block {
    writing-mode: vertical-rl;
    font-size: clamp(3rem, 8vw, 5.8rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.08em;
  }

  .content-section {
    padding: 4rem 0;
  }

  .section-heading {
    margin-bottom: 1.6rem;
  }

  .project-filter-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin: 0 0 2rem;
  }

  .project-filter-list button {
    border: 0;
    border-radius: 999px;
    padding: 0.65rem 1.05rem;
    background: rgba(48, 55, 65, 0.42);
    color: white;
    cursor: pointer;
    font: inherit;
    font-weight: 800;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .project-filter-list button:hover,
  .project-filter-list button.active {
    background: #303741;
    transform: translateY(-1px);
  }

  .empty-projects {
    margin: 2rem 0 0;
    opacity: 0.65;
  }

  .visual-project-rows {
    display: grid;
    gap: 2rem;
  }

  .visual-project-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
    align-items: start;
  }

  .visual-project-card-wrap {
    position: relative;
    z-index: 1;
  }

  .visual-project-card-wrap.popup-active {
    z-index: 2;
  }

  .visual-project-card {
    appearance: none;
    width: 100%;
    padding: 0;
    border: 0;
    border-radius: 8px;
    overflow: hidden;
    background: transparent;
    color: inherit;
    cursor: pointer;
    text-align: left;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
    transition: transform 0.24s ease, box-shadow 0.24s ease;
    transform-origin: center;
    display: grid;
    grid-template-rows: auto auto auto;
  }

  .visual-project-card:hover,
  .visual-project-card.selected {
    transform: translateY(-6px) scale(1.035);
    box-shadow: 0 18px 34px rgba(0, 0, 0, 0.2);
  }

  .visual-project-card.selected {
    outline: 3px solid currentColor;
    outline-offset: 5px;
  }

  .project-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: linear-gradient(135deg, var(--accent), #f7f7f7);
    display: grid;
    place-items: center;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(128, 128, 128, 0.18);
  }

  .project-image iframe {
    position: absolute;
    inset: 0;
    width: 200%;
    height: 200%;
    border: 0;
    transform: scale(0.5);
    transform-origin: top left;
    pointer-events: none;
    background: white;
  }

  .project-image.dashboard-preview iframe {
    width: 180%;
    height: 180%;
    transform: scale(0.5556);
    transform-origin: top left;
  }

  .project-image.dashboard-preview.padded-preview iframe {
    inset: auto;
    top: 6%;
    left: 6%;
    width: 176%;
    height: 176%;
    transform: scale(0.5);
  }

  .preview-shade {
    position: absolute;
    inset: 0;
    background: transparent;
    pointer-events: none;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    background: white;
  }

  .project-image.padded-preview img {
    width: 88%;
    height: 88%;
  }

  .image-placeholder {
    width: 76%;
    height: 66%;
    border: 1px solid rgba(255, 255, 255, 0.45);
    border-radius: 8px;
    display: grid;
    place-items: center;
    color: white;
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    background: rgba(0, 0, 0, 0.16);
  }

  .project-title-band {
    background: white;
    color: #303741;
    padding: 0.75rem 1rem 0.35rem;
    text-align: center;
    border-top: 1px solid rgba(48, 55, 65, 0.12);
    display: grid;
    place-items: center;
  }

  .project-title-band h3 {
    font-size: clamp(0.82rem, 1.45vw, 1.12rem);
    letter-spacing: 0.03em;
    line-height: 1.15;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    align-items: center;
    justify-content: center;
    padding: 0.35rem 0.8rem 0.85rem;
    background: white;
  }

  .project-tags span,
  .detail-tags span {
    border-radius: 999px;
    padding: 0.35rem 0.75rem;
    background: #303741;
    color: white;
    font-size: 0.72rem;
    font-weight: 700;
  }

  .night-theme .project-popover,
  .night-theme .project-tags span,
  .night-theme .detail-tags span {
    background: #303741;
  }

  .night-theme .project-title-band,
  .night-theme .project-tags {
    background: #202832;
    color: white;
    border-top-color: rgba(255, 255, 255, 0.12);
  }

  .project-popover {
    position: relative;
    width: 100%;
    margin: 0 auto;
    max-height: none;
    overflow-y: auto;
    padding: 1.7rem 2rem;
    border-radius: 8px;
    background: #303741;
    color: white;
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.24);
  }

  .project-popover::before {
    display: none;
  }

  .popover-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.8rem;
    height: 2.8rem;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 50%;
    background: transparent;
    color: white;
    cursor: pointer;
    font-size: 1.9rem;
    line-height: 1;
    display: grid;
    place-items: center;
  }

  .popover-close:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  .project-popover h3 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  .project-popover p {
    line-height: 1.75;
    font-size: 1.05rem;
    margin: 0 0 1.2rem;
  }

  .detail-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-bottom: 1.4rem;
  }

  .detail-tags span {
    background: rgba(255, 255, 255, 0.14);
  }

  .project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1.1rem;
  }

  .project-links a {
    color: #18c8ff;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .resume-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    padding: 1rem 0 0;
  }

  .resume-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 160px;
    padding: 0.9rem 1.2rem;
    border-radius: 999px;
    background: #303741;
    color: white !important;
    font-weight: 800;
    text-decoration: none;
    letter-spacing: 0.04em;
    box-shadow: 0 12px 24px rgba(48, 55, 65, 0.22);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .resume-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(48, 55, 65, 0.3);
  }

  .timeline-list {
    display: grid;
    gap: 1.2rem;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 190px minmax(0, 1fr) auto;
    gap: 1rem;
    align-items: center;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid rgba(128, 128, 128, 0.18);
  }

  .timeline-item:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  .timeline-item p {
    margin: 0.35rem 0 0;
    line-height: 1.6;
  }

  .education-logo {
    width: 100%;
    max-height: 76px;
    object-fit: contain;
    justify-self: start;
  }

  .education-copy {
    min-width: 0;
  }

  .timeline-item span,
  .year {
    flex-shrink: 0;
    font-size: 0.84rem;
    opacity: 0.58;
  }

  .experience-list {
    display: grid;
    gap: 1.5rem;
    width: min(720px, 100%);
    margin: 0 auto;
  }

  .experience-card {
    display: grid;
    grid-template-columns: 190px minmax(0, 1fr);
    gap: 2rem;
    align-items: center;
    padding: 1.8rem 2rem;
    border: 2px solid #303741;
    border-radius: 8px;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
    background: white;
  }

  .experience-card.logo-right {
    grid-template-columns: minmax(0, 1fr) 190px;
  }

  .experience-card.logo-right .experience-logo {
    grid-column: 2;
    grid-row: 1;
  }

  .experience-card.logo-right .experience-copy {
    grid-column: 1;
    grid-row: 1;
  }

  .experience-logo {
    min-height: 150px;
    display: grid;
    place-items: center;
    text-align: center;
  }

  .experience-logo img {
    width: 100%;
    max-width: 150px;
    max-height: 150px;
    object-fit: contain;
    display: block;
  }

  .experience-copy h3 {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    letter-spacing: 0.24em;
    text-transform: uppercase;
    margin-bottom: 0.65rem;
    font-weight: 500;
  }

  .experience-entry + .experience-entry {
    margin-top: 1.25rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(128, 128, 128, 0.22);
  }

  .experience-entry h3 {
    font-size: clamp(0.9rem, 1.25vw, 1.12rem);
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .experience-meta {
    font-size: clamp(0.78rem, 1vw, 0.92rem);
    letter-spacing: 0.025em;
    margin: 0 0 1.05rem;
    opacity: 0.82;
    white-space: nowrap;
  }

  .experience-copy ul {
    margin: 0;
    padding-left: 1.3rem;
    line-height: 1.55;
  }

  .experience-copy li {
    margin-bottom: 0.3rem;
  }

  .night-theme .experience-card {
    background: #202832;
    border-color: rgba(255, 255, 255, 0.78);
    color: #f4f6f8;
  }

  .night-theme .experience-meta {
    color: #e8edf2;
    opacity: 0.9;
  }

  .night-theme .experience-entry + .experience-entry {
    border-top-color: rgba(255, 255, 255, 0.18);
  }

  .achievement-card {
    display: grid;
    gap: 1rem;
    width: min(820px, 100%);
    margin: 0 auto;
    padding: 1.25rem;
    border: 2px solid #303741;
    border-radius: 8px;
    background: rgba(128, 128, 128, 0.04);
  }

  .achievement-card h3 {
    font-size: 1.25rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .extra-entry {
    padding-top: 0.25rem;
  }

  .extra-label {
    margin: 0 0 0.4rem;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.62;
  }

  .publication-link {
    display: inline;
    line-height: 1.7;
    color: inherit;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 1px solid currentColor;
  }

  .award-title {
    margin-bottom: 0.2rem;
  }

  @media (max-width: 980px) {
    .portfolio-shell {
      grid-template-columns: 1fr;
      gap: 2rem;
      width: min(100% - 2rem, 860px);
    }

    .sidebar {
      position: static;
      border-bottom: 1px solid rgba(128, 128, 128, 0.24);
      padding-bottom: 1rem;
    }

    .identity-card {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
    }

    .sidebar-nav,
    .social-links {
      display: flex;
      flex-wrap: wrap;
      column-gap: 1rem;
    }

    .social-links {
      padding-top: 1.25rem;
    }

    .visual-project-grid {
      grid-template-columns: 1fr;
    }

    .experience-card {
      grid-template-columns: 1fr;
      gap: 1.4rem;
      padding: 1.6rem 1.25rem;
    }

    .experience-card.logo-right {
      grid-template-columns: 1fr;
    }

    .experience-logo,
    .experience-card.logo-right .experience-logo {
      grid-column: auto;
      grid-row: auto;
      border-bottom: 1px solid rgba(128, 128, 128, 0.24);
      padding: 0 0 1rem;
    }

    .experience-card.logo-right .experience-copy {
      grid-column: auto;
      grid-row: auto;
    }

    .experience-meta {
      white-space: normal;
    }

    .experience-entry h3 {
      white-space: normal;
    }

  }

  @media (max-width: 680px) {
    .portfolio-shell {
      width: min(100% - 1.25rem, 860px);
      padding-top: 1rem;
    }

    .hero-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .name-block {
      writing-mode: horizontal-tb;
      font-size: 3rem;
      letter-spacing: 0.02em;
    }

    .timeline-item {
      grid-template-columns: 1fr;
    }

    .education-logo {
      max-width: 220px;
    }

    .content-section {
      padding: 3rem 0;
    }

    .project-popover {
      position: static;
      width: auto;
      margin-top: 1rem;
      padding: 1.1rem;
    }

    .project-popover::before {
      display: none;
    }

    .resume-section {
      display: flex;
      padding: 1.4rem;
    }
  }
</style>
