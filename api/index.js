import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ticketRoutes from "../backend/routes/ticketRoutes.js";
import cookieParser from "cookie-parser";
import commentRoutes from "../backend/routes/commentRoutes.js";
import authRoutes from "../backend/routes/authRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import { connectDB } from "../backend/connection.js";

dotenv.config();

const app = express();

// CORS middleware - Updated for Vercel
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://ticketingsystem-dusky.vercel.app",
  "https://myticketsystems.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all origins for now, can restrict later
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Middleware to ensure MongoDB connection before handling requests
app.use(async (req, res, next) => {
  // Skip for health check endpoint
  if (req.path === '/api/health' || req.path === '/') {
    return next();
  }
  
  try {
    // Ensure MongoDB connection is established
    await connectDB();
    next();
  } catch (error) {
    console.error("❌ Database connection failed in middleware:", error.message);
    res.status(500).json({ 
      message: "Database connection failed", 
      error: error.message 
    });
  }
});

// Root test route
app.get("/", (req, res) => {
  res.send("✅ Backend is live on Vercel 🚀");
});

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      mongodb: "unknown",
      env: {
        hasMongoUri: !!process.env.MONGO_URI,
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV
      }
    };
    
    // Test MongoDB connection
    try {
      await connectDB();
      health.mongodb = "connected";
    } catch (err) {
      health.mongodb = `error: ${err.message}`;
    }
    
    res.status(200).json(health);
  } catch (err) {
    res.status(500).json({ 
      status: "error", 
      message: err.message 
    });
  }
});

// API routes - Vercel forwards full path including /api prefix
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/comments", commentRoutes);

// Connect to MongoDB (connection is cached for serverless)
// Don't block the export, but log errors
connectDB().catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  console.error("Check MONGO_URI environment variable");
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ 
    message: "Internal server error", 
    error: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message 
  });
});

// Export the Express app as a serverless function for Vercel
export default app;

