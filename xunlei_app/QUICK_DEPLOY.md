# 快速部署指南

## 🚀 快速开始

### 1. 上传到 GitHub

```bash
cd /Users/xunlei/Desktop/xunlei_app/xunlei_app

# 查看更改
git status

# 添加所有更改
git add .

# 提交
git commit -m "feat: Complete website with Tableau dashboard and improvements"

# 推送到 GitHub
git push origin main
```

### 2. 部署到 AWS Amplify（最简单）

1. **访问 AWS Amplify 控制台**
   - https://console.aws.amazon.com/amplify/
   - 点击 "New app" → "Host web app"

2. **连接 GitHub**
   - 选择 "GitHub"
   - 授权并选择你的仓库
   - 选择分支：`main`

3. **构建设置（自动检测）**
   - Amplify 会自动检测到 `amplify.yml`
   - 如果没有，使用以下设置：
     - Build settings: 使用项目根目录的 `amplify.yml`
     - App root: `/`（如果项目在根目录）或 `/xunlei_app`（如果项目在子目录）

4. **保存并部署**
   - 点击 "Save and deploy"
   - 等待 5-10 分钟

5. **配置路由（重要！）**
   - 部署完成后，进入应用设置
   - 点击 "Rewrites and redirects"
   - 添加规则：
     ```
     Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|svg|woff|woff2|ttf|eot)$)([^.]+$)/>
     Target: /index.html
     Status: 200 (Rewrite)
     ```

6. **完成！**
   - 你会得到一个 URL，例如：`https://main.xxxxx.amplifyapp.com`
   - 可以自定义域名

---

## 📦 手动构建和部署

如果需要手动构建：

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 构建产物在 dist/ 文件夹
# 可以上传到 S3 或其他静态托管服务
```

---

## 🔗 相关文档

详细部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)
