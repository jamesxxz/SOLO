const express = require('express');
const router = express.Router();
const pool = require('../server/db'); // Importing the connection pool

// POST route to register a new performance
router.post('/upload-performance', async (req, res) => {
    const { athlete_id, workout_id, results, date } = req.body;
    try {
        const sql = `INSERT INTO performance (athlete_id, workout_id, results, date) VALUES (?, ?, ?, ?)`;
        const values = [athlete_id, workout_id, results, date];
        const [result] = await pool.query(sql, values);
        const performanceId = result.insertId;

        res.status(200).json({ message: 'Performance registered successfully!', id: performanceId });
    } catch (err) {
        console.error('Error on performance registration:', err);
        res.status(500).send('Server error on performance registration');
    }
});

// PUT route to update performance details
router.put('/update-performance/:id', async (req, res) => {
    const { id } = req.params;
    const { athlete_id, workout_id, results, date } = req.body;
    try {
        const sql = `UPDATE performance SET athlete_id = ?, workout_id = ?, results = ?, date = ? WHERE id = ?`;
        const values = [athlete_id, workout_id, results, date, id];
        const [result] = await pool.query(sql, values);

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

// GET route to retrieve performance by ID
router.get('/performance/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT * FROM performance WHERE id = ?', [id]);

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('Performance not found');
        }
    } catch (error) {
        console.error('Error retrieving performance data:', error);
        res.status(500).send('Server error retrieving performance data');
    }
});

// DELETE route to remove a performance
router.delete('/performance/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM performance WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Performance deleted successfully' });
        } else {
            res.status(404).send('Performance not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting performance:', error);
        res.status(500).send('Server error deleting performance');
    }
});

module.exports = router;
