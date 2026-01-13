#!/bin/bash

# Deployment script that runs locally and deploys to EC2
# This script will:
# 1. Build the project locally
# 2. Push changes to GitHub (optional)
# 3. SSH to EC2 and pull latest changes
# 4. Build and deploy on EC2

set -euo pipefail

# Configuration
EC2_USER="ec2-user"
EC2_HOST="18.212.87.232"
EC2_KEY_PATH="../../xunleiweb.pem"  # PEM file is in Desktop directory
PROJECT_DIR="/home/ec2-user/projects/xunlei_app/xunlei_app"
REMOTE_REPO_URL="https://github.com/xunlei7/xunlei.app.git"  # Update this with your actual repo URL
DIST_DIR="dist"
# Set to "auto" to skip commit message prompt, or "manual" to require input
COMMIT_MODE="auto"  # Options: "auto" (use default message) or "manual" (prompt for input)

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment...${NC}"

# Step 1: Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root directory.${NC}"
    exit 1
fi

# Step 2: Check if PEM key exists and validate
if [ ! -f "$EC2_KEY_PATH" ]; then
    echo -e "${RED}❌ Error: PEM key not found at $EC2_KEY_PATH${NC}"
    echo -e "${YELLOW}   Please make sure the PEM key exists at: $EC2_KEY_PATH${NC}"
    echo -e "${YELLOW}   Or update EC2_KEY_PATH in this script (line 15).${NC}"
    echo -e "${YELLOW}   Current working directory: $(pwd)${NC}"
    echo -e ""
    echo -e "${YELLOW}   To get a new PEM key:${NC}"
    echo -e "${YELLOW}   1. Go to AWS EC2 Console > Key Pairs${NC}"
    echo -e "${YELLOW}   2. Create or download a new key pair${NC}"
    echo -e "${YELLOW}   3. Save it as xunleiweb.pem in: $(dirname "$(realpath "$EC2_KEY_PATH")")${NC}"
    exit 1
fi

# Set proper permissions for PEM key (required by SSH)
chmod 400 "$EC2_KEY_PATH" 2>/dev/null || echo -e "${YELLOW}⚠️  Warning: Could not set PEM key permissions${NC}"

# Test SSH connection before proceeding
echo -e "${BLUE}🔍 Testing SSH connection...${NC}"
ABS_KEY_PATH="$(cd "$(dirname "$EC2_KEY_PATH")" && pwd)/$(basename "$EC2_KEY_PATH")"
if ssh -i "$ABS_KEY_PATH" -o StrictHostKeyChecking=no -o ConnectTimeout=5 -o BatchMode=yes $EC2_USER@$EC2_HOST "echo 'Connection successful'" 2>/dev/null; then
    echo -e "${GREEN}✅ SSH connection successful${NC}"
else
    echo -e "${RED}❌ SSH connection failed!${NC}"
    echo -e "${YELLOW}   This could mean:${NC}"
    echo -e "${YELLOW}   1. The PEM key is expired or invalid${NC}"
    echo -e "${YELLOW}   2. The EC2 instance is down or IP changed${NC}"
    echo -e "${YELLOW}   3. Network connectivity issues${NC}"
    echo -e ""
    echo -e "${YELLOW}   To update the PEM key:${NC}"
    echo -e "${YELLOW}   1. Go to AWS EC2 Console > Key Pairs${NC}"
    echo -e "${YELLOW}   2. Create a new key pair or use existing one${NC}"
    echo -e "${YELLOW}   3. Update the EC2 instance's key pair (may require stopping/starting instance)${NC}"
    echo -e "${YELLOW}   4. Download the new PEM file and save it as xunleiweb.pem${NC}"
    echo -e "${YELLOW}   5. Update EC2_KEY_PATH in this script if the location changed${NC}"
    echo -e ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Step 3: Build project locally (optional check)
echo -e "${BLUE}📦 Building project locally...${NC}"
if [ -f "package.json" ]; then
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    npm run build
    echo -e "${GREEN}✅ Local build completed${NC}"
fi

# Step 4: Push to GitHub (optional)
read -p "Do you want to push changes to GitHub? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}📤 Pushing to GitHub...${NC}"
    
    # Check if there are changes to commit
    if [ -z "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}⚠️  No changes to commit${NC}"
    else
        git add -A
        
        # Generate default commit message
        DEFAULT_MSG="Update: $(date '+%Y-%m-%d %H:%M:%S')"
        
        if [ "$COMMIT_MODE" = "auto" ]; then
            # Auto mode: use default commit message without prompting
            COMMIT_MSG="$DEFAULT_MSG"
            echo -e "${BLUE}📝 Using auto commit message: $COMMIT_MSG${NC}"
        else
            # Manual mode: prompt for commit message
            read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
            if [ -z "$COMMIT_MSG" ]; then
                COMMIT_MSG="$DEFAULT_MSG"
            fi
        fi
        
        git commit -m "$COMMIT_MSG"
        git push origin main
        echo -e "${GREEN}✅ Pushed to GitHub${NC}"
    fi
fi

# Step 5: SSH to EC2 and deploy
echo -e "${BLUE}🔐 Connecting to EC2 and deploying...${NC}"

# ABS_KEY_PATH is already set in Step 2
# Execute deployment commands on EC2
ssh -i "$ABS_KEY_PATH" -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST << 'ENDSSH'
set -euo pipefail

PROJECT_DIR="/home/ec2-user/projects/xunlei_app/xunlei_app"
DIST_DIR="dist"

echo "📁 Navigating to project directory..."
cd "$PROJECT_DIR" || {
    echo "❌ Error: Project directory not found: $PROJECT_DIR"
    echo "Please make sure the project is cloned on EC2 first."
    exit 1
}

echo "📥 Pulling latest changes from GitHub..."
git fetch origin

# Check if there are local changes that would conflict
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Local changes detected. Stashing them before pull..."
    git stash push -m "Auto-stash before deployment $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Reset to match remote (discard any local commits that aren't on remote)
git reset --hard origin/main || {
    echo "⚠️  Warning: git reset failed. Trying pull instead..."
    git pull origin main || {
        echo "❌ Error: Failed to update code from GitHub"
        exit 1
    }
}

echo "✅ Code updated successfully"

echo "📦 Installing dependencies..."
if [ -f "package-lock.json" ]; then
    npm ci
else
    npm install
fi

echo "🔨 Building project..."
npm run build

echo "📂 Setting permissions..."
if [ -d "$DIST_DIR" ]; then
    # Set directory permissions
    find "$DIST_DIR" -type d -exec chmod 755 {} \;
    # Set file permissions
    find "$DIST_DIR" -type f -exec chmod 644 {} \;
    # Set ownership
    sudo chown -R ec2-user:ec2-user "$DIST_DIR"
else
    echo "❌ Error: dist directory not found after build"
    exit 1
fi

echo "🔄 Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Deployment completed successfully!"
ENDSSH

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}Your website should be live at http://$EC2_HOST${NC}"
