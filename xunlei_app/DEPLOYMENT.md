# 部署指南 - GitHub & AWS

本指南将帮助你将项目上传到 GitHub 并部署到 AWS。

## 📋 目录
1. [上传到 GitHub](#上传到-github)
2. [部署到 AWS](#部署到-aws)
   - [选项 1: AWS Amplify (推荐)](#选项-1-aws-amplify-推荐)
   - [选项 2: AWS S3 + CloudFront](#选项-2-aws-s3--cloudfront)

---

## 上传到 GitHub

### 步骤 1: 检查并提交更改

```bash
cd /Users/xunlei/Desktop/xunlei_app/xunlei_app

# 查看当前更改
git status

# 添加所有更改
git add .

# 提交更改（使用有意义的提交信息）
git commit -m "feat: Add Tableau dashboard, theme store, 404 page, and image lazy loading

- Add Customer Dashboard Tableau visualization
- Implement theme store with localStorage persistence
- Add 404 Not Found page
- Add image lazy loading for better performance
- Update all components to use theme store
- Improve project showcase on homepage"

# 推送到 GitHub
git push origin main
```

### 步骤 2: 如果还没有 GitHub 仓库

```bash
# 在 GitHub 上创建新仓库后，添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 或者如果已经存在，更新远程仓库 URL
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 推送代码
git push -u origin main
```

---

## 部署到 AWS

### 选项 1: AWS Amplify (推荐) ⭐

AWS Amplify 是最简单的部署方式，支持自动 CI/CD。

#### 步骤 1: 构建项目

```bash
cd /Users/xunlei/Desktop/xunlei_app/xunlei_app

# 安装依赖（如果需要）
npm install

# 构建生产版本
npm run build
```

构建完成后，`dist` 文件夹包含所有静态文件。

#### 步骤 2: 在 AWS Amplify 控制台部署

1. **登录 AWS 控制台**
   - 访问 https://console.aws.amazon.com/
   - 搜索 "Amplify"

2. **创建新应用**
   - 点击 "New app" → "Host web app"
   - 选择 "Deploy without Git provider"（手动部署）
   - 或者选择 "GitHub" 连接你的仓库（推荐，支持自动部署）

3. **如果选择手动部署**
   - 压缩 `dist` 文件夹内容（不是 dist 文件夹本身）
   - 上传 ZIP 文件
   - 应用名称：`xunlei-app`
   - 点击 "Save and deploy"

4. **如果选择 GitHub 连接**
   - 授权 GitHub 访问
   - 选择仓库和分支（main）
   - Amplify 会自动检测构建设置
   - 构建设置（如果自动检测失败）：
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - cd xunlei_app
             - npm install
         build:
           commands:
             - npm run build
       artifacts:
         baseDirectory: xunlei_app/dist
         files:
           - '**/*'
       cache:
         paths:
           - xunlei_app/node_modules/**/*
     ```

5. **配置路由（重要）**
   - 在 Amplify 控制台，进入你的应用
   - 点击 "Rewrites and redirects"
   - 添加规则：
     ```
     Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|svg|woff|woff2|ttf|eot)$)([^.]+$)/>
     Target: /index.html
     Status: 200 (Rewrite)
     ```
     这确保 SPA 路由正常工作。

6. **获取部署 URL**
   - 部署完成后，你会得到一个 URL，例如：`https://main.xxxxx.amplifyapp.com`
   - 可以自定义域名（在 "Domain management" 中）

#### 优势
- ✅ 自动 CI/CD（每次 push 自动部署）
- ✅ 免费 SSL 证书
- ✅ CDN 加速
- ✅ 简单易用

---

### 选项 2: AWS S3 + CloudFront

适合需要更多控制的情况。

#### 步骤 1: 构建项目

```bash
cd /Users/xunlei/Desktop/xunlei_app/xunlei_app
npm run build
```

#### 步骤 2: 创建 S3 存储桶

1. **在 AWS 控制台创建 S3 存储桶**
   - 访问 https://console.aws.amazon.com/s3/
   - 点击 "Create bucket"
   - 存储桶名称：`xunlei-app`（必须是全局唯一）
   - 区域：选择最近的区域
   - 取消勾选 "Block all public access"（需要公开访问）
   - 确认警告并创建

2. **配置静态网站托管**
   - 进入存储桶 → "Properties" 标签
   - 滚动到 "Static website hosting"
   - 点击 "Edit"
   - 启用静态网站托管
   - 索引文档：`index.html`
   - 错误文档：`index.html`（SPA 需要）
   - 保存

3. **配置存储桶策略**
   - 进入 "Permissions" 标签
   - 点击 "Bucket policy"
   - 添加以下策略（替换 `YOUR_BUCKET_NAME`）：
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
       }
     ]
   }
   ```

4. **上传文件**
   - 进入 "Objects" 标签
   - 点击 "Upload"
   - 选择 `dist` 文件夹中的所有文件
   - 上传

#### 步骤 3: 配置 CloudFront（可选，推荐）

1. **创建 CloudFront 分发**
   - 访问 https://console.aws.amazon.com/cloudfront/
   - 点击 "Create distribution"
   - Origin domain：选择你的 S3 存储桶
   - Viewer protocol policy：Redirect HTTP to HTTPS
   - 默认根对象：`index.html`
   - 点击 "Create distribution"

2. **配置错误页面（重要）**
   - 进入分发设置 → "Error pages" 标签
   - 创建自定义错误响应：
     - HTTP error code: `403`
     - Customize error response: `Yes`
     - Response page path: `/index.html`
     - HTTP response code: `200`
   - 重复上述步骤，为 `404` 错误也添加相同配置

3. **等待部署完成**
   - CloudFront 部署通常需要 10-15 分钟
   - 完成后会得到一个 CloudFront URL：`https://xxxxx.cloudfront.net`

#### 优势
- ✅ 更低的成本（S3 存储很便宜）
- ✅ 全球 CDN 加速
- ✅ 更多控制选项

---

## 🔧 构建配置检查

确保 `vite.config.js` 配置正确：

```javascript
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  base: '/', // 如果部署在子路径，改为 '/your-subpath/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    historyApiFallback: true,
  },
});
```

---

## 📝 部署后检查清单

- [ ] 网站可以正常访问
- [ ] 所有路由正常工作（Home, Blog, Read, Project, About）
- [ ] 404 页面正常显示
- [ ] Tableau 可视化正常加载
- [ ] 主题切换功能正常
- [ ] 图片懒加载正常工作
- [ ] 移动端响应式布局正常

---

## 🐛 常见问题

### 问题 1: 路由 404 错误
**解决方案**: 确保配置了正确的重写规则（见上方配置）

### 问题 2: Tableau 可视化无法加载
**解决方案**: 
- 检查 Tableau Public URL 是否正确
- 确保 iframe 没有被浏览器阻止
- 检查浏览器控制台是否有 CORS 错误

### 问题 3: 资源加载失败
**解决方案**: 
- 检查 `vite.config.js` 中的 `base` 配置
- 确保所有资源路径使用相对路径

---

## 📚 相关资源

- [AWS Amplify 文档](https://docs.amplify.aws/)
- [AWS S3 静态网站托管](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)

---

## 💡 提示

1. **使用环境变量**: 如果需要不同环境的配置，可以使用 `.env` 文件
2. **自定义域名**: 在 AWS 中可以配置自定义域名和 SSL 证书
3. **监控**: 使用 AWS CloudWatch 监控网站性能
4. **备份**: 定期备份代码和构建产物

---

祝你部署顺利！🚀
