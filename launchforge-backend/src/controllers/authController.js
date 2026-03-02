const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await pool.query(
      "INSERT INTO users (id, email, password) VALUES ($1,$2,$3)",
      [id, email, hashed]
    );

    res.json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (!user.rows.length)
      return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!valid)
      return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user.rows[0].id },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
};