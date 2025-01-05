<script>
  import Home from './routes/Home.svelte';
  import Blog from './routes/Blog.svelte';
  import Read from './routes/Read.svelte';
  import Project from './routes/Project.svelte';
  import About from './routes/About.svelte';
  import Navbar from './components/Navbar.svelte';

  let isDayTime = true;
  let logo = "/logo.png";
  let currentPage = "home";

  // 组件映射
  const pageComponents = {
    home: Home,
    blog: Blog,
    read: Read,
    project: Project,
    about: About,
  };
  // 初始化页面，根据当前路径设置页面
  function updatePage() {
    const path = window.location.pathname.replace("/", "") || "home";
    if (pageComponents[path]) {
      currentPage = path; // 根据路径显示页面
    } else {
      currentPage = "home"; // 如果路径无效，显示首页
    }
  }

  // 页面导航函数
  function navigateTo(page) {
    currentPage = page; // 更新当前页面
    window.history.pushState({}, "", `/${page === "home" ? "" : page}`); // 更新地址栏
  }

  // 监听浏览器前进/后退按钮事件
  window.addEventListener("popstate", updatePage);
  
  updatePage();
  
  const updateTheme = () => {
    const currentHour = new Date().getHours();
    isDayTime = currentHour >= 6 && currentHour < 18;
  };

  updateTheme();
  setInterval(updateTheme, 60000);

</script>

<div class="{isDayTime ? 'day-theme' : 'night-theme'}">
  <Navbar {logo} {isDayTime} onNavigate={navigateTo} />
  <main>
    <!-- 动态加载页面 -->
    {#if pageComponents[currentPage]}
      <svelte:component this="{pageComponents[currentPage]}" />
    {:else}
      <h1>Page Not Found</h1>
    {/if}
  </main>
</div>




