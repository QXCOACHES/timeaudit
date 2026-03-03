# QX Time Audit — Deployment Instructions

## What's in this project
A React app (built with Vite) for the Get Skooled 168 Hour Time Audit.

---

## Step 1 — Create a GitHub Account (if you don't have one)
Go to github.com and sign up. Free account is all you need.

---

## Step 2 — Create a New Repository
1. Click the **+** icon in the top right corner of GitHub
2. Select **New repository**
3. Name it: `qx-time-audit`
4. Leave it set to **Public**
5. Do NOT check "Add a README file"
6. Click **Create repository**

---

## Step 3 — Upload the Files
On the next screen you'll see your empty repo.

1. Click **uploading an existing file** (the link in the middle of the page)
2. Drag and drop ALL the files from this folder into the upload area:
   - `index.html`
   - `package.json`
   - `vite.config.js`
   - The entire `src` folder (contains `main.jsx` and `App.jsx`)
3. Scroll down and click **Commit changes**

---

## Step 4 — Deploy on Vercel
1. Go to **vercel.com** and sign up with your GitHub account
2. Click **Add New Project**
3. Find `qx-time-audit` in your repository list and click **Import**
4. Vercel will auto-detect it as a Vite project — don't change any settings
5. Click **Deploy**
6. In about 60 seconds you'll get a live URL like: `qx-time-audit.vercel.app`

---

## Step 5 — Embed in Notion
1. Copy your Vercel URL
2. In your Notion doc, type `/embed`
3. Paste the URL
4. Hit Enter — the audit will render inline inside your Notion page

---

## Updating the App Later
When you want to make changes:
1. Edit `src/App.jsx` locally
2. Go back to your GitHub repo
3. Navigate to `src/App.jsx`
4. Click the pencil (edit) icon
5. Paste the updated code
6. Click **Commit changes**
7. Vercel will automatically redeploy within 60 seconds

---

That's it. Any questions, bring them back to Claude.
