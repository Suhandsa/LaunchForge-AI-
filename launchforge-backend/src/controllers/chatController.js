const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.chat = async (req, res) => {
  try {
    const { idea_id, message } = req.body;

    const response =
      "AI Co-Founder: Focus on getting first 50 users from your college.";

    await pool.query(
      "INSERT INTO chat_history (id, idea_id, message, response) VALUES ($1,$2,$3,$4)",
      [uuidv4(), idea_id, message, response]
    );

    res.json({ response });
  } catch {
    res.status(500).json({ error: "Chat failed" });
  }
};