// server.js
require("dotenv").config();  // Load .env variables
const express = require("express");
const { connectDB } = require("./db"); // Import DB connection
const authRoutes = require("./routes/auth"); // Example route
const vehicleRoutes=require("./routes/vehicles");
const ChecklistRoutes=require("./routes/checklist");
const UserRoutes=require("./routes/users");


const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/checklists", ChecklistRoutes);
app.use("/users", UserRoutes);


// Root endpoint
app.get("/", (req, res) => {
  res.send("✅ GreenKeyper API is running...");
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB(); // Connect to DB
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();

