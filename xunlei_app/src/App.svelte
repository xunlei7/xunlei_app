<script>
  import { onMount } from 'svelte';
  import Home from './routes/Home.svelte';
  import Footer from './components/Footer.svelte';
  import Privacy from './routes/Privacy.svelte';
  import NotFound from './routes/NotFound.svelte';
  import { isDayTime, updateThemeByTime } from './stores/theme.js';
  
  let currentPage = "home";

  
  // 组件映射
  const pageComponents = {
    home: Home,
    privacy: Privacy,
    notFound: NotFound, // 404 页面
  };
  
  // 初始化页面，根据当前路径设置页面
  function updatePage() {
    const path = window.location.pathname.replace("/", "") || "home";
    if (pageComponents[path]) {
      currentPage = path; // 根据路径显示页面
    } else {
      currentPage = "notFound"; // 如果路径无效，显示 404 页面
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

  // 组件挂载后设置自动主题更新
  onMount(() => {
    // 如果用户没有手动设置过主题，每分钟检查一次时间
    const stored = localStorage.getItem('theme');
    if (stored === null) {
      updateThemeByTime();
      const interval = setInterval(updateThemeByTime, 60000);
      return () => clearInterval(interval);
  }
  });
</script>

<div class="{$isDayTime ? 'day-theme' : 'night-theme'}">
  <main>
    {#if currentPage === "home"}
      <Home />
    {:else}
      <svelte:component this="{pageComponents[currentPage]}" />
    {/if}
  </main>
 
  <Footer onNavigate={navigateTo} />
</div>


