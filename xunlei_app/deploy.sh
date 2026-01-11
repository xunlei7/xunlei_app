#!/bin/bash
# One-click deployment script - Update code and deploy to EC2
# Usage: ./deploy.sh

set -euo pipefail

PROJECT_DIR="/home/ec2-user/projects/xunlei_app/xunlei_app"
DIST_DIR="$PROJECT_DIR/dist"

echo "🚀 Starting deployment..."
echo "📁 Project directory: $PROJECT_DIR"

cd "$PROJECT_DIR"

echo "📥 Pulling latest code..."
git fetch origin
git pull --ff-only origin main

echo "📦 Installing dependencies..."
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

echo "🔨 Building project..."
npm run build

echo "🔧 Setting file permissions (ensure Nginx can read, keep owner unchanged)..."
# Directories executable, files readable
find "$DIST_DIR" -type d -exec chmod 755 {} \;
find "$DIST_DIR" -type f -exec chmod 644 {} \;

# Ensure dist ownership remains ec2-user (prevent build write failures)
sudo chown -R ec2-user:ec2-user "$DIST_DIR"

echo "🔄 Checking Nginx configuration..."
sudo nginx -t

echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo ""
echo "✅ Deployment completed!"
echo "🌐 Access URL:"
echo "   https://xunlei.im"
echo ""
echo "🧪 Quick self-check:"
echo "   curl -I https://xunlei.im | head -n 1"
echo "   curl -I https://xunlei.im/assets/ | head -n 1 (404 is normal if directory indexing is disabled)"
echo ""
echo "📜 Nginx error logs: sudo tail -50 /var/log/nginx/error.log"
