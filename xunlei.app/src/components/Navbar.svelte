<script>
  import { link } from 'svelte-spa-router'; // 导入 link 函数
  export let title = "My Website"; // 导航栏标题
  export let isDayTime = true; // 从父组件传递的主题状态
</script>

<!-- 导航栏 -->
<nav class="{isDayTime ? 'day-theme' : 'night-theme'}">
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
    font-weight: bold;
    font-size: 1.5rem;
    margin-right: 20rem;
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
    font-weight: bold;
    font-size: 1rem;
    transition: color 0.5s;
  }


</style>
