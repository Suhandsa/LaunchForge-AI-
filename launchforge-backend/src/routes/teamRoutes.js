const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createTeam,
  inviteMember,
  getTeam
} = require("../controllers/teamController");

router.post("/create", auth, createTeam);
router.post("/invite", auth, inviteMember);
router.get("/:id", auth, getTeam);

module.exports = router;