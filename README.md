# 💖 Love Letter Website — Vercel Deployment Guide

## What's inside
```
/
├── index.html          ← Main page
├── css/style.css       ← Styles & animations
├── js/app.js           ← React app
├── api/
│   ├── photos.js       ← Serverless: lists your photos
│   └── music.js        ← Serverless: lists your music
├── photos/             ← Your photos go here
├── music/              ← Your music goes here
├── vercel.json         ← Vercel routing config
└── package.json        ← Project info
```

---

## 🚀 How to Deploy on Vercel

### Step 1 — Push to GitHub
1. Go to https://github.com and create a **new repository**
2. Open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to https://vercel.com and sign in (use GitHub login)
2. Click **"Add New Project"**
3. Select your GitHub repository
4. Leave all settings as default — click **"Deploy"**
5. ✅ Your site will be live at `https://your-project.vercel.app`

---

## 📸 Adding New Photos or Songs
Just add files to the `photos/` or `music/` folders, commit, and push to GitHub — Vercel will auto-redeploy!

```bash
git add photos/ music/
git commit -m "Add new photos and music"
git push
```
