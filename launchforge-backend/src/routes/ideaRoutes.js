const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  generateIdea,
  getIdeaById,
  getIdeaHistory
} = require("../controllers/ideaController");

router.post("/generate", auth, generateIdea);
router.get("/:id", auth, getIdeaById);
router.get("/:id/history", auth, getIdeaHistory);

module.exports = router;