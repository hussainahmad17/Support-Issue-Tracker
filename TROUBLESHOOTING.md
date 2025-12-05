# Troubleshooting 500 Errors

## Common Causes of 500 Internal Server Error

### 1. MongoDB Connection Issues (Most Common)

**Symptoms:**
- 500 error on all API endpoints
- Login fails with 500 error
- `/api/users/me` returns 500

**Check:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify `MONGO_URI` is set correctly
3. Format should be: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

**Fix:**
- Ensure MongoDB Atlas cluster is running
- Check IP whitelist in MongoDB Atlas (should include `0.0.0.0/0` for all IPs)
- Verify database user has correct permissions
- Test connection string locally if possible

### 2. Missing Environment Variables

**Required Variables:**
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing

**Check in Vercel:**
1. Settings → Environment Variables
2. Ensure both are set for **Production** environment
3. Redeploy after adding variables

### 3. Check Vercel Function Logs

**Steps:**
1. Go to Vercel Dashboard → Your Project
2. Click on **Functions** tab
3. Click on `api/index.js`
4. Check the **Logs** tab
5. Look for error messages (red text)

**Common Log Errors:**
- `MongoDB connection failed` → Check MONGO_URI
- `JWT_SECRET is not defined` → Add JWT_SECRET env var
- `Cannot find module` → Check includeFiles in vercel.json

### 4. Test Backend Health

Try accessing: `https://ticketingsystem-dusky.vercel.app/api/`

Should return: `✅ Backend is live on Vercel 🚀`

If this fails, the serverless function isn't working.

### 5. Database Connection in Serverless

**Issue:** Serverless functions are stateless and may need to reconnect.

**Solution:** Already implemented with connection caching in `backend/connection.js`

### 6. Check Network Tab in Browser

1. Open DevTools (F12)
2. Go to Network tab
3. Try to login
4. Click on the failed request (`/api/auth/login`)
5. Check:
   - **Status**: Should be 500
   - **Response**: Click "Response" tab to see error message
   - **Headers**: Check if CORS headers are present

## Quick Debug Steps

1. ✅ Check Vercel Function Logs (most important!)
2. ✅ Verify MONGO_URI is set correctly
3. ✅ Verify JWT_SECRET is set
4. ✅ Test `/api/` endpoint
5. ✅ Check MongoDB Atlas cluster status
6. ✅ Verify IP whitelist in MongoDB Atlas

## Getting Detailed Error Messages

The backend now logs errors to Vercel function logs. Check:
- Vercel Dashboard → Project → Functions → api/index.js → Logs

Look for:
- `❌ MongoDB connection error:` - Database connection issue
- `❌ Server error:` - General server error with details

## Still Having Issues?

1. Copy the exact error from Vercel function logs
2. Check the Response tab in browser Network tab
3. Verify all environment variables are set
4. Try redeploying after fixing environment variables

