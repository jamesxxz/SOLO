// TODO: grab media from frontend to store 

// works w/ command line
// COMMAND LINE: node services/awsS3.js your_s3_bucket_name /path/to/your/video/file_name.ext file_name.ext
require('dotenv').config({ path: './services/.env' });
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
console.log('AWS_REGION:', process.env.AWS_REGION);

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Initialize the S3 client
const s3 = new AWS.S3();

// Function to upload a video file to S3
const uploadVideo = (bucketName, videoPath, videoName) => {
  // Read the video file
  const videoFile = fs.readFileSync(videoPath);

  // Determine the content type based on the file extension
  const ext = path.extname(videoName).toLowerCase();
  let contentType;

  switch (ext) {
    case '.mp4':
      contentType = 'video/mp4';
      break;
    case '.mov':
      contentType = 'video/quicktime';
      break;
    case '.m4v':
      contentType = 'video/x-m4v';
      break;
    case '.avi':
      contentType = 'video/x-msvideo';
      break;
    case '.mkv':
      contentType = 'video/x-matroska';
      break;
    default:
      contentType = 'application/octet-stream'; // fallback type
  }

  // Prepare the parameters for the S3 upload
  const params = {
    Bucket: bucketName,
    Key: videoName,
    Body: videoFile,
    ContentType: contentType
  };

  // Upload the video to S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading video:', err);
    } else {
      console.log('Video uploaded successfully:', data.Location);
    }
  });
};

// TODO: retrieve from frontend
// Check if the required command-line arguments are provided
if (process.argv.length !== 5) {
  console.log('Usage: node uploadVideo.js <bucketName> <videoPath> <videoName>');
  process.exit(1);
}

// Retrieve command-line arguments
const bucketName = process.argv[2];
const videoPath = process.argv[3];
const videoName = process.argv[4];

// Call the uploadVideo function
uploadVideo(bucketName, videoPath, videoName);
