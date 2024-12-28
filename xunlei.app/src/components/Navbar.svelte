<script>
  export let title = "My Website";
</script>

<nav>
  <div class="logo">{title}</div>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#blog">Blog</a></li>
    <li><a href="#read">Read</a></li>
    <li><a href="#project">Project</a></li>
    <li><a href="#about">About</a></li>
  </ul>
</nav>

<style>
  /* 设置导航栏的样式 */
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; /* 占满宽度 */
    height: 4rem; /* 设置导航栏高度 */
    display: flex; /* 使用 Flexbox 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    background-color: #f8f8f8; /* 背景颜色 */
    border-bottom: 1px solid #ddd; /* 添加底部边框 */
    z-index: 1000; /* 确保导航栏位于顶部 */
  }

  /* 调整 logo 的样式 */
  .logo {
    font-weight: bold;
    font-size: 1.5rem;
    margin-right: 2rem; /* 与菜单之间留出间距 */
  }

  /* 设置导航菜单的样式 */
  ul {
    list-style: none;
    display: flex;
    gap: 1.5rem; /* 设置菜单项之间的间距 */
    margin: 0;
    padding: 0;
  }

  /* 设置导航链接的样式 */
  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 1rem; /* 字体大小 */
  }
</style>


