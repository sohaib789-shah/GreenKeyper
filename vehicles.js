const express = require("express");
const router = express.Router();
const { connectDB, sql } = require("../db"); // ✅ same pattern as user.js

// ✅ Add vehicle
router.post("/add", async (req, res) => {
  const { plate_number, make, model, year, is_active } = req.body; // match DB
  try {
    const pool = await connectDB();

    await pool.request()
      .input("plate_number", sql.NVarChar, plate_number)
      .input("make", sql.NVarChar, make)
      .input("model", sql.NVarChar, model)
      .input("year", sql.Int, year)
      .input("is_active", sql.Bit, is_active)
      .query(`INSERT INTO Vehicles (plate_number, make, model, year, is_active)
              VALUES (@plate_number, @make, @model, @year, @is_active)`);

    res.json({ message: "Vehicle added successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ Get vehicle by ID
router.get("/:id", async (req, res) => {
  try {
    const pool = await connectDB();

    const result = await pool.request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM Vehicles WHERE id = @id");

    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

