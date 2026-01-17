# Deployment Guide for Smart Farm

## 1. Preparation (Already Done)
- Created `.gitignore`
- Configured Frontend to connect to Backend URL

## 2. Push to GitHub
1. Initialize Git in the root folder (`d:\smartest farmm`):
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   ```
2. Create a new repository on GitHub.
3. Push your code.

## 3. Deploy Backend (Render)
1. Dashboard -> New -> **Web Service**.
2. Connect your repo.
3. Settings:
   - **Root Directory**: `backend`
   - **Name**: `smart-farm-backend` (or similar)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   - Key: `MONGO_URI`
   - Value: (Your MongoDB Connection String)
5. Click **Create Web Service**.
6. **Copy the URL** (e.g., `https://smart-farm-backend.onrender.com`). You need this for the frontend!

## 4. Deploy Frontend (Render)
1. Dashboard -> New -> **Static Site**.
2. Connect your repo.
3. Settings:
   - **Root Directory**: `smart-farm-app`
   - **Name**: `smart-farm-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. **Environment Variables**:
   - Key: `REACT_APP_API_URL`
   - Value: (The Backend URL from Step 3 - **No trailing slash**)
5. **Redirects/Rewrites** (IMPORTANT):
   - Go to **Redirects/Rewrites** tab.
   - Add Rule:
     - **Source**: `/*`
     - **Destination**: `/index.html`
     - **Action**: `Rewrite`
   - Save changes.
6. Click **Create Static Site**.

## 5. Done!
Visit your Frontend URL. It should connect to your Backend and Database automatically!
