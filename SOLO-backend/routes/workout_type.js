const express = require('express');
const router = express.Router();
const pool = require('../server/db'); // Importing the connection pool

// POST route to register a new workout type
router.post('/upload-workout-type', async (req, res) => {
  const {
    title,
    intensity,
    time,
    userId,
    warmUpDrills,
    coreDrills,
    coolDownDrills,
    workoutType
  } = req.body;

  console.log('Received values:', {
    title,
    intensity,
    time,
    userId,
    warmUpDrills,
    coreDrills,
    coolDownDrills,
    workoutType
  });

  // Extracting coreDistance, coreReps, and coreRest from coreDrills
  const coreDistance = coreDrills.map(drill => drill.distance).join(', ') || null;
  const coreReps = coreDrills.map(drill => drill.reps).join(', ') || null;

  try {
    const sql = `
      INSERT INTO workout_type (
        name,
        intensity,
        time,
        userId,
        warmUpDrills,
        coreDistance,
        coreReps,
        coolDownDrills,
        workoutType
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title,
      intensity,
      time,
      userId,
      JSON.stringify(warmUpDrills),   // Convert arrays to JSON strings
      coreDistance,
      coreReps,
      JSON.stringify(coolDownDrills),
      workoutType
    ];

    await pool.query(sql, values);

    res.status(200).json({ message: 'Workout Type registered successfully!' });
  } catch (err) {
    console.error('Error on registration:', err);
    res.status(500).send('Server error on registration');
  }
});

// PUT route to update workout type details
router.put('/update-workout-type/:id', async (req, res) => {
  const { id } = req.params;
  const { title, intensity, time, userId, warmUpDrills, coreDrills, coolDownDrills } = req.body;

  const coreDistance = coreDrills.map(drill => drill.distance).join(', ') || null;
  const coreReps = coreDrills.map(drill => drill.reps).join(', ') || null;

  try {
    const sql = `
      UPDATE workout_type SET
        name = ?,
        intensity = ?,
        time = ?,
        userId = ?,
        warmUpDrills = ?,
        coreDistance = ?,
        coreReps = ?,
        coolDownDrills = ?
      WHERE id = ?
    `;

    const values = [
      title,
      intensity,
      time,
      userId,
      JSON.stringify(warmUpDrills),
      coreDistance,
      coreReps,
      JSON.stringify(coolDownDrills),
      id
    ];

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
router.get('/get_workout/:id', async (req, res) => {
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

// GET route to retrieve workouts by userId and workoutType
router.get('/get_workouts/:userId/:workoutType', async (req, res) => {
  try {
    const { userId, workoutType } = req.params;
    const [results] = await pool.query('SELECT * FROM workout_type WHERE userId = ? AND workoutType = ?', [userId, workoutType]);

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).send('Server error fetching workouts');
  }
});

// DELETE route to remove a workout type
router.delete('/delete_workout_type/:id', async (req, res) => {
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
