const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { loginLimiter } = require("../middleware/rateLimiter");

router.post("/register", register);
router.post("/login", loginLimiter, login);

module.exports = router;