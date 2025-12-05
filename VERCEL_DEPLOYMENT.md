# Vercel Deployment Guide

This project is configured to deploy both frontend and backend on Vercel.

## Prerequisites

1. MongoDB Atlas account (free tier available)
2. Vercel account (free tier available)
3. Cloudinary account (for image uploads - optional, if you use image uploads)

## Deployment Steps

### 1. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (MONGO_URI)
4. Make sure to whitelist all IPs (0.0.0.0/0) or add Vercel's IP ranges

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts and set environment variables
```

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: Leave as root (`.`)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd backend && npm install && cd ../frontend && npm install`
   - **Node.js Version**: Go to Settings → Build & Development → Node.js Version → Select `20.x`

**⚠️ IMPORTANT**: After importing, go to **Project Settings → Build & Development Settings** and explicitly set **Node.js Version** to `20.x`. This ensures Vercel uses Node.js 20.x for both build and serverless functions, matching the `engines` field in your `package.json` files.

### 3. Set Environment Variables in Vercel

Go to your project settings → Environment Variables and add:

#### Required Variables:

- `MONGO_URI` - Your MongoDB Atlas connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

- `JWT_SECRET` - Secret key for JWT token signing
  - Generate a random string (e.g., use `openssl rand -base64 32`)

- `FRONTEND_URL` - Your Vercel deployment URL
  - Example: `https://your-project.vercel.app`
  - This will be set automatically, but you can override it

#### Optional Variables (if using Cloudinary):

- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

### 4. Deploy

After setting environment variables, trigger a new deployment. Vercel will:
1. Install dependencies for both frontend and backend
2. Build the frontend React app
3. Set up the backend as serverless functions

### 5. Access Your Application

Once deployed, you'll get a URL like: `https://your-project.vercel.app`

- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-project.vercel.app/api`

## Project Structure

```
.
├── api/
│   └── index.js          # Vercel serverless function (backend entry point)
├── backend/              # Backend source code
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
├── frontend/             # Frontend React app
│   ├── src/
│   └── dist/            # Build output (generated)
├── vercel.json          # Vercel configuration
└── package.json         # Root package.json
```

## API Endpoints

All API endpoints are prefixed with `/api`:

- `/api/auth/login` - User login
- `/api/auth/logout` - User logout
- `/api/auth/create` - Create user (admin only)
- `/api/users` - Get all users (admin only)
- `/api/users/me` - Get current user
- `/api/tickets` - Ticket operations
- `/api/comments/:ticketId` - Comment operations

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs)
- Check that MONGO_URI is correctly set in Vercel environment variables
- Verify database user has proper permissions

### CORS Errors

- The backend is configured to accept requests from your Vercel domain
- Make sure `FRONTEND_URL` environment variable matches your deployment URL

### Build Failures

- Check that all dependencies are listed in `package.json`
- Ensure Node.js version is 20.x (specified in package.json)
- Review build logs in Vercel dashboard

### API Routes Not Working

- Verify that routes in `api/index.js` match the frontend API calls
- Check Vercel function logs for errors
- Ensure environment variables are set correctly

## Local Development

To run locally:

```bash
# Backend (from backend directory)
cd backend
npm install
npm run dev

# Frontend (from frontend directory)
cd frontend
npm install
npm run dev
```

For local development, set the `VITE_API_URL` environment variable:
```bash
# In frontend directory, create .env file:
VITE_API_URL=http://localhost:3000
```

Or the API will use empty string (relative paths) which works for both Vercel and local dev if backend runs on same port.

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Vercel function logs (for API errors)
3. Verify all environment variables are set
4. Ensure MongoDB Atlas is accessible

