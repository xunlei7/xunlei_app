import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  base: '/', // 部署路径，如果部署在子路径，改为 '/your-subpath/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    historyApiFallback: true, // 启用 history 模式
  },
});
