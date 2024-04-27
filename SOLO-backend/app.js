// server.js or app.js
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

// Import routes
const affiliationRouter = require('./routes/affiliation');
const athleteRouter = require('./routes/athlete');
const coachRouter = require('./routes/coach');
const mediaRouter = require('./routes/media');
const performanceRouter = require('./routes/performance');
const workoutTypeRouter = require('./routes/workout_type');
const workoutRouter = require('./routes/workout');

// Middlewares
app.use(cors());  // if you need to handle CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routers
app.use('/affiliation', affiliationRouter);
app.use('/athlete', athleteRouter);
app.use('/coach', coachRouter);
app.use('/media', mediaRouter);
app.use('/performance', performanceRouter);
app.use('/workout-type', workoutTypeRouter);
app.use('/workout', workoutRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, 'localhost', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});