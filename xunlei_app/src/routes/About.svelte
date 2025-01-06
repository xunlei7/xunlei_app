<script>
    let email = "tonylei233@gmail.com"; // 替换为你的邮箱
  </script>
  
  <div class="container">
    <!-- 工作状态更新卡片 -->
    <div class="card">
      <h2 class="heading">Looking For Opportunities</h2>
      <p>I am seeking a full-time role or internship in Data Analytics. Please feel free to reach out or share this with someone who is hiring! 💙</p>
      <div class="btn-container">
        <button class="btn" on:click={() => window.location.href = `mailto:${email}`}>
            <span class="icon">
            <!-- SVG 邮件图标 -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            </span>
            Email Me
        </button>
      </div>
    </div>
  
        <!-- 个人简介 -->
    <div class="bio-container">
        <div class="name-chinese">雷 迅</div>
        <div class="bio-text">
        <p class="about-text">
            Xun Lei, a Master's student at Georgetown University specializing in Data Science and Analytics, focuses on data-driven decision-making. He thrives in dynamic environments, transforming complex data into actionable insights.
        </p>
        <p class="about-text">
            He enjoys collaborating on projects involving machine learning, data visualization, and data-driven storytelling, always eager to tackle new challenges and contribute to impactful solutions.
        </p>
        </div>
    </div>


    <!-- Awards -->
    <div>
      <h3 class="section-heading">Awards</h3>
      <ul class="about-text list">
        <li>
          UCSC Dean's UGRD Award
          <p class="year">2024</p>
        </li>
      </ul>
    </div>

  
    <!-- Experience -->
    <div>
      <h3 class="section-heading">Experience</h3>
      <ul class="about-text list">
        <li>
          AI Training Intern, Qianji Technology
          <p class="description">Trained AI models, built resource libraries, and collaborated on creative AI solutions.</p>
          <p class="year">2024</p>
        </li>
        <li>
          Banking Economics Research Assistant, UCSC
          <p class="description">Analyzed global financial reports and developed data workflows to optimize processes.</p>
          <p class="year">2023</p>
        </li>
      </ul>
    </div>

    <!-- Publication -->
    <div>
        <h3 class="section-heading">Publication</h3>
        <ul class="about-text list">
        <li>
            <a href="https://arxiv.org/abs/2312.15006" target="_blank" class="publication-link">
                Assessing The Impact Of Prompting, Persona, And Chain Of Thought Methods On Chatgpt's Arithmetic Capabilities
            </a>
            <p class="year">2023</p>
        </li>
        </ul>
    </div>
  
    <!-- Education -->
    <div>
      <h3 class="section-heading">Education</h3>
      <ul class="about-text list">
        <li>
          Georgetown University
          <p class="description">M.S. in Data Science and Analytics </p>
          <p class="year">2024 - Present</p>
        </li>
        <li>
          University of California, Santa Cruz
          <p class="description">B.S. in Information Technology and Management</p>
          <p class="year">2020 - 2023</p>
        </li>
      </ul>
    </div>
  </div>
  

  <style>
    .container {
      max-width: 700px;
      margin: 2rem auto;
      padding: 1rem;
    }
  
    .card {
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      background-color: inherit;
      text-align: center;
      border: 1px solid gray;
    }


  
    .btn {
      background-color: inherit;
      border: 1px solid currentColor;
      padding: 10px 20px;
      color: inherit;
      font-size: 0.9rem;
      border-radius: 5px;
      cursor: pointer;
    }
  
    .btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .btn-container {
        display: flex;
        justify-content: center; /* 水平居中 */
        margin-top: 1.5rem; /* 与上方内容的间距 */
    }
  
    .section-heading {
      font-size: 1.2rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
      text-align: left;
    }
  
    .about-text {
      font-size: 1rem; /* 合并重复样式 */
      line-height: 1.6;
      text-align: justify;
    }
  
    .list {
      list-style: none;
      padding: 0;
    }
  
    .list li {
      margin-bottom: 1rem;
    }
  
    .description {
      margin: 0.2rem 0 0.5rem 0;
      color: #aaa;
    }
  
    .year {
      font-size: 0.8rem;
      color: gray;
      margin-top: 0.2rem;
    }
  
    .bio-container {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 2rem;
      margin-bottom: 2rem;
    }
  
    .name-chinese {
      font-size: 4rem; /* 大号中文名字 */
      font-weight: bold;
      line-height: 1.2;
      writing-mode: vertical-rl; /* 竖排文字 */
      text-align: center;
      
    }
  
    .bio-text {
      flex: 1;
    }

    .publication-link {
        color: inherit;
        text-decoration: none; /* 默认无下划线 */
        transition: text-decoration 0.2s ease;
        
    }

    .publication-link:hover {
        text-decoration: underline; /* 悬停时显示下划线 */
    }

    .btn {
        background-color: inherit; /* 背景颜色 */
        border: 1px solid currentColor; /* 边框颜色 */
        padding: 10px 20px;
        color: inherit; /* 使用父容器颜色 */
        font-size: 1rem;
        border-radius: 5px;
        cursor: pointer;
        display: flex; /* 使用 flex 布局 */
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
    }

    .btn:hover {
        background-color: rgba(255, 255, 255, 0.1); /* hover 背景变化 */
    }

    .icon {
        margin-right: 0.5rem; /* 图标和文字之间的间距 */
    }

    .size-6 {
        width: 20px;
        height: 20px; /* 设置 SVG 图标大小 */
    }
  
    @media (min-width: 768px) {
      .container {
        padding: 2rem;
      }
    }
  
    @media (max-width: 768px) {
      .bio-container {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
  
      .name-chinese {
        writing-mode: horizontal-tb; /* 小屏幕时改为水平排列 */
        margin-bottom: 1rem;
      }
  
      .bio-text {
        text-align: justify;
      }
    }
  </style>
  
  