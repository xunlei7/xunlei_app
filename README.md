# Xun Lei's Personal Website

A personal portfolio website showcasing projects, blog posts, reading records, and data visualization work.

🌐 **Live Site**: [https://xunlei.im](https://xunlei.im)

---

## ✨ Features

### Core Features
- 🏠 **Home** - Features Tableau data visualization projects and FAQ
- 📝 **Blog** - Personal blog posts
- 📚 **Reading Records** - Books and movies/TV shows collection with year-based browsing and timeline view
- 💼 **Projects** - Technical project portfolio with GitHub links and project details
- 👤 **About** - Personal introduction, experience, education, and contact information
- 🔒 **Privacy Policy** - Website privacy policy

### Technical Features
- 🌓 **Theme Toggle** - Light/dark mode with automatic switching and manual override, user preferences saved in localStorage
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- ⚡ **Performance Optimization** - Image lazy loading for faster page loads
- 🎨 **Tableau Integration** - Embedded interactive Tableau data visualization dashboards
- 🚦 **404 Page** - User-friendly error page handling

---

## 🛠️ Tech Stack

- **Frontend Framework**: [Svelte](https://svelte.dev/) 5.15.0
- **Build Tool**: [Vite](https://vitejs.dev/) 6.4.1
- **Routing**: Custom routing implementation (based on History API)
- **State Management**: Svelte Stores (theme state)
- **Data Visualization**: Tableau Public
- **Deployment**: AWS EC2 + Nginx

---

## 📁 Project Structure

```
xunlei_app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.svelte   # Navigation bar
│   │   ├── Footer.svelte   # Footer
│   │   └── ProjectCard.svelte  # Project card component
│   ├── routes/              # Page routes
│   │   ├── Home.svelte     # Home page
│   │   ├── Blog.svelte     # Blog page
│   │   ├── Read.svelte     # Reading records page
│   │   ├── Project.svelte  # Projects page
│   │   ├── About.svelte    # About page
│   │   ├── Privacy.svelte  # Privacy policy page
│   │   └── NotFound.svelte # 404 page
│   ├── stores/              # State management
│   │   └── theme.js        # Theme store (with localStorage persistence)
│   ├── data/                # Data files
│   │   └── data.js         # Centralized data management (books, movies, projects, blog, etc.)
│   ├── App.svelte          # Root component
│   ├── app.css             # Global styles
│   └── main.js             # Entry point
├── public/                  # Static assets
├── dist/                    # Build output
├── deploy.sh                # One-click deployment script
└── package.json            # Project configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

Build output will be in the `dist/` directory

### Preview Production Build

```bash
npm run preview
```

---

## 📝 Data Management

All data is centrally managed in `src/data/data.js`:

- **books** - Book data (title, author, image, description, year)
- **movies** - Movie/TV show data (title, director, image, description, year, type)
- **projects** - Project data (name, description, language, tags, Git links, website links)
- **blogEntries** - Blog entries (date, title, text, image)
- **faqs** - Frequently asked questions (question, answer)

### Adding New Content

Simply add corresponding data objects directly in `data.js`.

---

## 🎨 Theme System

The website uses Svelte Stores for theme state management:

- **Auto Switch**: Automatically switches based on time (6:00-18:00 is light mode)
- **Manual Toggle**: Users can manually toggle via button
- **Persistence**: User preferences saved in localStorage, preserved after refresh
- **Global State**: All components access theme state through Store

### Using Theme Store

```javascript
import { isDayTime, toggleTheme } from './stores/theme.js';

// Use in component
<div class="{$isDayTime ? 'day-theme' : 'night-theme'}">
  <!-- content -->
</div>

// Toggle theme
<button on:click={toggleTheme}>Toggle Theme</button>
```

---

## 📊 Tableau Visualization Integration

The home page features an embedded Tableau Public data visualization dashboard.

### Configuring Tableau

Edit the `tableauConfig` object in `src/routes/Home.svelte`:

```javascript
const tableauConfig = {
  embedUrl: 'YOUR_TABLEAU_EMBED_URL',
  title: 'Dashboard Title',
  subtitle: 'Subtitle',
  technology: 'Built with Tableau',
  description: 'Description...',
  features: [...],
  howToUse: 'Usage instructions...',
  publicUrl: 'YOUR_TABLEAU_PUBLIC_URL',
  hasTableau: true
};
```

### Getting Tableau Embed URL

1. Open workbook in Tableau Desktop
2. Publish to Tableau Public
3. Click Share → Embed
4. Copy the embed URL
5. Paste into `embedUrl` field

---

## 🌐 Deployment

### Deploy to EC2

The website is deployed on AWS EC2 using Nginx as the web server.

#### One-Click Deployment

```bash
# Run on EC2
cd ~/projects/xunlei_app/xunlei_app
./deploy.sh
```

The deployment script automatically:
1. Pulls latest code
2. Installs dependencies
3. Builds the project
4. Sets file permissions
5. Reloads Nginx

#### Manual Deployment

```bash
cd ~/projects/xunlei_app/xunlei_app
git pull origin main
npm install
npm run build
sudo chmod -R 755 dist
sudo chown -R ec2-user:ec2-user dist
sudo systemctl reload nginx
```

### Nginx Configuration

Website Nginx configuration at `/etc/nginx/conf.d/xunlei-app.conf`:

```nginx
server {
    listen 80;
    server_name xunlei.im www.xunlei.im 18.212.87.232;

    root /home/ec2-user/projects/xunlei_app/xunlei_app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🛣️ Routing System

The website uses a custom routing implementation based on History API:

- `/` - Home
- `/blog` - Blog
- `/read` - Reading records
- `/project` - Projects
- `/about` - About
- `/privacy` - Privacy policy
- Other paths - 404 page

Routing logic is implemented in `src/App.svelte`.

---

## 🎯 Development Guide

### Adding a New Page

1. Create a new Svelte component in `src/routes/`
2. Import and add to `pageComponents` in `src/App.svelte`
3. Add navigation link in `Navbar.svelte`

### Modifying Theme Styles

Global theme styles are defined in `src/app.css`:
- `.day-theme` - Light mode styles
- `.night-theme` - Dark mode styles

### Adding New Data

Add corresponding data array elements in `src/data/data.js`.

---

## 📦 Dependencies

### Core Dependencies

- `svelte` - Svelte framework
- `vite` - Build tool
- `@sveltejs/vite-plugin-svelte` - Svelte Vite plugin

### Other Dependencies

- `esbuild` - JavaScript bundler
- `github-calendar` - GitHub calendar component (installed but not used)
- `svelte-spa-router` - SPA router library (installed but using custom routing)

---

## 🔧 Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📄 License

This is a personal project. All rights reserved.

---

## 👤 Author

**Xun Lei (雷迅)**

- Email: tonylei233@gmail.com
- GitHub: [@xunlei7](https://github.com/xunlei7)
- Website: [https://xunlei.im](https://xunlei.im)

---

## 🙏 Acknowledgments

- [Svelte](https://svelte.dev/) - Excellent frontend framework
- [Vite](https://vitejs.dev/) - Fast build tool
- [Tableau Public](https://public.tableau.com/) - Data visualization platform

---

## 📝 Changelog

### Latest Updates
- ✅ Added Tableau data visualization integration
- ✅ Implemented theme store with localStorage persistence
- ✅ Added 404 page
- ✅ Implemented image lazy loading
- ✅ Optimized code structure using Svelte Stores for state management
- ✅ Created one-click deployment script

---

## 🐛 Troubleshooting

If you encounter issues, check:

1. Node.js version meets requirements
2. Dependencies are correctly installed
3. Nginx configuration and file permissions (when deploying)
4. Browser console for error messages

---

**Last Updated**: January 2025
