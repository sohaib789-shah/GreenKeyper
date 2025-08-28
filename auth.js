const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => res.send("ok from <router-name>"));

// Example routes (you can replace with your controller logic)
router.post("/register", (req, res) => {
  res.send("Register endpoint");
});

router.post("/login", (req, res) => {
  res.send("Login endpoint");
});

router.post("/logout", (req, res) => {
  res.send("Logout endpoint");
});


module.exports = router;
