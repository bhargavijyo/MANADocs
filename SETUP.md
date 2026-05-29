# ManaDocs Setup Guide

Complete step-by-step setup instructions for development and production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Development Setup](#development-setup)
3. [Production Setup](#production-setup)
4. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- Node.js >= 18.0.0 (Download from [nodejs.org](https://nodejs.org))
- npm >= 9.0.0 or yarn >= 3.0.0
- Git (for version control)
- 2GB RAM minimum
- 500MB disk space

### Verify Installation
```bash
node --version     # Should show v18.0.0 or higher
npm --version      # Should show 9.0.0 or higher
git --version      # Should show your Git version
```

## Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/MANA-Docs.git
cd MANA-Docs
```

### Step 2: Backend Setup

#### 2.1 Navigate to server directory
```bash
cd server
```

#### 2.2 Install dependencies
```bash
npm install
```

This will install:
- Express.js - Web framework
- pdf-lib - PDF manipulation
- sharp - Image processing
- multer - File uploads
- cors - Cross-origin resource sharing
- dotenv - Environment configuration
- And other dependencies

#### 2.3 Create environment file
```bash
# Copy example .env file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

Default development configuration:
```env
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=52428800
UPLOAD_DIR=./uploads
CLEANUP_INTERVAL=86400000
PDF_COMPRESSION_QUALITY=0.75
CORS_ORIGIN=http://localhost:3000
```

#### 2.4 Create uploads directory
```bash
mkdir -p uploads
```

#### 2.5 Start the backend server
```bash
npm run dev
```

You should see:
```
✅ ManaDocs Server running on port 5000
Environment: development
CORS Origin: http://localhost:3000
```

The backend is now running at `http://localhost:5000`

### Step 3: Frontend Setup

#### 3.1 Open a new terminal and navigate to client directory
```bash
cd client
```

#### 3.2 Install dependencies
```bash
npm install
```

This will install:
- React - UI library
- React Router - Navigation
- Tailwind CSS - Styling
- Framer Motion - Animations
- axios - HTTP client
- And other dependencies

#### 3.3 Create environment file
```bash
# Copy example .env file
cp .env.example .env

# Edit if needed
nano .env
```

Default development configuration:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

#### 3.4 Start the frontend
```bash
npm run dev
```

You should see:
```
> Local:   http://localhost:3000
> press q + enter to quit
```

The frontend is now running at `http://localhost:3000`

### Step 4: Verify Installation

1. Open browser and go to `http://localhost:3000`
2. You should see the ManaDocs homepage
3. Try uploading a file - it should work seamlessly

## Production Setup

### Backend Deployment to Render

#### Step 1: Prepare your code
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

#### Step 2: Create Render account
- Go to [render.com](https://render.com)
- Sign up with GitHub
- Connect your repository

#### Step 3: Create Web Service
1. New → Web Service
2. Connect your GitHub repo
3. Select the `server` directory
4. Set Runtime to Node
5. Set Build Command: `npm install`
6. Set Start Command: `npm start`

#### Step 4: Configure environment
Add these in Environment section:
```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-frontend.vercel.app
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800
CLEANUP_INTERVAL=86400000
CORS_ORIGIN=https://your-frontend.vercel.app
```

#### Step 5: Deploy
Click Deploy - Render will automatically deploy your code

### Frontend Deployment to Vercel

#### Step 1: Prepare code
```bash
npm run build
```

#### Step 2: Create Vercel account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub

#### Step 3: Import project
1. Import → Select your GitHub repo
2. Select `client` directory as root
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`

#### Step 4: Set environment variables
Add in Environment Variables:
```
REACT_APP_API_URL=https://your-backend.render.app/api
REACT_APP_ENV=production
```

#### Step 5: Deploy
Click Deploy - Vercel will build and deploy automatically

## Docker Setup (Optional)

### Backend Dockerfile

Create `server/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t manadocs-server .
docker run -p 5000:5000 manadocs-server
```

### Frontend Dockerfile

Create `client/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t manadocs-client .
docker run -p 80:80 manadocs-client
```

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

**For Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**For Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

Or change the port in `.env`

### CORS Errors

If you get CORS errors:
1. Check CORS_ORIGIN in server/.env
2. Ensure it matches your frontend URL
3. Restart the server

### Module Not Found

If you see "module not found" errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues

Check that both servers are running:
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
cd client && npm run dev
```

### File Upload Issues

Check:
1. Uploads directory exists: `mkdir -p server/uploads`
2. Directory has write permissions
3. File size is under 50MB

### Build Errors

```bash
# Clean build
npm run build

# Or clear cache
npm cache clean --force
npm install
npm run build
```

## Database Setup (Optional)

For future enhancements with user accounts:

### MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Create `.env` entry:
```env
MONGODB_URI=mongodb://localhost:27017/manadocs
```

3. Install package:
```bash
npm install mongoose
```

## SSL/HTTPS Setup (Production)

### Self-signed certificate (Development)
```bash
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

### Use Let's Encrypt (Production)
- Render and Vercel provide free SSL automatically
- No additional setup needed

## Performance Optimization

### Frontend
- Enable gzip compression
- Minify CSS/JS
- Lazy load images
- Use Lighthouse to audit

### Backend
- Enable caching
- Use connection pooling
- Monitor memory usage
- Set up logging

## Monitoring

### Backend Logs
```bash
# Development
npm run dev 2>&1 | tee server.log

# Production
pm2 logs manadocs-server
```

### Frontend Errors
- Check browser console (F12)
- Use React DevTools
- Monitor network requests

## Updates and Maintenance

### Update Dependencies
```bash
npm outdated        # Check outdated packages
npm update          # Update all packages
npm audit fix       # Fix security vulnerabilities
```

### Backup
```bash
# Backup uploads
cp -r server/uploads server/uploads.backup

# Git backup
git push origin main
```

## Getting Help

- Check `/docs/` folder for detailed documentation
- Review GitHub issues
- Email support@manadocs.app

---

**Setup Complete!** 🎉

Your ManaDocs application is now running locally and ready for development.
