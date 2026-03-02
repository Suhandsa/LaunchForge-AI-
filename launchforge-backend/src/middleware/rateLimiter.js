const rateLimit = require("express-rate-limit");

// limit each IP to 100 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Try again later."
  }
});

// stricter limit for login
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try later."
  }
});

module.exports = { apiLimiter, loginLimiter };