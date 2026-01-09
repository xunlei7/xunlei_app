<script>
  import { isDayTime } from '../stores/theme.js';
  import { faqs } from '../data/data.js';

  // Tableau 配置 - Customer Dashboard
  // 来源: https://public.tableau.com/views/good_17679358106320/CustomerDashboard
  const tableauConfig = {
    // 使用 iframe 嵌入 URL（英文版本，优化后的嵌入格式）
    embedUrl: 'https://public.tableau.com/views/good_17679358106320/CustomerDashboard?:showVizHome=no&:embed=true&:display_count=n&:language=en-US',
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
    publicUrl: 'https://public.tableau.com/views/good_17679358106320/CustomerDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    hasTableau: true // 设置为 true 后显示可视化，否则显示占位符
  };
</script>

<main class="{$isDayTime ? 'day-theme' : 'night-theme'}">
  <!-- Hero Section -->
  <div class="hero-section">
    <div class="hero-content">
      <img src="./mountain.png" class="hero-image" alt="" loading="eager">
      <h1 class="hero-title">Welcome !</h1>
    </div>
  </div>

  <!-- Tableau Project Section -->
  {#if tableauConfig.hasTableau && tableauConfig.embedUrl}
    <div class="tableau-section">
      <div class="tableau-container">
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
        
        <div class="tableau-wrapper">
          <iframe
            src={tableauConfig.embedUrl}
            width="100%"
            height="827"
            frameborder="0"
            allowfullscreen
            class="tableau-iframe"
            title="Customer Dashboard - Tableau Visualization"
            scrolling="no"
          ></iframe>
        </div>
        
        <!-- 可选：添加直接链接到 Tableau Public -->
        {#if tableauConfig.publicUrl}
          <div class="tableau-link-container">
            <a href={tableauConfig.publicUrl} target="_blank" rel="noopener noreferrer" class="tableau-link">
              View on Tableau Public →
            </a>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <div class="tableau-section">
      <div class="tableau-container">
        <h2 class="tableau-title">{tableauConfig.title}</h2>
        <p class="tableau-description">{tableauConfig.description}</p>
        
        <div class="tableau-wrapper">
          <div class="tableau-placeholder">
            <div class="placeholder-content">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H21V21H3V3ZM5 5V19H19V5H5ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z" fill="currentColor"/>
              </svg>
              <h3>Tableau Visualization Coming Soon</h3>
              <p>To display your Tableau project here:</p>
              <ol class="instructions-list">
                <li>Open your <code>.twb</code> file in Tableau Desktop</li>
                <li>Go to <strong>Server</strong> → <strong>Tableau Public</strong> → <strong>Save to Tableau Public</strong></li>
                <li>Sign in or create a free <a href="https://public.tableau.com/" target="_blank" rel="noopener noreferrer">Tableau Public</a> account</li>
                <li>Publish your workbook to Tableau Public</li>
                <li>After publishing, click <strong>Share</strong> button</li>
                <li>Click <strong>Embed</strong> tab and copy the embed URL</li>
                <li>Paste the URL in <code>tableauConfig.embedUrl</code> in <code>Home.svelte</code></li>
                <li>Set <code>tableauConfig.hasTableau = true</code> to display the visualization</li>
              </ol>
              <p class="note">💡 <strong>Note:</strong> Tableau Public is free, but your workbook will be publicly visible.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Data Science Journey Section -->
  <div class="content-section">
    <h1 class="section-title"> Data Science Journey</h1>

    <!-- FAQ Section -->
    <section class="faq">
      <h2>Frequently Asked Questions</h2>
      {#each faqs as faq}
        <details
          class="faq-card"
          class:day-card="{$isDayTime}"
          class:night-card="{!$isDayTime}"
        >
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      {/each}
    </section>
  </div>
</main>

<style>
  .hero-section {
    width: 100%; /* 占满视口宽度 */
    height: 77vh; /* 占据视口高度的 2/3 */
    position: relative;
    overflow: hidden;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%; /* 让内容垂直居中 */
 
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  .hero-title {
    position: absolute; /* 使标题相对于 .hero-section 定位 */
    top: 20%; /* 垂直居中 */
    left: 50%; /* 水平居中 */
    transform: translate(-50%, -50%); /* 使居中生效 */
    font-size: 2.5rem;
    color: white;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    z-index: 1; /* 确保标题在图片上方 */
  }

  .day-theme {
    background-color: white;
  }

  .night-theme {
    background-color: black;
  }

  .content-section {
    display: flex;
    flex-direction: column; /* 垂直排列内容 */
    align-items: center; /* 水平居中 */
    justify-content: center; /* 垂直居中 */
    text-align: center;
    padding: 4rem 1rem; /* 增加顶部间距 */
  }

  .faq {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem; /* 间隔距离 */
  }

  .faq-card {
    max-width: 600px; /* 限制卡片最大宽度 */
    width: 100%;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 8px;
    border: 2px solid #444; /* 添加边框 */
  }

  .section-title {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }

  .faq-card:hover {
    border-color: #007bff;
  }

  .faq-card summary {
  font-size: 1.25rem;
  font-weight: bold;
  }

  /* Tableau Section Styles */
  .tableau-section {
    width: 100%;
    padding: 4rem 1rem;
    background-color: inherit;
    color: inherit;
  }

  .tableau-container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
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

  @media (max-width: 768px) {
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

  .tableau-iframe {
    width: 100%;
    height: 827px;
    border: none;
    display: block;
  }

  @media (max-width: 500px) {
    .tableau-iframe {
      height: 2877px; /* 移动端需要更高的高度 */
    }
  }

  .tableau-placeholder {
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: inherit;
    border: 2px dashed rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  .day-theme .tableau-placeholder {
    border-color: rgba(0, 0, 0, 0.2);
    background-color: #f8f9fa;
  }

  .night-theme .tableau-placeholder {
    border-color: rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.05);
  }

  .placeholder-content {
    max-width: 600px;
    text-align: left;
  }

  .placeholder-content svg {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    opacity: 0.6;
  }

  .placeholder-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: inherit;
  }

  .placeholder-content p {
    font-size: 1rem;
    line-height: 1.6;
    color: inherit;
    opacity: 0.8;
    margin-bottom: 1rem;
  }

  .instructions-list {
    text-align: left;
    margin: 1.5rem 0;
    padding-left: 1.5rem;
    color: inherit;
    opacity: 0.9;
  }

  .instructions-list li {
    margin-bottom: 0.8rem;
    line-height: 1.6;
  }

  .instructions-list code {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }

  .night-theme .instructions-list code {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .note {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: rgba(0, 123, 255, 0.1);
    border-left: 4px solid #007bff;
    border-radius: 4px;
    font-size: 0.95rem;
  }

  .tableau-link-container {
    margin-top: 2rem;
  }

  .tableau-link {
    display: inline-block;
    padding: 0.75rem 2rem;
    background-color: inherit;
    color: inherit;
    border: 2px solid currentColor;
    border-radius: 6px;
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .tableau-link:hover {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    .tableau-wrapper {
      min-height: 400px;
    }

    .tableau-iframe {
      height: 400px;
    }

    .tableau-placeholder {
      height: 400px;
      padding: 1.5rem;
    }

    .tableau-title {
      font-size: 1.5rem;
    }
  }

</style>
