const express = require('express');
const router = express.Router();
const pool = require('../server/db'); // Importing the connection pool

// POST route to register a new coach
router.post('/sign-up-coach', async (req, res) => {
    const { name, email, phone_number, profile_pic, title, affiliation_id } = req.body;
    try {
        const sql = `INSERT INTO coach (name, email, phone_number, profile_pic, title, affiliation_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [name, email, phone_number, profile_pic, title, affiliation_id];
        await pool.query(sql, values);
        res.status(200).json({ message: 'Coach registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error on registration');
    }
});

// PUT route to update a coach's details
router.put('/update-coach/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, profile_pic, title, affiliation_id } = req.body;
    try {
        const sql = `UPDATE coach SET name = ?, email = ?, phone_number = ?, profile_pic = ?, title = ?, affiliation_id = ? WHERE coach_id = ?`;
        const values = [name, email, phone_number, profile_pic, title, affiliation_id, id];
        const [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Coach updated successfully!' });
        } else {
            res.status(404).send('Coach not found or no changes made');
        }
    } catch (err) {
        console.error('Error updating coach:', err);
        res.status(500).send('Server error during coach update');
    }
});

// GET route to retrieve a coach by ID
router.get('/coach/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM coach WHERE coach_id = ?', [id]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Coach not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error retrieving coach data');
    }
});

// DELETE route to remove a coach
router.delete('/coach/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM coach WHERE coach_id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Coach deleted successfully' });
        } else {
            res.status(404).send('Coach not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting coach:', error);
        res.status(500).send('Server error deleting coach');
    }
});

module.exports = router;
