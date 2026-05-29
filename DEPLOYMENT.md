# ManaDocs Deployment Guide

Complete instructions for deploying ManaDocs to production on Vercel (Frontend) and Render/Railway (Backend).

## Table of Contents
1. [Frontend Deployment](#frontend-deployment-vercel)
2. [Backend Deployment](#backend-deployment-render)
3. [Environment Configuration](#environment-configuration)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Monitoring & Maintenance](#monitoring--maintenance)

## Frontend Deployment (Vercel)

### Step 1: Prepare Code

```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "GitHub"
4. Authorize Vercel to access your GitHub repositories

### Step 3: Import Project

1. Click "New Project"
2. Select your `MANA-Docs` repository
3. Click "Import"
4. Select `client` as the root directory
5. Click "Continue"

### Step 4: Configure Build Settings

The default settings should work:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment**: Node.js

### Step 5: Set Environment Variables

1. Go to "Environment Variables"
2. Add the following:

```
REACT_APP_API_URL=https://your-backend-url.render.app/api
REACT_APP_ENV=production
```

Replace `your-backend-url` with your actual Render backend URL

### Step 6: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-5 minutes)
3. You'll get a deployment URL like `https://manadocs.vercel.app`

### Step 7: Verify Deployment

1. Visit your Vercel URL
2. Test file upload functionality
3. Check browser console for errors

---

## Backend Deployment (Render)

### Step 1: Prepare Code

```bash
cd server
git add .
git commit -m "Ready for Render deployment"
git push origin main
cd ..
```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Sign Up"
3. Choose "GitHub"
4. Authorize Render to access your repository

### Step 3: Create Web Service

1. Click "New" → "Web Service"
2. Select your GitHub repository
3. Choose `MANA-Docs`
4. Click "Connect"

### Step 4: Configure Service

Fill in the following:

| Field | Value |
|-------|-------|
| **Name** | manadocs-server |
| **Runtime** | Node |
| **Root Directory** | server |
| **Build Command** | npm install |
| **Start Command** | npm start |
| **Plan** | Free (or paid for more resources) |

### Step 5: Set Environment Variables

Click "Environment" and add:

```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://manadocs.vercel.app
MAX_FILE_SIZE=52428800
UPLOAD_DIR=/tmp/uploads
CLEANUP_INTERVAL=86400000
PDF_COMPRESSION_QUALITY=0.75
CORS_ORIGIN=https://manadocs.vercel.app
```

### Step 6: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. You'll get a backend URL like `https://manadocs-server.render.app`

### Step 7: Update Frontend URL

Now that you have your backend URL:

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Update `REACT_APP_API_URL` with your Render URL:
   ```
   REACT_APP_API_URL=https://manadocs-server.render.app/api
   ```
5. Redeploy (click "Deployments" → "Redeploy" on latest)

---

## Alternative: Backend Deployment (Railway)

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway

### Step 2: Create New Project

1. Click "New Project"
2. Select "GitHub Repo"
3. Select your `MANA-Docs` repository

### Step 3: Add Service

1. Click "Add Service"
2. Choose "GitHub Repo"
3. The `server` directory should be detected automatically

### Step 4: Configure Environment Variables

In Project Settings, add:

```env
NODE_ENV=production
PORT=$PORT
FRONTEND_URL=https://manadocs.vercel.app
MAX_FILE_SIZE=52428800
UPLOAD_DIR=/tmp/uploads
CLEANUP_INTERVAL=86400000
PDF_COMPRESSION_QUALITY=0.75
CORS_ORIGIN=https://manadocs.vercel.app
```

### Step 5: Deploy

Railway automatically deploys when you push to main

---

## Environment Configuration

### Production Environment Variables

#### Backend (server/.env)

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# Frontend URL
FRONTEND_URL=https://your-frontend.com

# File Upload
MAX_FILE_SIZE=52428800        # 50MB
UPLOAD_DIR=/tmp/uploads
CLEANUP_INTERVAL=86400000     # 24 hours

# PDF Processing
PDF_COMPRESSION_QUALITY=0.75

# CORS
CORS_ORIGIN=https://your-frontend.com
```

#### Frontend (client/.env.production)

```env
REACT_APP_API_URL=https://your-backend.render.app/api
REACT_APP_ENV=production
```

### Environment Variables Reference

| Variable | Backend | Frontend | Default | Notes |
|----------|---------|----------|---------|-------|
| NODE_ENV | ✓ | | production | Affects logging and caching |
| PORT | ✓ | | 5000 | Backend port |
| REACT_APP_API_URL | | ✓ | | Must include /api suffix |
| FRONTEND_URL | ✓ | | | Used for CORS |
| MAX_FILE_SIZE | ✓ | | 52428800 | In bytes (50MB) |
| UPLOAD_DIR | ✓ | | ./uploads | Temporary file location |
| CLEANUP_INTERVAL | ✓ | | 86400000 | In milliseconds (24h) |
| CORS_ORIGIN | ✓ | | | Must match frontend URL |

---

## Custom Domain Setup

### Connect Custom Domain to Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Domains
4. Enter your domain (e.g., `manadocs.com`)
5. Follow DNS configuration instructions
6. DNS records typically:
   ```
   Type: ALIAS
   Name: @
   Value: cname.vercel.app
   ```

### Connect Custom Domain to Render

1. Go to Render Dashboard
2. Select your service
3. Settings → Custom Domains
4. Enter your domain
5. Add DNS records provided by Render
6. DNS records typically:
   ```
   Type: CNAME
   Name: api
   Value: [render-domain]
   ```

### SSL Certificate

Both Vercel and Render provide free SSL/HTTPS automatically.
No manual setup required!

---

## Monitoring & Maintenance

### View Logs

#### Vercel
1. Dashboard → Select Project
2. Deployments → Select Deployment
3. Logs tab

#### Render
1. Dashboard → Select Service
2. "Logs" tab shows real-time logs

### Performance Monitoring

#### Frontend (Vercel)
- Use Vercel Analytics
- Check Web Vitals
- Monitor deployment times

#### Backend (Render)
- Check CPU/Memory usage
- Monitor response times
- Set up error alerts

### Set Up Alerts

#### Render Error Notifications
1. Settings → Notifications
2. Enable Email/Slack notifications
3. Choose alert conditions

#### Vercel Performance Alerts
1. Settings → Monitoring
2. Enable alerts
3. Set thresholds

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Fix security vulnerabilities
npm audit fix
```

### Rollback Deployment

#### Vercel
1. Deployments tab
2. Click previous deployment
3. Select "Redeploy"

#### Render
1. Manual redeploy:
   ```bash
   git push origin main  # Triggers auto-deploy
   ```
2. Or redeploy from dashboard

---

## Database Setup (Future Enhancement)

### MongoDB Atlas (Cloud Database)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up and create cluster
3. Get connection string
4. Add to backend environment:
   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/manadocs
   ```

---

## Troubleshooting Deployment

### Build Fails on Vercel

```bash
# Check build output
# Solution 1: Clear build cache
# In Vercel dashboard: Settings → Git → Force override build cache

# Solution 2: Check for type errors
npm run build

# Solution 3: Update dependencies
npm install
npm run build
```

### Build Fails on Render

```bash
# Check for port conflicts
# Render provides PORT via environment
# Ensure you use: process.env.PORT

# Check Node version
node --version  # Should be 18+

# Check disk space
df -h
```

### API Connection Issues

1. Verify CORS_ORIGIN matches frontend URL
2. Check API URL in frontend environment variables
3. Test API directly:
   ```bash
   curl https://your-backend.render.app/api/health
   ```

### File Upload Issues

1. Check UPLOAD_DIR permissions
2. For Render: Use `/tmp/uploads` (Railway: same)
3. Verify MAX_FILE_SIZE in environment

### Memory Issues

- Upgrade Render plan
- Implement caching
- Optimize file processing
- Clean up old uploads

---

## Performance Tips

### Reduce Build Time
- Remove unnecessary dependencies
- Use `.vercelignore` and `.railwayignore`
- Cache dependencies

### Improve Runtime
- Enable gzip compression
- Minify assets
- Use CDN for static files
- Implement caching headers

### Monitor Costs
- Render free tier: 750 hours/month
- Vercel free tier: unlimited deployments
- Monitor bandwidth usage

---

## Backup & Recovery

### Backup Your Data

```bash
# Backup uploads directory
tar -czf uploads.backup.tar.gz server/uploads/

# Backup database (if using)
mongodump --uri "mongodb+srv://..." --out backup/
```

### Recovery Steps

1. Restore files to uploads directory
2. Update database if applicable
3. Redeploy application
4. Verify functionality

---

## Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] All features work (upload, convert, merge, compress)
- [ ] API endpoints respond properly
- [ ] File downloads work
- [ ] Mobile responsiveness verified
- [ ] Error handling works
- [ ] Language switching works
- [ ] CORS errors resolved
- [ ] Performance acceptable
- [ ] Database backup configured
- [ ] Monitoring enabled
- [ ] SSL/HTTPS working
- [ ] Custom domain configured (if applicable)

---

## Getting Help

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **GitHub Discussions**: Open an issue in your repository

---

**Deployment Complete!** 🚀

Your ManaDocs application is now live and accessible to the world!
