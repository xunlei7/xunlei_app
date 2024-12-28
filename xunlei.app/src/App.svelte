<script>
    import Navbar from './components/Navbar.svelte'; // 引入导航栏组件
  </script>
  
  <Navbar title="My Website" />
  
  <main>
    <section id="home">
      <h1>Welcome to My Website</h1>
      <p>Explore my projects and blogs below!</p>
    </section>
    <section id="blog">
      <h2>Blog</h2>
      <p>This is my blog section.</p>
    </section>
    <section id="project">
      <h2>Projects</h2>
      <p>These are my projects.</p>
    </section>
    <section id="about">
        <h2>Projects</h2>
        <p>These are my projects.</p>
      </section>
  </main>
  
  <style>
    main {
      padding: 2rem;
      text-align: center;
      color: white;
      background-color: #333;
    }
  
    section {
      margin: 2rem 0;
      padding: 2rem;
      border: 1px solid #fff;
    }
  </style>
  