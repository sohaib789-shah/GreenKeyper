require("dotenv").config();
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),

  authentication: {
    type: "default" // Uses Windows Authentication (your logged-in Windows user)
  },

  options: {
    encrypt: process.env.DB_ENCRYPT === "true",  // true = SSL
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERT === "true"
  }
};

let pool;

const connectDB = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log("✅ Connected to SQL Server (Windows Auth)");
    }
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    throw err;
  }
};

module.exports = { connectDB, sql };
