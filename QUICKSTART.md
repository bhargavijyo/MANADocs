# Quick Start Guide

Get ManaDocs running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Git installed
- 2 terminal windows

## Step 1: Clone Repository (1 min)

```bash
git clone https://github.com/yourusername/MANA-Docs.git
cd MANA-Docs
```

## Step 2: Backend Setup (2 min)

```bash
# Terminal 1
cd server

# Install dependencies
npm install

# Start server
npm run dev
```

Expected output:
```
✅ ManaDocs Server running on port 5000
```

## Step 3: Frontend Setup (2 min)

```bash
# Terminal 2
cd client

# Install dependencies
npm install

# Start frontend
npm run dev
```

Expected output:
```
> Local:   http://localhost:3000
```

## Step 4: Open Browser

Visit `http://localhost:3000` and you're done! 🎉

## Try It Out

1. **Image to PDF**: Click "Image to PDF" → Upload images → Convert
2. **Merge PDFs**: Click "Merge PDF" → Upload 2+ PDFs → Merge
3. **Compress PDF**: Click "Compress PDF" → Upload PDF → Compress

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in `server/.env` |
| Port 3000 in use | React will prompt for alternative |
| CORS errors | Check both servers are running |
| Files not uploading | Create `server/uploads` directory |
| Module errors | Run `npm install` again in that folder |

## Next Steps

- Read [SETUP.md](./SETUP.md) for detailed setup
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the codebase

## Key Files to Know

- `server/server.js` - Express app entry point
- `client/src/App.jsx` - React app entry point
- `server/routes/*.js` - API endpoints
- `client/src/pages/*.jsx` - Feature pages
- `client/src/components/*.jsx` - Reusable components

## Development Tips

### Hot Reload
- Frontend: Auto-reloads on file changes
- Backend: Auto-restarts with nodemon

### Debug
- Frontend: Open DevTools (F12)
- Backend: Check terminal output

### API Testing
```bash
# Test backend health
curl http://localhost:5000/api/health

# Test server running
curl http://localhost:5000/api
```

## File Structure Quick Reference

```
MANA-Docs/
├── server/           ← Backend (Express)
│   ├── routes/       ← API endpoints
│   ├── controllers/  ← Business logic
│   └── uploads/      ← Temp files
├── client/           ← Frontend (React)
│   ├── src/
│   │   ├── pages/    ← Feature pages
│   │   ├── components/ ← UI components
│   │   └── utils/    ← Helpers
│   └── index.html    ← Entry HTML
└── docs/             ← Documentation
```

## Common Commands

### Backend
```bash
npm run dev      # Start with auto-reload
npm start        # Start production
npm test         # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## Environment Files

### Backend (.env)
```env
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Learn More

- [README.md](./README.md) - Complete documentation
- [SETUP.md](./SETUP.md) - Detailed setup guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to production
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design

---

**You're all set!** Start developing with ManaDocs! 🚀
