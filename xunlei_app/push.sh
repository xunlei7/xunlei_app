#!/bin/bash
# Local script - Commit and push to GitHub
# Usage: ./push.sh [commit message]
# If no commit message is provided, a default message will be used

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📤 Preparing to push to GitHub..."
echo "📁 Project directory: $PROJECT_DIR"

cd "$PROJECT_DIR"

# Check if there are uncommitted changes
if git diff-index --quiet HEAD -- 2>/dev/null && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo "✅ No changes to commit"
    exit 0
fi

echo "📋 Current Git status:"
git status --short

# Get commit message
COMMIT_MSG="${1:-Update website}"

echo ""
echo "📝 Commit message: $COMMIT_MSG"
echo ""

# Add all changes
echo "➕ Adding all changes..."
git add -A

# Commit
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code successfully pushed to GitHub!"
echo ""
echo "📝 Next steps:"
echo "   Run ./deploy.sh on EC2 to deploy the updates"
echo ""
echo "   Or connect via SSH:"
echo "   ssh -i ../xunleiweb.pem ec2-user@18.212.87.232"
echo "   cd ~/projects/xunlei_app/xunlei_app && ./deploy.sh"
