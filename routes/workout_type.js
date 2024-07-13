const express = require('express');
const router = express.Router();
const pool = require('../server/db'); // Importing the connection pool

// POST route to register a new workout type
router.post('/upload-workout-type', async (req, res) => {
    const { warmup, core, cooldown } = req.body;
    try {
        const sql = `INSERT INTO workout_type (warmup, core, cooldown) VALUES (?, ?, ?)`;
        const values = [warmup, core, cooldown];
        const [result] = await pool.query(sql, values);
        const workoutTypeId = result.insertId;

        res.status(200).json({ message: 'Workout Type registered successfully!', id: workoutTypeId });
    } catch (err) {
        console.error('Error on registration:', err);
        res.status(500).send('Server error on registration');
    }
});

// PUT route to update workout type details
router.put('/update-workout-type/:id', async (req, res) => {
    const { id } = req.params;
    const { warmup, core, cooldown } = req.body;
    try {
        const sql = `UPDATE workout_type SET warmup = ?, core = ?, cooldown = ? WHERE id = ?`;
        const values = [warmup, core, cooldown, id];
        const [result] = await pool.query(sql, values);

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

// GET route to retrieve a workout type by ID
router.get('/workout_type/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT * FROM workout_type WHERE id = ?', [id]);

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('Workout Type not found');
        }
    } catch (error) {
        console.error('Error retrieving workout type data:', error);
        res.status(500).send('Server error retrieving workout type data');
    }
});

// DELETE route to remove a workout type
router.delete('/workout_type/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM workout_type WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Workout Type deleted successfully' });
        } else {
            res.status(404).send('Workout Type not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting Workout Type:', error);
        res.status(500).send('Server error deleting Workout Type');
    }
});

module.exports = router;
