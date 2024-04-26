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


app.post('/upload-perfomance', async (req, res) => {
    const { athlete_id, workout_id, results, date } = req.body;
    try {
        const connection = await getDBConnection();
        //sql call to put insert information into database
        const sql = `INSERT INTO performance (athlete_id, workout_id, results, date) VALUES (?, ?, ?, ?)`;
        const values = [athlete_id, workout_id, results, date];
        console.log("Inserting:", { athlete_id, workout_id, results, date });
        await connection.execute(sql, values);
        connection.end();
        res.status(200).json({ message: 'Performance registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error ok registration');
    }
});

app.put('/update-performance/:id', async (req, res) => {
    const { id } = req.params;
    const { athlete_id, workout_id, results, date } = req.body;
    try {
        const connection = await getDBConnection();
        // SQL call to update information in the database
        const sql = `UPDATE performance SET athlete_id = ?, workout_id = ?, results = ?, date = ? WHERE performance_id = ?`;
        const values = [athlete_id, workout_id, results, date, id];
        console.log("Updating:", { athlete_id, workout_id, results, date });
        const [result] = await connection.execute(sql, values);
        connection.end();

        // Check if the update was successful
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Performance updated successfully!' });
        } else {
            res.status(404).send('Performance not found or no changes made');
        }
    } catch (err) {
        console.error('Error updating performance:', err);
        res.status(500).send('Server error during performance update');
    }
});

app.get('/performance/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        const [rows] = await connection.execute('SELECT * FROM performance WHERE performance_id = ?', [id]);
        connection.end();

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Performance not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error retrieving performance data' });
    }
});

app.delete('/performance/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        // Execute the DELETE query
        const [result] = await connection.execute('DELETE FROM performance WHERE performance_id = ?', [id]);
        connection.end();

        // Check how many rows were affected
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Performance deleted successfully' });
        } else {
            res.status(404).send('Performance not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting perfromance:', error);
        res.status(500).json({ error: 'Server error deleting performance' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
