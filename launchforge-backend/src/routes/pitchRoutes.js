const router = require("express").Router();
const { exportPitch } = require("../controllers/pitchController");
const auth = require("../middleware/authMiddleware");

router.post("/export", auth, exportPitch);

module.exports = router;