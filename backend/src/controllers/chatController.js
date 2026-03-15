const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const ai = require("../services/aiService");

exports.chat = async (req, res) => {
  try {
    const { idea_id, message } = req.body;
    console.log("📨 Chat request received:", { idea_id, message: message.substring(0, 30) + "..." });

    // Verify idea exists and belongs to user
    const idea = await pool.query(
      "SELECT * FROM ideas WHERE id=$1 AND user_id=$2",
      [idea_id, req.user.id]
    );

    if (!idea.rows.length) {
      console.log("❌ Idea not found:", idea_id);
      return res.status(404).json({ error: "Idea not found" });
    }

    // Generate AI response with context of the startup idea
    const ideaPlan = idea.rows[0].generated_plan;
    console.log("📋 Idea plan retrieved:", { problem: ideaPlan?.problem?.substring(0, 30) });
    
    const response = await ai.chatWithCofounder(ideaPlan, message);
    console.log("✅ AI response generated successfully");

    // Store in database
    const chatId = uuidv4();
    await pool.query(
      "INSERT INTO chat_history (id, idea_id, user_id, message, response) VALUES ($1,$2,$3,$4,$5)",
      [chatId, idea_id, req.user.id, message, response]
    );

    console.log("💾 Chat saved to database:", chatId);
    res.json({ 
      id: chatId,
      message,
      response 
    });
  } catch (err) {
    console.error("❌ Chat endpoint error:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ error: "Chat failed" });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { idea_id } = req.params;

    // Verify idea belongs to user
    const idea = await pool.query(
      "SELECT * FROM ideas WHERE id=$1 AND user_id=$2",
      [idea_id, req.user.id]
    );

    if (!idea.rows.length)
      return res.status(404).json({ error: "Idea not found" });

    const history = await pool.query(
      "SELECT id, message, response, created_at FROM chat_history WHERE idea_id=$1 ORDER BY created_at ASC",
      [idea_id]
    );

    res.json(history.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

exports.clearChatHistory = async (req, res) => {
  try {
    const { idea_id } = req.params;

    // Verify idea belongs to user
    const idea = await pool.query(
      "SELECT * FROM ideas WHERE id=$1 AND user_id=$2",
      [idea_id, req.user.id]
    );

    if (!idea.rows.length)
      return res.status(404).json({ error: "Idea not found" });

    await pool.query(
      "DELETE FROM chat_history WHERE idea_id=$1",
      [idea_id]
    );

    res.json({ message: "Chat history cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clear chat history" });
  }
};

// Helper function to generate AI responses
async function generateChatResponse(context) {
  if (process.env.AI_MODE === "mock") {
    return "AI Co-Founder: Based on your idea, I recommend focusing on user validation first. Get feedback from your target users before investing heavily in development. Start with a simple MVP and iterate based on real user feedback.";
  }

  try {
    const response = await ai.generatePlan(context);
    return response.reply || response;
  } catch (err) {
    console.error("AI Error:", err);
    return "AI Co-Founder: I'm currently experiencing technical difficulties. Please try again in a moment.";
  }
}
