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
    '/': Home,
    '/blog': Blog,
    '/read': Read,
    '/project': Project,
    '/about': About,
  };


  // 定义动态主题变量
  let isDayTime = true;

  // 设置 logo 图片路径
  let logo = "src/assets/logo.png";


  // 更新主题的方法
  const updateTheme = () => {
    const currentHour = new Date().getHours(); // 获取当前小时
    isDayTime = currentHour >= 6 && currentHour < 18; // 白天时间：6 AM - 6 PM
  };

  // 页面加载时立即设置主题
  updateTheme();

  // 每分钟更新一次主题
  setInterval(updateTheme, 60000); // 每分钟检查一次时间
</script>

<!-- 应用全局主题 -->
<div class="{isDayTime ? 'day-theme' : 'night-theme'}">
  <!-- 导航栏 -->
  <Navbar {logo} {isDayTime}/>

  <!-- 主内容区域 -->
  <main>
    <Router {routes} props={{ isDayTime }}/>
  
  </main>
</div>

