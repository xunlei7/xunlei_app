<script>
  import { isDayTime } from '../stores/theme.js';

  // Coffee Bean Brochure Project Configuration
  const coffeeBeanProject = {
    embedUrl: 'https://xunlei.georgetown.domains/visualization_project/',
    title: 'Coffee Bean Brochure',
    subtitle: 'Interactive Data Visualization',
    technology: 'Quarto Website',
    description: 'An interactive Quarto website exploring coffee bean types, processing methods, global quality and trade data, and social media sentiment analysis. This project combines data visualization, storytelling, and interactive web technologies to provide insights into the world of coffee.',
    features: [
      'D3.js Visualizations: Interactive charts and graphs for data exploration',
      'Coffee Data Analysis: Comprehensive analysis of coffee bean types, quality, and trade',
      'Sentiment Analysis: Social media sentiment analysis from Reddit text mining',
      'Geospatial Analysis: Global trade data visualization and mapping',
      'Data Storytelling: Engaging narrative-driven data presentation',
      'Quarto Website: Modern web framework for data science publications'
    ],
    hasProject: true
  };

  // Tableau Configuration - Customer Dashboard
  const tableauConfig = {
    embedUrl: 'https://public.tableau.com/views/good_17679358106320/CustomerDashboard?:showVizHome=no&:embed=true&:display_count=n&:language=en-US&:device=desktop',
    title: 'Sales Performance Analysis Dashboard',
    subtitle: 'Customer Analytics',
    technology: 'Built with Tableau',
    description: 'A comprehensive analytics solution designed for sales managers, executives, and marketing teams to analyze customer performance, sales trends, and business insights. This interactive dashboard provides year-over-year comparisons, customer segmentation, and key performance indicators to support data-driven decision making.',
    features: [
      'KPI Overview: Total customers, sales per customer, and order volumes with year-over-year comparison',
      'Customer Trends: Monthly analysis identifying highest and lowest performing periods',
      'Customer Distribution: Insights into customer behavior and engagement by order frequency',
      'Top 10 Customers: Detailed ranking with profit, sales, orders, and last order date'
    ],
    howToUse: 'Use the three filter buttons (Region/State/City, Product Category/Subcategory, and Customer filters) to dynamically explore data by location, product type, and customer segments. All charts are interactive - click on any chart element to filter the dashboard.',
    hasTableau: true
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
</script>

<main class="{$isDayTime ? 'day-theme' : 'night-theme'}">
  <!-- Welcome Section -->
  <div class="welcome-section">
    <div class="welcome-content">
      <h1 class="welcome-title">Welcome!</h1>
      <p class="welcome-subtitle">Explore my data science projects and visualizations</p>
    </div>
  </div>

  <div class="content-layout">
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <h3 class="sidebar-title">Table of Contents</h3>
        <ul class="nav-list">
          {#if coffeeBeanProject.hasProject}
            <li>
              <a href="#coffee-bean-brochure" on:click|preventDefault={() => scrollToSection('coffee-bean-brochure')} class="nav-link">
                Coffee Bean Brochure
              </a>
            </li>
          {/if}
          {#if tableauConfig.hasTableau}
            <li>
              <a href="#sales-performance" on:click|preventDefault={() => scrollToSection('sales-performance')} class="nav-link">
                Sales Performance Analysis
              </a>
            </li>
          {/if}
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Coffee Bean Brochure Project Section -->
      {#if coffeeBeanProject.hasProject && coffeeBeanProject.embedUrl}
        <div id="coffee-bean-brochure" class="tableau-section">
          <div class="tableau-container coffee-bean-container">
            <div class="tableau-header">
              <div>
                <h2 class="tableau-title">{coffeeBeanProject.title}</h2>
                {#if coffeeBeanProject.subtitle}
                  <p class="tableau-subtitle">{coffeeBeanProject.subtitle}</p>
                {/if}
              </div>
              <span class="tableau-tech">{coffeeBeanProject.technology}</span>
            </div>
            <p class="tableau-description">{coffeeBeanProject.description}</p>
            
            {#if coffeeBeanProject.features && coffeeBeanProject.features.length > 0}
              <div class="tableau-features">
                <h3 class="features-title">Key Features</h3>
                <ul class="features-list">
                  {#each coffeeBeanProject.features as feature}
                    <li class="feature-item">{feature}</li>
                  {/each}
                </ul>
              </div>
            {/if}
            
            <div class="tableau-wrapper coffee-bean-wrapper">
              <iframe
                src={coffeeBeanProject.embedUrl}
                width="100%"
                height="1200"
                frameborder="0"
                allowfullscreen
                class="tableau-iframe coffee-bean-iframe"
                title="Coffee Bean Brochure - Interactive Website"
                scrolling="yes"
              ></iframe>
            </div>
          </div>
        </div>
      {/if}

      <!-- Tableau Project Section -->
      {#if tableauConfig.hasTableau && tableauConfig.embedUrl}
        <div id="sales-performance" class="tableau-section">
          <div class="tableau-container tableau-container-large">
            <div class="tableau-header">
              <div>
                <h2 class="tableau-title">{tableauConfig.title}</h2>
                {#if tableauConfig.subtitle}
                  <p class="tableau-subtitle">{tableauConfig.subtitle}</p>
                {/if}
              </div>
              <span class="tableau-tech">{tableauConfig.technology}</span>
            </div>
            <p class="tableau-description">{tableauConfig.description}</p>
            
            {#if tableauConfig.features && tableauConfig.features.length > 0}
              <div class="tableau-features">
                <h3 class="features-title">Key Features</h3>
                <ul class="features-list">
                  {#each tableauConfig.features as feature}
                    <li class="feature-item">{feature}</li>
      {/each}
                </ul>
              </div>
            {/if}
            
            {#if tableauConfig.howToUse}
              <div class="tableau-instructions">
                <span class="instruction-icon">🖱️</span>
                <span class="instruction-text">{tableauConfig.howToUse}</span>
              </div>
            {/if}
            
            <div class="tableau-wrapper tableau-wrapper-large">
              <iframe
                src={tableauConfig.embedUrl}
                width="100%"
                height="850"
                frameborder="0"
                allowfullscreen
                class="tableau-iframe tableau-iframe-large"
                title="Customer Dashboard - Tableau Visualization"
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>

<style>
  .day-theme {
    background-color: white;
  }

  .night-theme {
    background-color: black;
  }

  /* Welcome Section Styles */
  .welcome-section {
    width: 100%;
    padding: 3rem 1rem;
    background-color: inherit;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .welcome-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .welcome-title {
    font-size: 3rem;
    font-weight: bold;
    margin: 0 0 1rem 0;
    color: inherit;
    letter-spacing: -0.02em;
  }

  .welcome-subtitle {
    font-size: 1.25rem;
    color: inherit;
    opacity: 0.7;
    margin: 0;
    line-height: 1.6;
  }

  /* Content Layout */
  .content-layout {
    display: flex;
    gap: 3rem;
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Sidebar Styles - Reference teacher's page style */
  .sidebar {
    flex-shrink: 0;
    width: 200px;
    position: sticky;
    top: 100px;
    align-self: flex-start;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }

  .sidebar-nav {
    padding: 0;
    background-color: inherit;
    border: none;
  }

  .sidebar-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: inherit;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.7;
  }

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-list li {
    margin-bottom: 0.5rem;
  }

  .nav-link {
    display: block;
    padding: 0.5rem 0;
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    border: none;
    font-weight: normal;
    opacity: 0.8;
  }

  .nav-link:hover {
    opacity: 1;
    color: #007bff;
    background-color: transparent;
    padding-left: 0.25rem;
  }

  .night-theme .nav-link:hover {
    color: #4da6ff;
  }

  /* Main Content */
  .main-content {
    flex: 1;
    min-width: 0;
  }

  /* Tableau Section Styles */
  .tableau-section {
    width: 100%;
    padding: 4rem 0;
    background-color: inherit;
    color: inherit;
    scroll-margin-top: 100px;
  }

  .tableau-container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 0 1rem;
  }

  .tableau-container-large {
    max-width: 1350px;
  }

  .coffee-bean-container {
    max-width: 1600px;
  }

  .tableau-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .tableau-header > div {
    flex: 1;
    text-align: left;
  }

  .tableau-title {
    font-size: 2rem;
    margin: 0 0 0.25rem 0;
    color: inherit;
    font-weight: 600;
  }

  .tableau-subtitle {
    font-size: 1.1rem;
    margin: 0;
    color: inherit;
    opacity: 0.7;
    font-weight: 400;
  }

  .tableau-tech {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    background-color: rgba(0, 123, 255, 0.1);
    color: #007bff;
    border-radius: 20px;
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
    align-self: flex-start;
    margin-top: 0.25rem;
  }

  .night-theme .tableau-tech {
    background-color: rgba(0, 123, 255, 0.2);
    color: #4da6ff;
  }

  .tableau-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    color: inherit;
    opacity: 0.85;
    line-height: 1.7;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }

  .tableau-features {
    margin-bottom: 1.5rem;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }

  .features-title {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: inherit;
    font-weight: 600;
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 0.75rem;
  }

  .feature-item {
    font-size: 0.95rem;
    color: inherit;
    opacity: 0.85;
    line-height: 1.6;
    padding: 0.75rem 1rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    border-left: 3px solid #007bff;
    position: relative;
    padding-left: 1.75rem;
  }

  .feature-item::before {
    content: '✓';
    position: absolute;
    left: 0.75rem;
    color: #007bff;
  font-weight: bold;
  }

  .night-theme .feature-item {
    background-color: rgba(255, 255, 255, 0.05);
    border-left-color: #4da6ff;
  }

  .night-theme .feature-item::before {
    color: #4da6ff;
  }

  .tableau-instructions {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem 1.5rem;
    background-color: rgba(0, 123, 255, 0.08);
    border-left: 3px solid #007bff;
    border-radius: 6px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }

  .night-theme .tableau-instructions {
    background-color: rgba(0, 123, 255, 0.12);
    border-left-color: #4da6ff;
  }

  .instruction-icon {
    font-size: 1.3rem;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  .instruction-text {
    font-size: 0.95rem;
    color: inherit;
    opacity: 0.9;
    line-height: 1.6;
  }

  .tableau-wrapper {
    width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    min-height: 600px;
    background-color: inherit;
  }

  .tableau-wrapper-large {
    width: 100%;
    max-width: 1200px;
    min-height: 850px;
    position: relative;
    margin: 0 auto;
  }

  .coffee-bean-wrapper {
    min-height: 1200px;
  }

  .tableau-iframe {
    width: 100%;
    border: none;
    display: block;
  }

  .tableau-iframe-large {
    width: 100%;
    height: 850px;
    max-width: 1300px;
  }

  .coffee-bean-iframe {
    height: 1200px;
  }

  @media (max-width: 500px) {
    .tableau-iframe {
      height: 600px;
    }

    .tableau-wrapper-large {
      width: 100%;
      height: auto;
      min-height: 700px;
      max-width: 100%;
    }

    .tableau-iframe-large {
      width: 100%;
      height: 700px;
      max-width: 100%;
    }
    
    .coffee-bean-iframe {
      height: 800px;
    }
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .content-layout {
      flex-direction: column;
      gap: 1rem;
      max-width: 100%;
      padding: 0 1rem;
    }

    .sidebar {
      width: 100%;
      position: static;
      max-height: none;
    }

    .sidebar-nav {
      padding: 0;
    }

    .nav-list {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .nav-list li {
      margin-bottom: 0;
    }

    .nav-link {
      padding: 0.5rem 0;
      border: none;
      font-size: 0.9rem;
    }

    .nav-link:hover {
      padding-left: 0.25rem;
      border: none;
    }

    .sidebar-title {
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }

    .coffee-bean-container,
    .tableau-container-large {
      max-width: 100%;
    }

    .tableau-wrapper-large {
      width: 100%;
      height: auto;
      min-height: 700px;
    }

    .tableau-iframe-large {
      width: 100% !important;
      height: 700px;
    }
  }

  @media (max-width: 768px) {
    .welcome-title {
      font-size: 2rem;
    }

    .welcome-subtitle {
      font-size: 1rem;
    }

    .welcome-section {
      padding: 2rem 1rem;
    }

    .tableau-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .tableau-header > div {
      width: 100%;
    }

    .tableau-tech {
      align-self: flex-start;
    }

    .features-list {
      grid-template-columns: 1fr;
    }

    .tableau-description,
    .tableau-features,
    .tableau-instructions {
      text-align: left;
    }

    .tableau-wrapper {
      min-height: 400px;
    }

    .tableau-wrapper-large {
      width: 100% !important;
      height: auto;
      min-height: 750px;
    }

    .coffee-bean-wrapper {
      min-height: 800px;
    }

    .tableau-iframe {
      height: 600px;
    }

    .tableau-iframe-large {
      width: 100%;
      height: 750px;
      max-width: 100%;
    }

    .coffee-bean-iframe {
      height: 800px;
    }

    .tableau-title {
      font-size: 1.5rem;
    }

    .tableau-section {
      padding: 2rem 0;
    }
  }
</style>
