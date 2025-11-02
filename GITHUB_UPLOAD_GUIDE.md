# Step-by-Step Guide: Uploading Mobile Mart to GitHub

## Prerequisites
- GitHub account ([sign up](https://github.com/signup) if you don't have one)
- Git installed on your computer ([download here](https://git-scm.com/downloads))

---

## 📋 Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `mobile-mart` (or your preferred name)
   - **Description**: Paste this:
     ```
     Modern full-stack e-commerce platform for mobile devices. Built with Next.js, React, TypeScript, Tailwind CSS, Node.js, and Express.
     ```
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

---

## 📋 Step 2: Prepare Your Project (If Git Not Initialized)

Open your terminal/command prompt in your project folder (`mobile-mart`).

### Check if Git is already initialized:
```bash
git status
```

If you see an error like "not a git repository", continue with Step 2a.
If you see file listings, skip to Step 3.

### Step 2a: Initialize Git (Only if needed)
```bash
git init
```

---

## 📋 Step 3: Create .gitignore File (If Not Exists)

Create a `.gitignore` file in your project root:

```bash
# Create .gitignore file
```

Or create it manually with these contents:

```gitignore
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
Thumbs.db

# Backend (if you have a backend folder)
backend/node_modules/
backend/.env
backend/uploads/
```

---

## 📋 Step 4: Add All Files to Git

```bash
# Add all files to staging
git add .

# Or add files individually if you prefer:
# git add README.md
# git add app/
# git add package.json
# etc.
```

---

## 📋 Step 5: Create Your First Commit

```bash
git commit -m "Initial commit: Mobile Mart e-commerce platform

- Next.js frontend with React and TypeScript
- Node.js/Express backend
- Product catalog with search and filters
- Shopping cart with localStorage persistence
- User authentication pages
- Responsive design with Tailwind CSS"
```

**Note**: If this is your first time using Git, configure your identity:

```bash
# Set your name (replace with your name)
git config --global user.name "Your Name"

# Set your email (replace with your GitHub email)
git config --global user.email "your.email@example.com"
```

---

## 📋 Step 6: Connect to GitHub Repository

Copy the repository URL from GitHub (it will look like this):
- HTTPS: `https://github.com/yourusername/mobile-mart.git`
- SSH: `git@github.com:yourusername/mobile-mart.git`

### Add the remote repository:
```bash
# Replace 'yourusername' with your GitHub username
git remote add origin https://github.com/yourusername/mobile-mart.git
```

**Or if using SSH:**
```bash
git remote add origin git@github.com:yourusername/mobile-mart.git
```

### Verify the remote was added:
```bash
git remote -v
```

You should see:
```
origin  https://github.com/yourusername/mobile-mart.git (fetch)
origin  https://github.com/yourusername/mobile-mart.git (push)
```

---

## 📋 Step 7: Push to GitHub

### Push your code to GitHub:
```bash
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)
  - How to create: [GitHub Personal Access Tokens Guide](#creating-personal-access-token)

**If you get authentication errors**, see the troubleshooting section below.

---

## 📋 Step 8: Set Up Repository Description & Topics

After pushing, go back to your GitHub repository page:

1. Click the **⚙️ Settings** icon (gear) next to "About"
2. Add/update:
   - **Description**: `Modern full-stack e-commerce platform for mobile devices. Built with Next.js, React, TypeScript, Tailwind CSS, Node.js, and Express.`
   - **Website** (if deployed): Your deployment URL
   - **Topics**: Add these tags:
     - `e-commerce`
     - `nextjs`
     - `react`
     - `typescript`
     - `nodejs`
     - `express`
     - `tailwindcss`
     - `mongodb`
     - `mobile-shop`
     - `shopping-cart`
     - `full-stack`

3. Click **Save changes**

---

## 🔄 Future Updates: How to Push Changes

Whenever you make changes to your project:

```bash
# 1. Check what files changed
git status

# 2. Add changed files
git add .

# Or add specific files:
# git add app/page.tsx
# git add README.md

# 3. Commit with a descriptive message
git commit -m "Add feature: Shopping cart functionality"

# 4. Push to GitHub
git push origin main
```

---

## 🔧 Troubleshooting

### Issue: "Authentication failed" or "Permission denied"

**Solution**: Use Personal Access Token instead of password

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use the token as your password when pushing

### Issue: "Repository not found"

**Solution**: Check:
- Repository name is correct
- Repository exists on GitHub
- You have access to the repository
- Remote URL is correct: `git remote -v`

### Issue: "Branch 'main' does not exist"

**Solution**: 
```bash
# Check current branch
git branch

# Create and switch to main
git checkout -b main

# Or rename current branch
git branch -M main
```

### Issue: "fatal: not a git repository"

**Solution**:
```bash
# Initialize git first
git init
```

---

## 📝 Creating Personal Access Token

1. Go to GitHub.com → Click your profile picture (top right)
2. Select **Settings**
3. Scroll down → Click **Developer settings**
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Fill in:
   - **Note**: "Mobile Mart Project"
   - **Expiration**: Choose duration (90 days recommended)
   - **Scopes**: Check `repo` (this gives full control of private repositories)
7. Click **Generate token**
8. **COPY THE TOKEN IMMEDIATELY** (you won't see it again)
9. Use this token as your password when pushing to GitHub

---

## ✅ Verification

After pushing, verify everything worked:

1. Go to your GitHub repository page
2. You should see:
   - ✅ All your files listed
   - ✅ README.md displays correctly
   - ✅ Repository description is set
   - ✅ Topics are added
   - ✅ Commit history shows your initial commit

---

## 🎉 Success!

Your project is now on GitHub! You can:
- Share the repository URL
- Clone it on other machines
- Collaborate with others
- Deploy to hosting platforms

**Repository URL**: `https://github.com/yourusername/mobile-mart`

---

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

## Quick Command Reference

```bash
# Initialize git (if needed)
git init

# Add files
git add .

# Commit changes
git commit -m "Your commit message"

# Add remote (replace with your URL)
git remote add origin https://github.com/yourusername/mobile-mart.git

# Push to GitHub
git push -u origin main

# Check status
git status

# View commit history
git log

# View remote URLs
git remote -v
```

