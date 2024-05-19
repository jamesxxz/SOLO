const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.json());

const pool = mysql.createPool({
  host: "solotestdb.cxqsaw0a4eyq.us-west-1.rds.amazonaws.com",
  user: "admin",
  port: 3306,
  password: "SoloTestDB",
  database: "SoloTestDB"
});

const upload = multer({ dest: 'uploads/' });

app.post('/api/users', upload.single('profilePhoto'), async (req, res) => {
    const { name, email, password, role } = req.body;
    const profilePhoto = req.file ? req.file.path : null;

    console.log('Received data:', req.body); // Log received data
    console.log('Received file:', req.file); // Log received file

    try {
        let query;
        if (role === 'Coach') {
            query = 'INSERT INTO coach (name, email, password, profile_photo) VALUES (?, ?, ?, ?)';
        } else if (role === 'Athlete') {
            query = 'INSERT INTO athlete (name, email, password, profile_photo) VALUES (?, ?, ?, ?)';
        } else {
            return res.status(400).send('Invalid role');
        }

        const [result] = await pool.query(query, [name, email, password, profilePhoto]);
        res.send({ id: result.insertId, name, email, password, profilePhoto, role });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
