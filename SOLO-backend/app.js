const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

require('dotenv').config();

const affiliationRouter = require('./routes/affiliation');
const athleteRouter = require('./routes/athlete')
const coachRouter = require('./routes/coach');
const mediaRouter = require('./routes/media');
const performanceRouter = require('./routes/performance');
const workoutTypeRouter = require('./routes/workout_type');
const workoutRouter = require('./routes/workout');

require('dotenv').config();

const pool = require('./server/db'); // Import the pool object for database connection

const app = express();

const PORT = 3000;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
    credentials: true,
  }),
);

// EXAMPLE
app.get('/test', async (req, res) => {
  try {
    const lbData = await pool.query('SELECT * FROM athlete');
    res.json(lbData.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.use('/affiliation', affiliationRouter);
app.use('/athlete', athleteRouter);
app.use('/coach', coachRouter);
app.use('/media', mediaRouter);
app.use('/performance', performanceRouter);
app.use('/workou-type', workoutTypeRouter);
app.use('/workout', workoutRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
