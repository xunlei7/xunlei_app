<script  lang="ts">
   export let isDayTime: boolean = true; // 默认白天模式
    export let onNavigate: (page: string) => void; // 导出 `onNavigate` 回调函数
  </script>
  
  <footer class="footer {isDayTime ? 'day-footer' : 'night-footer'}">
    <div class="footer-content">
      <span>© 2025 Xun Lei. All Rights Reserved. Made with love.</span>
      <a href="/" class="footer-link" on:click|preventDefault={() => onNavigate('privacy')}>Privacy</a>
    </div>
  </footer>
  
  <style>
    .footer {
      width: 100%; /* 让页脚宽度占满屏幕 */
      padding: 0.5rem 1rem;
      border-top: 1px solid #444;
      background-color: inherit; /* 继承父级背景颜色 */
    }
  
    .footer-content {
      max-width: 800px; /* 限制内容宽度 */
      margin: 0 auto; /* 将内容居中 */
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 0.5rem; /* 增加版权信息和隐私链接之间的间距 */
      color: #7a7878; /* 深灰色文字 */
      display: flex;
      flex-wrap: wrap; /* 允许内容在需要时换行 */
    
    }
  
    .footer-link {
      font-size: 0.85rem;
      text-decoration: none;
      color: inherit;
    }
  
    .footer-link:hover {
      color: inherit;
    }
  </style>
  
  