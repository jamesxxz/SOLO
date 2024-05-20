// UPLOAD media to AWS S3 bucket

// TODO: grab media from frontend to store 

// works w/ command line
// COMMAND LINE:
// cd SOLO-backend
// node services/awsS3.js your_s3_bucket_name /path/to/your/video/file_name.ext file_name.ext

require('dotenv').config({ path: './services/.env' });
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);
console.log('AWS_REGION:', process.env.AWS_REGION);

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { fromEnv } = require('@aws-sdk/credential-provider-env');
const fs = require('fs');
const path = require('path');

// Initialize the S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv()
});

// Function to upload a media file to S3
const uploadMedia = async (bucketName, mediaPath, mediaName) => {
  try {
    // Read the media file
    const mediaFile = fs.readFileSync(mediaPath);

    // Determine the content type based on the file extension
    const ext = path.extname(mediaName).toLowerCase();
    let contentType;

    switch (ext) {
      // Video formats
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
      // Image formats
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.bmp':
        contentType = 'image/bmp';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.tiff':
      case '.tif':
        contentType = 'image/tiff';
        break;
      case '.ico':
        contentType = 'image/x-icon';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
      case '.heic':
        contentType = 'image/heic';
        break;
      default:
        contentType = 'application/octet-stream'; // fallback type
    }

    // Prepare the parameters for the S3 upload
    const params = {
      Bucket: bucketName,
      Key: mediaName,
      Body: mediaFile,
      ContentType: contentType
    };

    // Upload the media to S3
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
    console.log('Media uploaded successfully:', `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${mediaName}`);
  } catch (err) {
    console.error('Error uploading media:', err);
  }
};

// TODO: retrieve from frontend
// Check if the required command-line arguments are provided
if (process.argv.length !== 5) {
  console.log('Usage: node uploadMedia.js <bucketName> <mediaPath> <mediaName>');
  process.exit(1);
}

// Retrieve command-line arguments
const bucketName = process.argv[2];
const mediaPath = process.argv[3];
const mediaName = process.argv[4];

// Call the uploadMedia function
uploadMedia(bucketName, mediaPath, mediaName);

