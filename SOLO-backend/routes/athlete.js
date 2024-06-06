const express = require('express');
const router = express.Router();
const pool = require('../server/db'); // Importing the connection pool

// Register an athlete
router.post('/sign-up-athlete', async (req, res) => {
    const { name, email, phone_number, password, profile_pic, age, gender, height, weight, affiliation_id } = req.body;
    try {
        const encryptedPassword = password;
        console.log('Registering athlete with email:', email);
        console.log('Encrypted password to store:', encryptedPassword);

        const sql = `INSERT INTO athlete (name, email, phone_number, password, profile_pic, age, gender, height, weight, affiliation_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, email, phone_number, encryptedPassword, profile_pic, age, gender, height, weight, affiliation_id];
        const [result] = await pool.query(sql, values);
        const athleteId = result.insertId;

        console.log('Athlete registered with ID:', athleteId);
        res.status(200).json({ message: 'Athlete registered successfully!', id: athleteId });
    } catch (err) {
        console.error('Error on registration:', err);
        res.status(500).send('Server error on registration');
    }
});

// PUT route to update an athlete's details
router.put('/update-athlete/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, age, gender, height, weight } = req.body;
    try {
        const sql = `UPDATE athlete SET name = ?, email = ?, phone_number = ?, age = ?, gender = ?, height = ?, weight = ? WHERE athlete_id = ?`;
        const values = [name, email, phone_number, age, gender, height, weight, id];
        const [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Athlete details updated successfully!' });
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
        const [result] = await pool.query('SELECT * FROM athlete WHERE athlete_id = ?', [id]);

        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('Athlete not found');
        }
    } catch (error) {
        console.error('Error retrieving athlete data:', error);
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

// Login route for athletes
router.post('/login-athlete', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM athlete WHERE email = ?', [email]);
        if (rows.length > 0) {
            const athlete = rows[0];
            if (athlete.password === password) {
                res.status(200).json({ message: 'Login successful', athlete });
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

// In athlete routes
router.get('/search', async (req, res) => {
    const { email, phone_number, affiliation_id } = req.query;
    console.log('Search parameters:', email, phone_number, affiliation_id); // Log the query parameters
  
    try {
      // Convert affiliation_id to an integer
      const affiliationIdInt = parseInt(affiliation_id, 10);
  
      // Check if affiliationIdInt is a valid number
      if (isNaN(affiliationIdInt)) {
        return res.status(400).send('Invalid affiliation ID');
      }
  
      const sql = 'SELECT * FROM athlete WHERE email = ? AND phone_number = ? AND affiliation_id = ?';
      const values = [email, phone_number, affiliationIdInt];
  
      // Log the query and values being executed
      console.log('Executing query:', sql);
      console.log('With values:', values);
  
      const [result] = await pool.query(sql, values);
      console.log('Search result:', result);
  
      if (result.length > 0) {
        res.status(200).json(result[0]);
        console.log('Matching athlete found:', result[0]);
      } else {
        res.status(404).send('No matching athlete found');
        console.log('No matching athlete found');
      }
    } catch (error) {
      console.error('Error searching athlete:', error);
      res.status(500).send('Server error during athlete search');
    }
  });
  
  

module.exports = router;
