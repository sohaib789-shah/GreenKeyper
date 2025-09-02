const express = require("express");
const router = express.Router();
const { connectDB, sql } = require("../db"); // ✅ use connectDB and sql

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const pool = await connectDB(); // ✅ get connection pool
    const result = await pool.request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM Users WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;


