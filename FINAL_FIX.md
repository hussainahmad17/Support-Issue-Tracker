# Final Fix Guide - 500 Error on Login

## Current Status
✅ `/api/users/me` returns 401 (working correctly - needs auth)  
❌ `/api/auth/login` returns 500 (backend error)

## Step 1: Check Health Endpoint

Visit this URL in your browser:
```
https://ticketingsystem-dusky.vercel.app/api/health
```

This will show you:
- MongoDB connection status
- Whether MONGO_URI is set
- Whether JWT_SECRET is set

**Expected Response:**
```json
{
  "status": "ok",
  "mongodb": "connected",
  "env": {
    "hasMongoUri": true,
    "hasJwtSecret": true,
    "nodeEnv": "production"
  }
}
```

## Step 2: Verify Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. **Verify these are set for PRODUCTION:**
   - ✅ `MONGO_URI` - Your MongoDB connection string
   - ✅ `JWT_SECRET` - Random secret string
   - ✅ `NODE_ENV` - Should be `production` (optional, auto-set)

3. **Important:** After adding/changing variables, you MUST redeploy!

## Step 3: Verify api/package.json is Deployed

1. Check if `api/package.json` exists in your repository
2. Make sure you've committed and pushed it
3. Check Vercel deployment logs to see if it installed dependencies

## Step 4: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → Functions → api/index.js → Logs
2. Try to login again
3. Look for the **exact error message** in the logs

**Common errors you might see:**
- `MongoDB connection failed` → Check MONGO_URI
- `JWT_SECRET is not defined` → Add JWT_SECRET
- `Cannot find module` → api/package.json not deployed

## Step 5: Test MongoDB Connection

Your MongoDB Atlas connection string should be:
```
mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

**Check in MongoDB Atlas:**
1. Network Access → IP Access List → Should include `0.0.0.0/0`
2. Database Access → User should have read/write permissions
3. Cluster should be running (not paused)

## Step 6: Redeploy After Changes

After setting/changing environment variables:
1. Go to Deployments tab
2. Click the three dots (⋯) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete
5. Test again

## Quick Checklist

- [ ] `api/package.json` exists and is committed
- [ ] `MONGO_URI` is set in Vercel (Production environment)
- [ ] `JWT_SECRET` is set in Vercel (Production environment)
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] Redeployed after setting environment variables
- [ ] Checked `/api/health` endpoint
- [ ] Checked Vercel function logs for exact error

## What to Share

If still having issues, share:
1. Response from `/api/health` endpoint
2. Exact error from Vercel function logs
3. Screenshot of Environment Variables in Vercel (hide sensitive values)

