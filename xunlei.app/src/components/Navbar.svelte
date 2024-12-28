<script>
  import { link } from 'svelte-spa-router'; // 导入 link 函数
  export let title = "My Website";
</script>

<nav>
  <div class="logo">{title}</div>

  <ul>
    <li><a href="/" use:link>Home</a></li>
    <li><a href="/blog" use:link>Blog</a></li>
    <li><a href="/read" use:link>Read</a></li>
    <li><a href="/project" use:link>Project</a></li>
    <li><a href="/about" use:link>About</a></li>
  </ul>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
    z-index: 1000;
  }

  .logo {
    font-weight: bold;
    font-size: 1.5rem;
    margin-right: 20rem;
  }

  ul {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 1rem;
  }
</style>



