const express = require('express');
const router = express.Router();
const pool = require('../server/db');

// Link an athlete to a coach
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

module.exports = router;
