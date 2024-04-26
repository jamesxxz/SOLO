const { Pool } = require('pg');

const pool = new Pool({
    host: "solotestdb.cxqsaw0a4eyq.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "SoloTestDB",
    database: "SoloTestDB",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
