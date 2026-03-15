const router = require("express").Router();
const { register, login, getCurrentUser } = require("../controllers/authController");
const { loginLimiter } = require("../middleware/rateLimiter");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/me", auth, getCurrentUser);

module.exports = router;