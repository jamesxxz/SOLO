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

/**
 * 
 * 
Columns:
workout_id
int PK
coach_id
int
athlete_id
int
type_id
int


 */

app.post('/upload-workout', async (req, res) => {
    const { coach_id, athlete_id, type_id } = req.body;
    try {
        const connection = await getDBConnection();
        //sql call to put insert information into database
        const sql = `INSERT INTO workout (coach_id, athlete_id, type_id) VALUES (?, ?, ?)`;
        const values = [coach_id, athlete_id, type_id];
        console.log("Inserting:", { coach_id, athlete_id, type_id });
        await connection.execute(sql, values);
        connection.end();
        res.status(200).json({ message: 'Workout Type registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error ok registration');
    }
});
const PORT = 3000;

app.put('/update-workout/:id', async (req, res) => {
    const { id } = req.params;
    const { coach_id, athlete_id, type_id } = req.body;
    try {
        const connection = await getDBConnection();
        // SQL call to update information in the database
        const sql = `UPDATE workout SET coach_id = ?, athlete_id = ?, type_id = ? WHERE workout_id = ?`;
        const values = [coach_id, athlete_id, type_id, id];
        console.log("Updating:", { coach_id, athlete_id, type_id });
        const [result] = await connection.execute(sql, values);
        connection.end();

        // Check if the update was successful
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Workout updated successfully!' });
        } else {
            res.status(404).send('Workout not found or no changes made');
        }
    } catch (err) {
        console.error('Error updating Workout:', err);
        res.status(500).send('Server error during Workout update');
    }
});


app.get('/workout/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        const [rows] = await connection.execute('SELECT * FROM workout WHERE workout_id = ?', [id]);
        connection.end();

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Workout  not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error retrieving workout  data' });
    }
});

app.delete('/workout_type/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        // Execute the DELETE query
        const [result] = await connection.execute('DELETE FROM workout WHERE workout_id = ?', [id]);
        connection.end();

        // Check how many rows were affected
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Workout deleted successfully' });
        } else {
            res.status(404).send('Workout not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({ error: 'Server error deleting Workout' });
    }
});

//listening function
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
