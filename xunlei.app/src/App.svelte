<script>
    import Navbar from './components/Navbar.svelte'; // 导入导航栏组件
    import Router from 'svelte-spa-router'; // 导入 Router
  
    // 导入页面
    import Home from './routes/Home.svelte';
    import Blog from './routes/Blog.svelte';
    import About from './routes/About.svelte';
    import Project from './routes/Project.svelte';
    import Read from './routes/Read.svelte';
  
    // 定义路由表
    const routes = {
      '/': Home,         // 主页
      '/blog': Blog,     // 博客页面
      '/about': About,   // 关于页面
      '/project': Project, // 项目页面
      '/read': Read,     // 阅读页面
    };
  </script>
  
  <Navbar title="Xun Website" />
  
 
<main>
  <Router {routes}/>
</main>
  
  <style>
    main {
      padding: 2rem;
      background-color: #f9f9f9;
    }
  </style>
  
  
  

 
  