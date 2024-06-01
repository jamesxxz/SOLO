const express = require('express');
const router = express.Router();
const pool = require('../server/db'); // Importing the connection pool

// POST route to upload media
router.post('/media-upload', async (req, res) => {
    const { title, type, media_link, description, athlete_id, competition_results } = req.body;
    try {
        const sql = `INSERT INTO media (title, type, media_link, description, athlete_id, competition_results) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [title, type, media_link, description, athlete_id, competition_results];
        const [result] = await pool.query(sql, values);
        const mediaId = result.insertId;

        res.status(200).json({ message: 'Media uploaded successfully!', id: mediaId });
    } catch (err) {
        console.error('Error on media upload:', err);
        res.status(500).send('Server error on media upload');
    }
});

// PUT route to update media details
router.put('/update-media/:id', async (req, res) => {
    const { id } = req.params;
    const { title, type, media_link, description, athlete_id, competition_results } = req.body;
    try {
        const sql = `UPDATE media SET title = ?, type = ?, media_link = ?, description = ?, athlete_id = ?, competition_results = ? WHERE id = ?`;
        const values = [title, type, media_link, description, athlete_id, competition_results, id];
        const [result] = await pool.query(sql, values);

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

// GET route to retrieve media by ID
router.get('/media/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT * FROM media WHERE id = ?', [id]);

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('Media not found');
        }
    } catch (error) {
        console.error('Error retrieving media data:', error);
        res.status(500).send('Server error retrieving media data');
    }
});

// DELETE route to remove media
router.delete('/media/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM media WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Media deleted successfully' });
        } else {
            res.status(404).send('Media not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).send('Server error deleting media');
    }
});

module.exports = router;
