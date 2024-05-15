const express = require('express');
const router = express.Router();
const pool = require('../server/db'); // Importing the pool

// POST route to register a new athlete
router.post('/sign-up-athlete', async (req, res) => {
    const { name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id, coach_id } = req.body;
    try {
        const sql = `INSERT INTO athlete (name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id, coach_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id, coach_id];
        await pool.query(sql, values);
        res.status(200).json({ message: 'Athlete registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error on registration');
    }
});

// PUT route to update an athlete's details
router.put('/update-athlete/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id, coach_id } = req.body;
    try {
        const sql = `UPDATE athlete SET name = ?, email = ?, phone_number = ?, profile_pic = ?, age = ?, gender = ?, height = ?, weight = ?, affiliation_id = ?, coach_id = ? WHERE athlete_id = ?`;
        const values = [name, email, phone_number, profile_pic, age, gender, height, weight, affiliation_id, coach_id, id];
        const [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Athlete updated successfully!' });
        } else {
            res.status(404).send('Athlete not found or no changes made');
        }
    } catch (err) {
        console.error('Error updating athlete:', err);
        res.status(500).send('Server error during athlete update');
    }
});

// GET route to retrieve an athlete by ID
router.get('/athlete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM athlete WHERE athlete_id = ?', [id]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Athlete not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error retrieving athlete data');
    }
});

// DELETE route to remove an athlete
router.delete('/athlete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM athlete WHERE athlete_id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Athlete deleted successfully' });
        } else {
            res.status(404).send('Athlete not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting athlete:', error);
        res.status(500).send('Server error deleting athlete');
    }
});

module.exports = router;
