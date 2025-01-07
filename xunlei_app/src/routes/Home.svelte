<script>
  export let isDayTime = true;
  import { faqs } from '../data/data.js';

</script>

<main class="homepage {isDayTime ? 'day-theme' : 'night-theme'}">
  <!-- Hero Section -->
  <div class="hero-section">
    <h1 class="hero-title">Welcome to My Website</h1>
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
  .homepage {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .hero-section {
    width: 100%;
    height: 77vh; /* 占据视口的 77% 高度 */
    background-image: url('/clock.jpg');
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .day-theme {
    background-color: white;
  }

  .night-theme {
    background-color: black;
  }

  .hero-title {
    top: 50%;
    left: 50%;
    transform: translate(60%, 50%);
    font-size: 2.5rem;
    color: white;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.7); /* 提升标题可读性 */
    text-align: center;
  }

  .day-card {
    background-color: #f5f5f5;
    color: #000;
  }

  .night-card {
    background-color: #2a2a3b;
    color: white;
  }



  .content-section {
    display: flex;
    flex-direction: column; /* 垂直排列内容 */
    align-items: center; /* 水平居中 */
    justify-content: center; /* 垂直居中 */
    text-align: center;
    padding: 2rem 1rem;
  }

  .faq {
    display: flex;
    flex-direction: column; /* 纵向排列卡片 */
    align-items: center; /* 水平居中 */
    width: 100%; /* 确保宽度自适应 */
  }

  .faq-card {
    max-width: 600px; /* 限制卡片最大宽度 */
    width: 100%;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 8px;
  }

  .section-title {
    text-align: center; /* 确保标题在中间 */
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }
</style>
