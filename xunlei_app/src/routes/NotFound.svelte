<script>
  import { isDayTime } from '../stores/theme.js';
</script>

<main class="not-found-container {$isDayTime ? 'day-theme' : 'night-theme'}">
  <div class="not-found-content">
    <h1 class="error-code">404</h1>
    <h2 class="error-title">Page Not Found</h2>
    <p class="error-message">
      Sorry, the page you are looking for does not exist or has been moved.
    </p>
    <a href="/" class="home-link" on:click|preventDefault={() => window.location.href = '/'}>
      Go Back Home
    </a>
  </div>
</main>

<style>
  .not-found-container {
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: inherit;
    color: inherit;
  }

  .not-found-content {
    text-align: center;
    max-width: 600px;
  }

  .error-code {
    font-size: 8rem;
    font-weight: bold;
    margin: 0;
    line-height: 1;
    color: inherit;
    opacity: 0.8;
  }

  .error-title {
    font-size: 2rem;
    margin: 1rem 0;
    color: inherit;
  }

  .error-message {
    font-size: 1.1rem;
    margin: 1.5rem 0;
    color: inherit;
    opacity: 0.8;
    line-height: 1.6;
  }

  .home-link {
    display: inline-block;
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    background-color: inherit;
    color: inherit;
    border: 2px solid currentColor;
    border-radius: 6px;
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .home-link:hover {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    .error-code {
      font-size: 5rem;
    }

    .error-title {
      font-size: 1.5rem;
    }
  }
</style>
