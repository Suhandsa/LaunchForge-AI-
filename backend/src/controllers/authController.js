const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existing = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await pool.query(
      "INSERT INTO users (id, email, password, name) VALUES ($1,$2,$3,$4)",
      [id, email, hashed, name || email.split("@")[0]]
    );

    const token = jwt.sign(
      { id },
      process.env.JWT_SECRET
    );

    res.json({ 
      token,
      user: {
        id,
        email,
        name: name || email.split("@")[0]
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT id, email, name FROM users WHERE email=$1",
      [email]
    );

    if (!user.rows.length)
      return res.status(400).json({ error: "User not found" });

    const userWithPassword = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    const valid = await bcrypt.compare(
      password,
      userWithPassword.rows[0].password
    );

    if (!valid)
      return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user.rows[0].id },
      process.env.JWT_SECRET
    );

    res.json({ 
      token,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        name: user.rows[0].name
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, email, name FROM users WHERE id=$1",
      [req.user.id]
    );

    if (!user.rows.length)
      return res.status(404).json({ error: "User not found" });

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
