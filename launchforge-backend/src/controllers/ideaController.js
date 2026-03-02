const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const ai = require("../services/aiService");

exports.generateIdea = async (req, res) => {
  try {
    const { idea } = req.body;
    const user_id = req.user.id;

    // check if user already has same idea
    const existing = await pool.query(
      "SELECT * FROM ideas WHERE idea_text=$1 AND user_id=$2",
      [idea, user_id]
    );

    let version = 1;
    let idea_id;

    if (existing.rows.length) {
      idea_id = existing.rows[0].id;

      const count = await pool.query(
        "SELECT COUNT(*) FROM idea_versions WHERE idea_id=$1",
        [idea_id]
      );

      version = parseInt(count.rows[0].count) + 1;
    } else {
      idea_id = uuidv4();

      await pool.query(
        "INSERT INTO ideas (id,user_id,idea_text,generated_plan) VALUES ($1,$2,$3,$4)",
        [idea_id, user_id, idea, {}]
      );
    }

    const plan = await ai.generatePlan(idea);

    await pool.query(
      "UPDATE ideas SET generated_plan=$1 WHERE id=$2",
      [plan, idea_id]
    );

    await pool.query(
      "INSERT INTO idea_versions (id,idea_id,version_number,idea_text,generated_plan) VALUES ($1,$2,$3,$4,$5)",
      [uuidv4(), idea_id, version, idea, plan]
    );

    res.json({
      idea_id,
      version,
      generated_plan: plan
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Idea generation failed" });
  }
};

exports.getIdeaById = async (req, res) => {
  try {
    const idea = await pool.query(
      "SELECT * FROM ideas WHERE id=$1 AND user_id=$2",
      [req.params.id, req.user.id]
    );

    if (!idea.rows.length)
      return res.status(404).json({ error: "Idea not found" });

    res.json(idea.rows[0]);
  } catch {
    res.status(500).json({ error: "Fetch failed" });
  }
};

exports.getIdeaHistory = async (req, res) => {
  try {
    const history = await pool.query(
      "SELECT version_number, created_at FROM idea_versions WHERE idea_id=$1 ORDER BY version_number",
      [req.params.id]
    );

    res.json(history.rows);
  } catch {
    res.status(500).json({ error: "History fetch failed" });
  }
};