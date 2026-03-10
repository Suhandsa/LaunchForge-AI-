const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");

const authRoutes = require("./routes/authRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const chatRoutes = require("./routes/chatRoutes");
const pitchRoutes = require("./routes/pitchRoutes");
const teamRoutes = require("./routes/teamRoutes");

const app = express();

app.use(helmet());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(logger);

// rate limit all APIs (prefix with /api for consistency)
app.use("/api/auth", apiLimiter);
app.use("/api/idea", apiLimiter);
app.use("/api/chat", apiLimiter);
app.use("/api/pitch", apiLimiter);
app.use("/api/team", apiLimiter);

app.get("/", (req, res) => {
  res.send("🚀 LaunchGen Backend Running");
});

// Debug endpoint - no auth required
app.post("/api/debug/check-token", (req, res) => {
  res.json({
    received_headers: {
      authorization: req.headers.authorization ? "✅ Present" : "❌ Missing",
      all_headers: Object.keys(req.headers),
    },
    message: "Token check complete"
  });
});

// mount routers under /api
app.use("/api/auth", authRoutes);
app.use("/api/idea", ideaRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/pitch", pitchRoutes);
app.use("/api/team", teamRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

module.exports = app;