// routes/affiliation.js
const express = require('express');
const router = express.Router();
const pool = require('../server/db'); // Importing the pool

// POST route to register a new affiliation
router.post('/register-affiliation', async (req, res) => {
    const { name, type, affiliation_id } = req.body;
    try {
        const sql = `INSERT INTO affiliation (Name, type, affiliation_id) VALUES (?, ?, ?)`;
        const values = [name, type, affiliation_id];
        const [result] = await pool.query(sql, values); // Use pool.query directly for simpler syntax and automatic connection management

        console.log("Inserting:", { name, type, affiliation_id });
        res.status(200).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error on registration');
    }
});

// GET route to retrieve an affiliation by ID
router.get('/affiliation/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM affiliation WHERE affiliation_id = ?', [id]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Affiliation not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error retrieving affiliation data');
    }
});

// PUT route to update an affiliation
router.put('/affiliation/:id', async (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;
    try {
        const sql = `UPDATE affiliation SET Name = ?, type = ? WHERE affiliation_id = ?`;
        const values = [name, type, id];
        const [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Affiliation updated successfully!' });
        } else {
            res.status(404).send('Affiliation not found or no changes made');
        }
    } catch (err) {
        console.error('Error updating affiliation:', err);
        res.status(500).send('Server error during affiliation update');
    }
});

// DELETE route to remove an affiliation
router.delete('/affiliation/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM affiliation WHERE affiliation_id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Affiliation deleted successfully' });
        } else {
            res.status(404).send('Affiliation not found or already deleted');
        }
    } catch (error) {
        console.error('Error deleting affiliation:', error);
        res.status(500).send('Server error deleting affiliation');
    }
});

module.exports = router;
