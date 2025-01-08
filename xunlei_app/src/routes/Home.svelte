<script>
  export let isDayTime = true;
  import { faqs } from '../data/data.js';
</script>

<main class="{isDayTime ? 'day-theme' : 'night-theme'}">
  <!-- Hero Section -->
  <div class="hero-section">
    <div class="hero-content">
      <img src="./mountain.png" class="hero-image" alt="">
      <h1 class="hero-title">Welcome !</h1>
    </div>
  </div>

  <!-- Data Science Journey Section -->
  <div class="content-section">
    <h1 class="section-title"> Data Science Journey</h1>

    <!-- FAQ Section -->
    <section class="faq">
      <h2>Frequently Asked Questions</h2>
      {#each faqs as faq}
        <details
          class="faq-card"
          class:day-card="{isDayTime}"
          class:night-card="{!isDayTime}"
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
    height: 70vh; /* 占据视口高度的 2/3 */
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


</style>
