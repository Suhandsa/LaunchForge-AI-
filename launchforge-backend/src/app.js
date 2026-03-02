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
app.use(cors());
app.use(express.json());
app.use(logger);

// rate limit all APIs
app.use("/auth", apiLimiter);
app.use("/idea", apiLimiter);
app.use("/chat", apiLimiter);
app.use("/pitch", apiLimiter);
app.use("/team", apiLimiter);

app.get("/", (req, res) => {
  res.send("🚀 LaunchForge Backend Running");
});

app.use("/auth", authRoutes);
app.use("/idea", ideaRoutes);
app.use("/chat", chatRoutes);
app.use("/pitch", pitchRoutes);
app.use("/team", teamRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

module.exports = app;