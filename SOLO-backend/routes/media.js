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
app.post('/media-upload', async (req, res) => {
    const { title, type, media_link, description, athlete_id, competition_results } = req.body;
    try {
        const connection = await getDBConnection();
        //sql call to put insert information into database
        const sql = `INSERT INTO media (title, type, media_link, description, athlete_id, competition_results) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [title, type, media_link, description, athlete_id, competition_results];
        console.log("Inserting:", { nmedia_id, title, type, media_link, description, athlete_id, competition_results });
        await connection.execute(sql, values);
        connection.end();
        res.status(200).json({ message: 'Media uploaded successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error ok registration');
    }
});

app.put('/update-media/:id', async (req, res) => {
    const { id } = req.params;
    const { title, type, media_link, description, athlete_id, competition_results } = req.body;
    try {
        const connection = await getDBConnection();
        // SQL call to update information in the database
        const sql = `UPDATE media SET title = ?, type = ?, media_link = ?, description = ?, athlete_id = ?, competition_results = ? WHERE media_id = ?`;
        const values = [title, type, media_link, description, athlete_id, competition_results, id];
        console.log("Updating:", { title, type, media_link, description, athlete_id, competition_results });
        const [result] = await connection.execute(sql, values);
        connection.end();

        // Check if the update was successful
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Media updated successfully!' });
        } else {
            res.status(404).send('Media not found or no changes made');
        }
    } catch (err) {
        console.error('Error updating media:', err);
        res.status(500).send('Server error during media update');
    }
});

app.get('/media/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        const [rows] = await connection.execute('SELECT * FROM media WHERE media_id = ?', [id]);
        connection.end();

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Media not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error retrieving media data' });
    }
});


app.delete('/media/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getDBConnection();
        // Execute the DELETE query
        const [result] = await connection.execute('DELETE FROM media WHERE media_id = ?', [id]);
        connection.end();

        // Check how many rows were affected
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Media deleted successfully' });
        } else {
            res.status(404).send('Media not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting Media:', error);
        res.status(500).json({ error: 'Server error deleting media' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
