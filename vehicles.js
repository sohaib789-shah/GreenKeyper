const express = require("express");
const router = express.Router();
const sql = require("mssql");
const pool = require("../db"); // your db connection
router.get("/test", (req, res) => res.send("ok from <router-name>"));

// Add vehicle
router.post("/add", async (req, res) => {
  const { user_id, vehicle_name, vehicle_type } = req.body;
  try {
    await pool.request()
      .input("user_id", sql.Int, user_id)
      .input("vehicle_name", sql.NVarChar, vehicle_name)
      .input("vehicle_type", sql.NVarChar, vehicle_type)
      .query(`INSERT INTO Vehicles (user_id, vehicle_name, vehicle_type)
              VALUES (@user_id, @vehicle_name, @vehicle_type)`);
    res.json({ message: "Vehicle added successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all vehicles for a user
router.get("/:user_id", async (req, res) => {
  try {
    const result = await pool.request()
      .input("user_id", sql.Int, req.params.user_id)
      .query("SELECT * FROM Vehicles WHERE user_id = @user_id");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
