const express = require("express");
const router = express.Router();
const sql = require("mssql");
const pool = require("../db");
router.get("/test", (req, res) => res.send("ok from <router-name>"));

// Add checklist item
router.post("/add", async (req, res) => {
  const { vehicle_id, item_name, status } = req.body;
  try {
    await pool.request()
      .input("vehicle_id", sql.Int, vehicle_id)
      .input("item_name", sql.NVarChar, item_name)
      .input("status", sql.Bit, status)
      .query(`INSERT INTO Checklists (vehicle_id, item_name, status)
              VALUES (@vehicle_id, @item_name, @status)`);
    res.json({ message: "Checklist item added successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get checklist for a vehicle
router.get("/:vehicle_id", async (req, res) => {
  try {
    const result = await pool.request()
      .input("vehicle_id", sql.Int, req.params.vehicle_id)
      .query("SELECT * FROM Checklists WHERE vehicle_id = @vehicle_id");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
