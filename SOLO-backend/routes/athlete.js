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
app.post('/sign-up-athlete', async (req, res) => {
    const { name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id } = req.body;
    try {
        const connection = await getDBConnection();
        //sql call to put insert information into database
        const sql = `INSERT INTO athlete (name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id];
        console.log("Inserting:", { name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id });
        await connection.execute(sql, values);
        connection.end();
        res.status(200).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error ok registration');
    }
});

app.put('/update-athlete/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id } = req.body;
    try {
        const connection = await getDBConnection();
        // SQL call to update information in the database
        const sql = `UPDATE athlete SET name = ?, email = ?, phone_number = ?, profile_pic = ?, age = ?, gender = ?, height = ?, weight = ?, affiliation_id = ? WHERE media_id = ?`;
        const values = [name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id, id];
        console.log("Updating:", { name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id });
        const [result] = await connection.execute(sql, values);
        connection.end();

        // Check if the update was successful
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Athlete updated successfully!' });
        } else {
            res.status(404).send('Athlere not found or no changes made');
        }
    } catch (err) {
        console.error('Error updating athlete:', err);
        res.status(500).send('Server error during athlete update');
    }
});


app.get('/athlete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        const [rows] = await connection.execute('SELECT * FROM athlete WHERE athlete_id = ?', [id]);
        connection.end();

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Athlete not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error retrieving athlete data' });
    }
});

app.delete('/athlete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        // Execute the DELETE query
        const [result] = await connection.execute('DELETE FROM athlete WHERE athlete_id = ?', [id]);
        connection.end();

        // Check how many rows were affected
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Athlete deleted successfully' });
        } else {
            res.status(404).send('Athlete not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting athlete:', error);
        res.status(500).json({ error: 'Server error deleting athlete' });
    }
});
const PORT = 3000;


//listening function
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
