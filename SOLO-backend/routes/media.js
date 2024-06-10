const express = require('express');
const router = express.Router();
const pool = require('../server/db');
const multer = require('multer');
const { uploadMedia, deleteMedia } = require('../services/awsS3_upload'); 
const path = require('path');
const fs = require('fs');
const { S3Client, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { fromEnv } = require('@aws-sdk/credential-provider-env');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config({ path: './services/.env' });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv()
});

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const upload = multer({ dest: uploadsDir });

// POST route to upload media
router.post('/media-upload', upload.single('file'), async (req, res) => {
  const { title, athlete_id } = req.body;
  try {
    const file = req.file;
    const mediaPath = file.path;
    const mediaName = file.originalname;
    const bucketName = process.env.AWS_BUCKET_NAME;

    const mediaUrl = await uploadMedia(bucketName, mediaPath, mediaName);

    const sql = `INSERT INTO media (title, type, media_link, athlete_id) VALUES (?, 'current', ?, ?)`;
    const values = [title, mediaUrl, athlete_id];
    const [result] = await pool.query(sql, values);

    const media_id = result.insertId;

    const updateSql = `UPDATE media SET id = ? WHERE media_id = ?`;
    await pool.query(updateSql, [media_id, media_id]);

    fs.unlinkSync(mediaPath);

    res.status(200).json({ message: 'Media uploaded successfully!', media_id, mediaUrl });
  } catch (err) {
    console.error('Error on media upload:', err);
    res.status(500).send('Server error on media upload');
  }
});

router.post('/media-upload/past', upload.single('file'), async (req, res) => {
  const { title, athlete_id } = req.body;
  try {
    const file = req.file;
    const mediaPath = file.path;
    const mediaName = file.originalname;
    const bucketName = process.env.AWS_BUCKET_NAME;

    const mediaUrl = await uploadMedia(bucketName, mediaPath, mediaName);

    const sql = `INSERT INTO media (title, type, media_link, athlete_id) VALUES (?, 'past', ?, ?)`;
    const values = [title, mediaUrl, athlete_id];
    const [result] = await pool.query(sql, values);

    const media_id = result.insertId;

    const updateSql = `UPDATE media SET id = ? WHERE media_id = ?`;
    await pool.query(updateSql, [media_id, media_id]);

    fs.unlinkSync(mediaPath);

    res.status(200).json({ message: 'Media uploaded successfully!', media_id, mediaUrl });
  } catch (err) {
    console.error('Error on media upload:', err);
    res.status(500).send('Server error on media upload');
  }
});

// GET route to retrieve media by athlete_id and type
router.get('/media/athlete', async (req, res) => {
  const { athlete_id, type } = req.query;
  try {
    const [result] = await pool.query('SELECT * FROM media WHERE athlete_id = ? AND type = ?', [athlete_id, type]);

    if (result.length > 0) {
      const signedMedia = await Promise.all(
        result.map(async (media) => {
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: media.title
          };

          try {
            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 });
            return {
              media_id : media.id,
              type: media.type,
              id: media.id,
              name: media.title,
              signedUrl: url
            };
          } catch (error) {
            console.error('GET Error generating signed URL from S3:', error);
            return {
              ...media,
              signedUrl: null,
              error: 'Error generating signed URL'
            };
          }
        })
      );
      res.status(200).json(signedMedia);
    } else {
      res.status(404).send('No media found for this athlete');
    }
  } catch (error) {
    console.error('Error retrieving media data:', error);
    res.status(500).send('Server error retrieving media data');
  }
});

// DELETE route to delete media by id
router.delete('/media/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Get the media entry from the database
    const [result] = await pool.query('SELECT media_link FROM media WHERE id = ?', [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Media not found' });
    }

    const mediaUrl = result[0].media_link;
    const bucketName = process.env.AWS_BUCKET_NAME;
    const mediaKey = path.basename(mediaUrl);

    // Delete the file from S3
    const params = {
      Bucket: bucketName,
      Key: mediaKey
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    // Delete the entry from the database
    const sql = 'DELETE FROM media WHERE id = ?';
    await pool.query(sql, [id]);

    res.status(200).json({ message: 'Media deleted successfully!' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).send('Server error deleting media');
  }
});


router.get('/media/athlete-coach', async (req, res) => {
  const { athlete_id, coach_id, type } = req.query;
  console.log(athlete_id, coach_id, type);
  try {
    const [result] = await pool.query(
      'SELECT * FROM media WHERE athlete_id = ? AND type = ?',
      [athlete_id,type]
    );

    if (result.length > 0) {
      const signedMedia = await Promise.all(
        result.map(async (media) => {
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: media.title
          };

          try {
            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 });
            return {
              media_id: media.id,
              type: media.type,
              id: media.id,
              name: media.title,
              signedUrl: url
            };
          } catch (error) {
            console.error('GET Error generating signed URL from S3:', error);
            return {
              ...media,
              signedUrl: null,
              error: 'Error generating signed URL'
            };
          }
        })
      );
      res.status(200).json(signedMedia);
    } else {
      res.status(404).send('No media found for this athlete and coach');
    }
  } catch (error) {
    console.error('Error retrieving media data:', error);
    res.status(500).send('Server error retrieving media data');
  }
});

module.exports = router;
