# Fixed: "Cannot find module 'express'" Error

## Problem
Vercel serverless functions couldn't find Express and other backend dependencies because they were only in `backend/package.json`, which isn't accessible to the function at runtime.

## Solution Applied

### 1. Created `api/package.json`
Created a `package.json` file in the `api/` directory with all backend dependencies. This ensures Vercel installs them when building the serverless function.

### 2. Updated `vercel.json` Install Command
Updated the install command to install dependencies in the `api/` directory first:
```json
"installCommand": "cd api && npm install && cd ../backend && npm install && cd ../frontend && npm install"
```

## What Happens Now

1. Vercel detects `api/package.json` 
2. Installs all dependencies (express, mongoose, etc.) in the `api/` directory
3. The serverless function can now import these modules
4. Backend code is still included via `includeFiles: "backend/**"`

## Next Steps

1. **Commit and push** these changes:
   - `api/package.json` (new file)
   - `vercel.json` (updated install command)

2. **Redeploy** on Vercel:
   - Push to your Git repository (if connected)
   - OR manually redeploy from Vercel dashboard

3. **Verify** the fix:
   - Check Vercel function logs - should no longer see "Cannot find module 'express'"
   - Test login again
   - Visit `/api/health` to check MongoDB connection

## Expected Result

After redeployment:
- ✅ No more "Cannot find module" errors
- ✅ Backend API endpoints should work
- ✅ Login should work (if MONGO_URI and JWT_SECRET are set)

## Still Getting Errors?

If you still see errors after redeployment:

1. **Check Vercel Function Logs** - Look for new error messages
2. **Verify Environment Variables**:
   - `MONGO_URI` - MongoDB connection string
   - `JWT_SECRET` - JWT secret key
3. **Test Health Endpoint**: `https://ticketingsystem-dusky.vercel.app/api/health`

