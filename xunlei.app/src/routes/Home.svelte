<section class="home">
    <h1>Welcome to My Website</h1>
    <p>Explore my projects, software, and thoughts.</p>
    <button on:click={() => alert('Start Exploring!')}>Get Started</button>
  </section>
  
  <style>
    .home {
      text-align: center;
      padding: 4rem 2rem;
      background: #f0f0f5;
      color: #333;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #555;
    }
    button {
      background: #007aff;
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover {
      background: #005bb5;
    }
  </style>
  