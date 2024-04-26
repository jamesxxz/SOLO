const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const app = express();
app.use(express.json());

//databaseinformation
const dbConfig = {
    host: "solotestdb.cxqsaw0a4eyq.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "SoloTestDB",
    database: "SoloTestDB"
};

// Establish a connection to the database
async function getDBConnection() {
    return await mysql.createConnection(dbConfig);

}
// post to register
app.post('/register', async (req, res) => {
    const { name, type, affiliation_id } = req.body;
    try {
        const connection = await getDBConnection();
        //sql call to put insert information into database
        const sql = `INSERT INTO affiliation (Name, type, affiliation_id) VALUES (?, ?, ?)`;
        const values = [name, type, affiliation_id];
        console.log("Inserting:", { name, type, affiliation_id });
        await connection.execute(sql, values);
        connection.end();
        res.status(200).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error ok registration');
    }
});
const PORT = 3000;


//listening function
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
