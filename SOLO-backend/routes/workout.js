const express = require('express');
const router = express.Router();
const pool = require('../server/db'); // Importing the connection pool

// POST route to upload a new workout
router.post('/upload-workout', async (req, res) => {
    const { coach_id, athlete_id, type_id } = req.body;
    try {
        const sql = `INSERT INTO workout (coach_id, athlete_id, type_id) VALUES (?, ?, ?)`;
        const values = [coach_id, athlete_id, type_id];
        await pool.query(sql, values);
        res.status(200).json({ message: 'Workout registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error on registration');
    }
});

// PUT route to update workout details
router.put('/update-workout/:id', async (req, res) => {
    const { id } = req.params;
    const { coach_id, athlete_id, type_id } = req.body;
    try {
        const sql = `UPDATE workout SET coach_id = ?, athlete_id = ?, type_id = ? WHERE workout_id = ?`;
        const values = [coach_id, athlete_id, type_id, id];
        const [result] = await pool.query(sql, values);

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

// GET route to retrieve a workout by ID
router.get('/workout/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM workout WHERE workout_id = ?', [id]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Workout not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error retrieving workout data');
    }
});

// DELETE route to remove a workout
router.delete('/workout/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM workout WHERE workout_id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Workout deleted successfully' });
        } else {
            res.status(404).send('Workout not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).send('Server error deleting Workout');
    }
});

module.exports = router;
