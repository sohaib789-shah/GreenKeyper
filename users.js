const express = require("express");
const router = express.Router();
const sql = require("mssql");
const pool = require("../db"); // your DB connection
router.get("/test", (req, res) => res.send("ok from <router-name>"));

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
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
