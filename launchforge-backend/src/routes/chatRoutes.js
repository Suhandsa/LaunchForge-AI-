const router = require("express").Router();
const { chat, getChatHistory, clearChatHistory } = require("../controllers/chatController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, chat);
router.get("/:idea_id", auth, getChatHistory);
router.delete("/:idea_id", auth, clearChatHistory);

module.exports = router;