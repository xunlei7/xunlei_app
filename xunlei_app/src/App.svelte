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

  // 书籍列表
  let books = [
    
    { title: "The C Programming Language", author: "Brian W. Kernighan and Dennis M. Ritchie", image:"/Cbook.jpg", description: "The book serves as both an introduction to the C programming language and a reference guide. It provides a concise, authoritative explanation of the language's core concepts, syntax, and powerful features, with numerous examples and exercises to solidify understanding.",year: "Reading Now" },
    { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "Reading Now" },
    { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2014" },
    { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2014" },
    { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2014" },
    { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2014" },
    { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2015" },
    { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2022" },
    { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2022" },
    { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2016" },
    { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2014" },
  ];


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
    {#if currentPage === "read"}
      <!-- 将 books 列表传递给 Read 页面 -->
      <Read {isDayTime} {books} />
    {:else}
      <svelte:component this="{pageComponents[currentPage]}" />
    {/if}
  </main>
  
</div>




