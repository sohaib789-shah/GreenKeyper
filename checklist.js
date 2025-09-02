const express = require("express");
const router = express.Router();
const { connectDB, sql } = require("../db");

// ✅ Add checklist item (id auto-generated)
router.post("/add", async (req, res) => {
  const { type, title, created_by, is_active } = req.body; // no id
  try {
    const pool = await connectDB();
    await pool.request()
      .input("type", sql.NVarChar, type)
      .input("title", sql.NVarChar, title)
      .input("created_by", sql.NVarChar, created_by)
      .input("is_active", sql.Bit, is_active)
      .query(`INSERT INTO Checklists (type, title, created_by, is_active)
              VALUES (@type, @title, @created_by, @is_active)`);

    res.json({ message: "Checklist item added successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ Get checklist item by id
router.get("/:id", async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM Checklists WHERE id = @id");

    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;


