require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sql } = require("./db"); // ✅ use the sql from db.js (already connected)

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
let blacklistedTokens = new Set();

// ✅ Middleware to verify token and check blacklist
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "Token is blacklisted. Please log in again." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

// ✅ Register new user
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql.query`
      INSERT INTO Users (name, password_hash, role)
      VALUES (${username}, ${hashedPassword}, ${role})
    `;

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const result = await sql.query`
      SELECT * FROM Users WHERE name = ${username}
    `;

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.recordset[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Logout user
router.post("/logout", authenticateToken, (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  blacklistedTokens.add(token);
  res.json({ message: "Logged out successfully" });
});

// ✅ List all users (protected)
router.get("/users", authenticateToken, async (req, res) => {
  try {
    const result = await sql.query`SELECT id, name, role FROM Users`;
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Fetch users error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
