const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware
const { uploadMedia } = require('./awsS3_upload'); 

const app = express();
const port = process.env.PORT || 3000;

// Use the cors middleware
app.use(cors());

// Ensure the uploads directory exists within the services directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const upload = multer({ dest: uploadsDir });

// Test endpoint
app.get('/test', (req, res) => {
  res.send('Server is working');
});

// Upload endpoint
app.post('/upload', (req, res, next) => {
  console.log('Request received at /upload');
  next();
}, upload.single('file'), async (req, res) => {
    console.log('Processing upload');
    try {
      const file = req.file;
      if (!file) {
        console.log('No file uploaded.'); // Log if no file is uploaded
        return res.status(400).send('No file uploaded.');
      }

      console.log('(backend) File received:', file.originalname, file.mimetype); // Log original name and MIME type

      const mediaPath = file.path; // Use the file path directly
      console.log('Media path:', mediaPath); // Log the media path

      if (!fs.existsSync(mediaPath)) {
        console.log('File does not exist at path:', mediaPath);
        return res.status(500).send('File does not exist.');
      }

      const mediaName = file.originalname;

      const bucketName = 'solo-media-bucket-test'; // replace with your bucket name
      const mediaUrl = await uploadMedia(bucketName, mediaPath, mediaName);

      fs.unlinkSync(mediaPath);

      res.send({ mediaUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file.');
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
