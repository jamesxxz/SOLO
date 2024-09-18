const express = require('express');
const router = express.Router();
const pool = require('../server/db'); // Importing the connection pool

// POST route to upload a new workout

// PUT route to update workout details
router.put('/update-workout/:id', async (req, res) => {
    const { id } = req.params;
    const { coach_id, athlete_id, type_id } = req.body;
    try {
        const sql = `UPDATE workout SET coach_id = ?, athlete_id = ?, type_id = ? WHERE id = ?`;
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

// GET route to retrieve all workouts by coach_id and athlete_id
// POST route to assign a task (workout)
router.post('/assign-task', async (req, res) => {
    const { coach_id, athlete_id, type_id, title, intensity, due_date, status, time } = req.body;
    try {
        const sql = `INSERT INTO workout (coach_id, athlete_id, type_id, workout_title, intensity, due_date, status, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [coach_id, athlete_id,type_id, title, intensity, due_date, status, time];
        const [result] = await pool.query(sql, values);

        res.status(200).json({ message: 'Task assigned successfully!', id: result.insertId });
    } catch (err) {
        console.error('Error assigning task:', err);
        res.status(500).send('Server error assigning task');
    }
});

// GET route to fetch tasks by coach_id and athlete_id
router.get('/tasks/:coach_id/:athlete_id', async (req, res) => {
    try {
        const { coach_id, athlete_id } = req.params;
        const [result] = await pool.query('SELECT * FROM workout WHERE coach_id = ? AND athlete_id = ?', [coach_id, athlete_id]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).send('No tasks found for this coach and athlete');
        }
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).send('Server error retrieving tasks');
    }
});

// GET route to fetch tasks by coach_id and athlete_id
router.get('/athlete-tasks/:athlete_id', async (req, res) => {
    try {
        const { athlete_id } = req.params;

        // Query to retrieve tasks for the athlete and the corresponding coach's name
        const [result] = await pool.query(`
            SELECT w.*, c.name AS coach_name
            FROM workout w
            JOIN coach c ON w.coach_id = c.coach_id
            WHERE w.athlete_id = ?
        `, [athlete_id]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).send('No tasks found for this athlete');
        }
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).send('Server error retrieving tasks');
    }
});

// DELETE route to remove a workout
router.delete('/workout/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM workout WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Workout deleted successfully' });
        } else {
            res.status(404).send('Workout not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting Workout:', error);
        res.status(500).send('Server error deleting Workout');
    }
});

module.exports = router;
