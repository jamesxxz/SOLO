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
app.post('/register-affiliation', async (req, res) => {
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

app.get('/affiliation/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        const [rows] = await connection.execute('SELECT * FROM affiliation WHERE affiliation_id = ?', [id]);
        connection.end();

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Affiliation not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error retrieving affiliation data' });
    }
});

// PUT to update an affiliation
app.put('/affiliation/:id', async (req, res) => {
    const { id } = req.params; // the ID of the affiliation to update
    const { name, type } = req.body; // data to update

    try {
        const connection = await getDBConnection();
        // SQL query to update the affiliation
        const sql = `UPDATE affiliation SET Name = ?, type = ? WHERE affiliation_id = ?`;
        const values = [name, type, id];
        console.log("Updating:", { name, type, id });

        const [result] = await connection.execute(sql, values);
        connection.end();

        // Check if the update was successful
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Affiliation updated successfully!' });
        } else {
            res.status(404).send('Affiliation not found or no changes made');
        }
    } catch (err) {
        console.error('Error updating affiliation:', err);
        res.status(500).send('Server error during affiliation update');
    }
});


app.delete('/affiliation/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        // Execute the DELETE query
        const [result] = await connection.execute('DELETE FROM affiliation WHERE affiliation_id = ?', [id]);
        connection.end();

        // Check how many rows were affected
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Affiliation deleted successfully' });
        } else {
            res.status(404).send('Affiliation not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting affiliation:', error);
        res.status(500).json({ error: 'Server error deleting affiliation' });
    }
});
//listening function
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
