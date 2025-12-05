# Quick Start - Deploy to Vercel

## 🚀 Your project is now ready for Vercel deployment!

### What was changed:

1. ✅ Created `api/index.js` - Backend serverless function for Vercel
2. ✅ Created `vercel.json` - Vercel configuration file
3. ✅ Updated frontend API configuration to work with Vercel
4. ✅ Updated MongoDB connection for serverless environment
5. ✅ Updated CORS configuration for Vercel

### 📋 Deployment Checklist:

#### Step 1: Prepare MongoDB Atlas
- [ ] Create MongoDB Atlas account (free tier)
- [ ] Create a cluster
- [ ] Get connection string (MONGO_URI)
- [ ] Whitelist IP: `0.0.0.0/0` (allow all IPs)

#### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - Framework: **Other**
   - Root Directory: **.** (root)
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `cd backend && npm install && cd ../frontend && npm install`

**Option B: Via Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel
```

#### Step 3: Configure Node.js Version in Vercel ⚠️ IMPORTANT

**CRITICAL**: After importing your project, you MUST explicitly set the Node.js version:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Build & Development Settings**
3. Under **Node.js Version**, select **20.x** from the dropdown
4. Save the settings

This ensures Vercel uses Node.js 20.x for both:
- Build process (installing dependencies, building frontend)
- Serverless functions (your backend API)

**Why this matters**: While `package.json` files specify `engines: "20.x"`, explicitly setting it in Vercel dashboard ensures consistency and prevents version mismatches if Vercel updates defaults.

#### Step 4: Set Environment Variables in Vercel

Go to Project Settings → Environment Variables and add:

**Required:**
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Random secret key (generate with: `openssl rand -base64 32`)
- `FRONTEND_URL` - Your Vercel URL (will be auto-set, but you can override)

**Optional (if using Cloudinary):**
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

#### Step 5: Deploy!

Click "Deploy" and wait for the build to complete.

### 🎯 Your Final URL

After deployment, you'll get:
- **Frontend & Backend**: `https://your-project.vercel.app`
- **API Endpoints**: `https://your-project.vercel.app/api/*`

### ✅ Test Your Deployment

1. Visit your Vercel URL
2. Test login functionality
3. Check browser console for any errors
4. Check Vercel function logs if API calls fail

### 🐛 Troubleshooting

**If API calls fail:**
- Check Vercel function logs (Project → Functions → api/index.js)
- Verify environment variables are set
- Check MongoDB Atlas connection

**If build fails:**
- Check build logs in Vercel dashboard
- Ensure Node.js version is 20.x
- Verify all dependencies are in package.json

**If CORS errors:**
- Verify `FRONTEND_URL` matches your Vercel deployment URL
- Check CORS configuration in `api/index.js`

### 📚 More Details

See `VERCEL_DEPLOYMENT.md` for detailed documentation.

---

**Need help?** Check the Vercel deployment logs and function logs for detailed error messages.

