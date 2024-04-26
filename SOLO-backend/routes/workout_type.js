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

app.post('/upload-workout-type', async (req, res) => {
    const { warmup, core, cooldown } = req.body;
    try {
        const connection = await getDBConnection();
        //sql call to put insert information into database
        const sql = `INSERT INTO workout_type (warmup, core, cooldown) VALUES (?, ?, ?)`;
        const values = [warmup, core, cooldown];
        console.log("Inserting:", { warmup, core, cooldown });
        await connection.execute(sql, values);
        connection.end();
        res.status(200).json({ message: 'Workout Type registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error ok registration');
    }
});
const PORT = 3000;

app.put('/update-workout-type/:id', async (req, res) => {
    const { id } = req.params;
    const { warmup, core, cooldown } = req.body;
    try {
        const connection = await getDBConnection();
        // SQL call to update information in the database
        const sql = `UPDATE workout_type SET warmup = ?, core = ?, cooldown = ? WHERE workoutType_id = ?`;
        const values = [warmup, core, cooldown, id];
        console.log("Updating:", { warmup, core, cooldown });
        const [result] = await connection.execute(sql, values);
        connection.end();

        // Check if the update was successful
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Workout Type updated successfully!' });
        } else {
            res.status(404).send('Workout Type not found or no changes made');
        }
    } catch (err) {
        console.error('Error updating Workout Type:', err);
        res.status(500).send('Server error during Workout Type update');
    }
});

app.get('/workout_type/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        const [rows] = await connection.execute('SELECT * FROM workout_type WHERE workoutType_id = ?', [id]);
        connection.end();

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Workout Type not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error retrieving workout type data' });
    }
});

app.delete('/workout_type/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        // Execute the DELETE query
        const [result] = await connection.execute('DELETE FROM workout_type WHERE workoutType_id = ?', [id]);
        connection.end();

        // Check how many rows were affected
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Workout Type deleted successfully' });
        } else {
            res.status(404).send('Workout Type not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting Workout Type:', error);
        res.status(500).json({ error: 'Server error deleting Workout Type' });
    }
});

//listening function
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
