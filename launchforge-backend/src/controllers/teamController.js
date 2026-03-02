const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.createTeam = async (req, res) => {
  try {
    const { team_name } = req.body;
    const owner_id = req.user.id;

    const team_id = uuidv4();

    await pool.query(
      "INSERT INTO teams (id, team_name, owner_id) VALUES ($1,$2,$3)",
      [team_id, team_name, owner_id]
    );

    await pool.query(
      "INSERT INTO team_members (id, team_id, user_id, role) VALUES ($1,$2,$3,$4)",
      [uuidv4(), team_id, owner_id, "owner"]
    );

    res.json({ message: "Team created", team_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Team creation failed" });
  }
};

exports.inviteMember = async (req, res) => {
  try {
    const { team_id, user_email } = req.body;

    const user = await pool.query(
      "SELECT id FROM users WHERE email=$1",
      [user_email]
    );

    if (!user.rows.length)
      return res.status(404).json({ error: "User not found" });

    await pool.query(
      "INSERT INTO team_members (id, team_id, user_id, role) VALUES ($1,$2,$3,$4)",
      [uuidv4(), team_id, user.rows[0].id, "member"]
    );

    res.json({ message: "Member invited" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Invite failed" });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const team = await pool.query(
      `SELECT t.team_name, u.email, tm.role
       FROM teams t
       JOIN team_members tm ON t.id = tm.team_id
       JOIN users u ON tm.user_id = u.id
       WHERE t.id=$1`,
      [req.params.id]
    );

    res.json(team.rows);
  } catch {
    res.status(500).json({ error: "Fetch failed" });
  }
};