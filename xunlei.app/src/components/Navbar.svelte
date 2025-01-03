<script>
  import { link } from 'svelte-spa-router'; // 导入 use:link
  export let logo = ""; // 导航栏 logo 图片路径
  export let isDayTime = true; // 从父组件传递的主题状态
</script>

<!-- 导航栏 -->
<nav class="{isDayTime ? 'day-theme' : 'night-theme'}">
  <!-- logo 图像 -->
  <div class="logo">
    {#if logo}
      <img src="{logo}" alt="Website Logo" class="logo-img" />
    {/if}
  </div>
  <ul>
    <li><a href="/" use:link class="nav-link">Home</a></li>
    <li><a href="/blog" use:link class="nav-link">Blog</a></li>
    <li><a href="/read" use:link class="nav-link">Read</a></li>
    <li><a href="/project" use:link class="nav-link">Project</a></li>
    <li><a href="/about" use:link class="nav-link">About</a></li>
  </ul>
  
</nav>

<style>
  nav {
    position: fixed; /* 导航栏固定在页面顶部，即使滚动页面也不会移动 */
    top: 0; /* 与页面顶部对齐 */
    left: 0; /* 与页面左侧对齐 */
    width: 100%; /* 占据整个页面宽度 */
    height: 2.5rem; /* 高度设置为 2rem */
    display: flex; /* 使用 Flexbox 布局 */
    justify-content: center; /* 内容水平居中 */
    align-items: center; /* 内容垂直居中 */
    border-bottom: 1px solid; /* 添加底部边框 */
    z-index: 1000; /* 设置层级，确保导航栏在其他内容之上 */
    transition: background-color 0.5s, color 0.5s; /* 背景色和文字颜色的平滑过渡效果 */
  }


  .logo {
    margin-right: 20rem;
  }

  .logo-img {
    height: 2rem; /* 设置 logo 图片高度 */
    width: auto; /* 保持比例缩放 */
    border-radius: 50%; /* 如果需要圆形 logo，可以保留 */
    
  }

  ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    font-weight: normal;
    font-size: 1rem;
    transition: color 0.5s;
  }

  .nav-link {
    text-decoration: none;
    font-weight: normal;
    font-size: 1rem;
    transition: color 0.5s;
  }

  .nav-link:hover {
    color: #4b9cd3;
  }

 
</style>
