# Deployment Guide for MERN AI Chat App

## Quick Start for Local Development

```bash
# Terminal 1: Start Backend
cd backend
npm install
npm start

# Terminal 2: Start Frontend
cd frontend
npm install
npm start
```

The app will be available at http://localhost:3000

---

## Deploy Backend to Render

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: MERN AI Chat App"
git push origin main
```

### Step 2: Create Render Service
1. Go to https://render.com
2. Create a new account and log in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Fill in the configuration:
   - **Name:** mern-ai-chat-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`

### Step 3: Add Environment Variables
In the Render service settings, add:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-ai-app
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxx
PORT=5000
```

### Step 4: Deploy
Click "Deploy" and wait for completion. Your backend URL will be something like:
```
https://mern-ai-chat-backend.onrender.com
```

---

## Deploy Frontend to Vercel

### Step 1: Prepare Frontend
Update `frontend/package.json` to remove the proxy line if deploying separately:

```json
{
  "proxy": "https://your-backend-url.onrender.com"
}
```

Or update API calls in `frontend/src/App.js` to use environment variable:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Log in with GitHub
3. Click "Add New Project"
4. Select your repository
5. Configure:
   - **Framework Preset:** React
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

### Step 3: Add Environment Variables
In Vercel dashboard, go to Settings → Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### Step 4: Deploy
Click "Deploy". Your frontend URL will be something like:
```
https://mern-ai-chat.vercel.app
```

---

## Deploy Backend to Heroku (Alternative)

### Step 1: Create Heroku App
```bash
npm install -g heroku
heroku login
heroku create mern-ai-chat-backend
```

### Step 2: Add Environment Variables
```bash
heroku config:set MONGO_URI=mongodb+srv://...
heroku config:set OPENROUTER_API_KEY=sk-or-...
```

### Step 3: Deploy
```bash
git push heroku main
```

---

## Deploy Backend to Railway (Alternative)

1. Go to https://railway.app
2. Create a new project
3. Connect GitHub repository
4. Select the `backend` directory
5. Add environment variables:
   - MONGO_URI
   - OPENROUTER_API_KEY
6. Deploy

---

## MongoDB Atlas Setup (Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env` and Render/Heroku variables with:
```
mongodb+srv://username:password@cluster.mongodb.net/mern-ai-app
```

---

## Testing Production URLs

After deployment, test your APIs:

```bash
# Get health status
curl https://your-backend.onrender.com/api/health

# Send a prompt
curl -X POST https://your-backend.onrender.com/api/ask-ai \
  -H "Content-Type: application/json" \
  -d '{"prompt":"What is 2+2?"}'

# Get conversations
curl https://your-backend.onrender.com/api/conversations
```

---

## Troubleshooting

### Backend won't start
- Check environment variables are set
- Verify MongoDB connection string
- Check OpenRouter API key is valid

### Frontend can't connect to backend
- Update CORS settings if needed
- Check backend URL in proxy or environment variables
- Verify network connectivity

### MongoDB connection fails
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Ensure credentials are correct

---

## Video Demo Checklist

For your submission video:
- [ ] Type a message in the app
- [ ] Click "Run Flow" to get AI response
- [ ] Show the response appears
- [ ] Click "Save" to save to database
- [ ] Show the conversation in MongoDB
- [ ] Click "History" to view saved conversations
- [ ] Show deployment URLs working

---

## Need Help?

- OpenRouter Docs: https://openrouter.ai/docs
- React Flow Docs: https://reactflow.dev/
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs