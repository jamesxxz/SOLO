const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS credentials
AWS.config.update({
  accessKeyId: 'your_access_key_id',
  secretAccessKey: 'your_secret_access_key',
  region: 'your_aws_region'
});

// Initialize the S3 client
const s3 = new AWS.S3();

// Function to upload a video file to S3
const uploadVideo = (bucketName, videoPath, videoName) => {
  // Read the video file
  const videoFile = fs.readFileSync(videoPath);

  // Prepare the parameters for the S3 upload
  const params = {
    Bucket: bucketName,
    Key: videoName,
    Body: videoFile,
    ContentType: 'video/mp4' // or the appropriate video format
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

// Replace the following variables with your actual values
const bucketName = 'your_s3_bucket_name';
const videoPath = '/path/to/your/video/file.mp4';
const videoName = 'file.mp4';

// Call the uploadVideo function
uploadVideo(bucketName, videoPath, videoName);