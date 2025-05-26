<script>
  import Home from './routes/Home.svelte';
  import Blog from './routes/Blog.svelte';
  import Read from './routes/Read.svelte';
  import Project from './routes/Project.svelte';
  import About from './routes/About.svelte';
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Privacy from './routes/Privacy.svelte';
  

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
    privacy: Privacy, // 隐私页面
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


  function toggleTheme() {
    isDayTime = !isDayTime;
  }



</script>

<div class="{isDayTime ? 'day-theme' : 'night-theme'}">
  <Navbar {logo} {isDayTime} onNavigate={navigateTo} />

    <!-- 👇 全局主题切换按钮（出现在每个页面） -->
    <div class="theme-toggle-container">
      <button class="theme-toggle-button" on:click={toggleTheme}>
        {isDayTime ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </div>


  <main>
    {#if currentPage === "read"}
      <Read {isDayTime} />
    {:else if currentPage === "blog"}
      <Blog />
    {:else if currentPage === "home"}
      <Home {isDayTime} /> <!-- 将 isDayTime 传入 Home 组件 -->
    {:else}
      <svelte:component this="{pageComponents[currentPage]}" />
    {/if}
  </main>
 
  <Footer onNavigate={navigateTo} {isDayTime}/>
</div>




