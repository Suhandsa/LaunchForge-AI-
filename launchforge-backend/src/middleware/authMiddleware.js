const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;
  console.log("🔐 Auth Check:", {
    path: req.path,
    authorization: token ? "✅ Present" : "❌ Missing",
    headers: Object.keys(req.headers)
  });

  if (!token)
    return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};