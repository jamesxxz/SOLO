// db.js
const mysql = require('mysql2/promise');
require('dotenv').config(); 
const pool = mysql.createPool({
  host: "solotestdb.cxqsaw0a4eyq.us-west-1.rds.amazonaws.com",
  user: "admin",
  port: 3000,  // Specify the port if not the default
  password: "SoloTestDB",
  database: "SoloTestDB"
});

module.exports = pool;
