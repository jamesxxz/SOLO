// coach.js
const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const pool = require('../server/db');

// Register a coach
router.post('/sign-up-coach', async (req, res) => {
    const { name, email, phone_number, password, profile_pic, title, affiliation_id } = req.body;
    try {
        const encryptedPassword = password;
        console.log('Registering coach with email:', email);
        console.log('Encrypted password to store:', encryptedPassword);

        const sql = `INSERT INTO coach (name, email, phone_number, password, profile_pic, title, affiliation_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, email, phone_number, encryptedPassword, profile_pic, title, affiliation_id];
        const [result] = await pool.query(sql, values);
        const coachId = result.insertId;

        console.log('Coach registered with ID:', coachId);
        res.status(200).json({ message: 'Coach registered successfully!', id: coachId });
    } catch (err) {
        console.error('Error on registration:', err);
        res.status(500).send('Server error on registration');
    }
});

// PUT route to update a coach's details
router.put('/update-coach/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number } = req.body;
    try {
        const sql = `UPDATE coach SET name = ?, email = ?, phone_number = ? WHERE coach_id = ?`;
        const values = [name, email, phone_number, id];
        const [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Coach details updated successfully!' });
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
        const [result] = await pool.query('SELECT * FROM coach WHERE coach_id = ?', [id]);

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('Coach not found');
        }
    } catch (error) {
        console.error('Error retrieving coach data:', error);
        res.status(500).send('Server error retrieving coach data');
    }
});

// DELETE route to remove a coach
router.delete('/coach/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM coach WHERE id = ?', [id]);

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

// POST route to link an athlete to a coach
router.post('/link-athlete-to-coach', async (req, res) => {
    const { coach_id, athlete_id } = req.body;
    try {
      const linkSql = 'INSERT INTO coach_athlete_link (coach_id, athlete_id) VALUES (?, ?)';
      const linkValues = [coach_id, athlete_id];
      await pool.query(linkSql, linkValues);
      res.status(200).json({ message: 'Athlete linked to coach successfully!' });
    } catch (err) {
      console.error('Error linking athlete to coach:', err);
      res.status(500).send('Server error on linking athlete to coach');
    }
  });
  

// Login route for coaches
router.post('/login-coach', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM coach WHERE email = ?', [email]);
        if (rows.length > 0) {
            const coach = rows[0];
            if (coach.password === password) {
                res.status(200).json({ message: 'Login successful', coach });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error during login');
    }
});

router.get('/link-athlete/:coachId/athletes', async (req, res) => {
    const { coachId } = req.params;
    console.log('Fetching linked athletes for coachId:', coachId); // Debug log

    try {
        const sql = `
            SELECT a.athlete_id, a.name, a.email, a.profile_pic, a.affiliation_id, aff.name as affiliation_name
            FROM athlete a
            JOIN coach_athlete_link cal ON a.athlete_id = cal.athlete_id
            JOIN affiliation aff ON a.affiliation_id = aff.affiliation_id
            WHERE cal.coach_id = ?
        `;
        const [results] = await pool.query(sql, [coachId]);
        console.log('Query results:', results); // Debug log

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).send('No linked athletes found');
        }
    } catch (error) {
        console.error('Error fetching linked athletes:', error);
        res.status(500).send('Server error fetching linked athletes');
    }
});

router.post('/workout', async (req, res) => {
    const { coach_id, athlete_id, workout_id, type_id, due_date, demonstration } = req.body;

    const query = `
        INSERT INTO workout (type_id, coach_id, athlete_id, workout_id, due_date, demonstration)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await pool.query(query, [type_id, coach_id, athlete_id, workout_id, due_date, demonstration]);
        res.status(200).json({ message: 'Workout added successfully', workoutId: result.insertId });
    } catch (err) {
        console.error('Error inserting workout:', err);
        res.status(500).json({ error: 'Failed to insert workout' });
    }
});

router.get('/workout', async (req, res) => {
    const { date } = req.query;
    try {
        const sql = `
            SELECT w.*, a.name as athlete_name, c.name as coach_name
            FROM workout w
            JOIN athlete a ON w.athlete_id = a.athlete_id
            JOIN coach c ON w.coach_id = c.coach_id
            WHERE DATE(w.due_date) = ?
        `;
        const [results] = await pool.query(sql, [date]);

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).send('No workouts found for the given date');
        }
    } catch (error) {
        console.error('Error retrieving workouts by date:', error);
        res.status(500).send('Server error retrieving workouts by date');
    }
});

router.post('/media-upload', (req, res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Handle Multer errors
        console.error('Multer error:', err);
        return res.status(400).json({ error: err.message });
      } else if (err) {
        // Handle other errors
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Failed to upload file.' });
      }
      // Proceed if upload is successful
      res.status(200).json({ message: 'Media uploaded successfully', media_id: req.file.filename, signedUrl: `/uploads/${req.file.filename}` });
    });
  });

module.exports = router;
