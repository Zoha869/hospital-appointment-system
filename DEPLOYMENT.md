# Vercel Deployment Guide

## Hospital Appointment System - Full Stack Deployment

This guide covers deploying both the frontend and backend to Vercel.

---

## **Option 1: Deploy as Separate Projects (Recommended for Production)**

### **Backend Deployment**

1. Go to **https://vercel.com/new**
2. Import the **caresync-backend** folder from GitHub
3. Set **Root Directory** to `caresync-backend`
4. Add **Environment Variables**:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key
5. Click **Deploy**
6. Copy the deployment URL (e.g., `https://hospital-appointment-system-backend.vercel.app`)

### **Frontend Deployment**

1. Go to **https://vercel.com/new**
2. Import the **caresync-frontend** folder from GitHub
3. Set **Root Directory** to `caresync-frontend`
4. Add **Environment Variables**:
   - `VITE_API_BASE_URL`: Your backend URL from above (e.g., `https://hospital-appointment-system-backend.vercel.app/api`)
5. Click **Deploy**

---

## **Option 2: Deploy as Monorepo (Single Project)**

1. Go to **https://vercel.com/new**
2. Import the full project from **https://github.com/Zoha869/hospital-appointment-system.git**
3. **Build Settings**:
   - Framework: **Other** (custom)
   - Build Command: `npm install && npm run build --prefix caresync-frontend`
   - Output Directory: `caresync-frontend/dist`
   - Install Command: `npm install`
4. **Add Environment Variables** in Vercel Dashboard:
   - For backend: `MONGO_URI`, `JWT_SECRET`
   - For frontend: `VITE_API_BASE_URL`
5. Click **Deploy**

---

## **Verification Steps**

### **Test Backend Health Endpoint**
```bash
curl https://your-backend.vercel.app/
# Expected: {"status":"ok","message":"Hospital Appointment System Backend is running",...}
```

### **Test API Routes**
```bash
curl https://your-backend.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

### **Test Frontend**
Open your frontend URL in browser and verify:
- ✅ Pages load without errors
- ✅ Login/Signup forms work
- ✅ API calls connect to backend
- ✅ Mobile responsive design works

---

## **Troubleshooting**

### **Backend returns 500 error**
1. Check Vercel logs: Deployments → Latest → Logs
2. Verify environment variables are set correctly
3. Test MongoDB connection: check if `MONGO_URI` is accessible

### **Frontend can't connect to backend**
1. Verify `VITE_API_BASE_URL` is set in Vercel
2. Check CORS is enabled in backend (already configured)
3. Test API directly: `curl https://your-backend.vercel.app/api/auth/login`

### **Build fails**
1. Run locally: `npm install && npm run build` in respective folders
2. Check for TypeScript errors
3. Verify all imports are correct

---

## **Environment Variables Reference**

### **Backend (.env)**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospitalDB?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
PORT=3001 (Vercel manages this)
```

### **Frontend (.env)**
```
VITE_API_BASE_URL=https://your-backend.vercel.app/api
```

---

## **Quick Deployment Checklist**

- [ ] MongoDB Atlas setup complete
- [ ] JWT_SECRET created and secure
- [ ] Backend environment variables set in Vercel
- [ ] Frontend VITE_API_BASE_URL points to backend
- [ ] Backend health endpoint returns 200
- [ ] Frontend builds successfully
- [ ] All API routes tested
- [ ] Mobile responsiveness verified
- [ ] CORS configured (already done)
- [ ] Git commits pushed to GitHub

---

## **Support**

For issues, check:
- Vercel Deployments → Logs
- GitHub commit history
- Browser console for frontend errors
- Network tab for API calls
