// awsS3_upload.js
require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { fromEnv } = require('@aws-sdk/credential-provider-env');
const fs = require('fs');
const path = require('path');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv()
});

const uploadMedia = async (bucketName, mediaPath, mediaName) => {
    try {
      const mediaFile = fs.readFileSync(mediaPath);
      const ext = path.extname(mediaName).toLowerCase();
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
          contentType = 'application/octet-stream';
      }

      console.log(`Uploading file with content type: ${contentType}`); // Log content type

      const params = {
        Bucket: bucketName,
        Key: mediaName,
        Body: mediaFile,
        ContentType: contentType
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
      console.log('Media uploaded successfully:', `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${mediaName}`);

      // Return the S3 object key or URL
      return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${mediaName}`;
    } catch (err) {
      console.error('Error uploading media:', err);
      throw err;
    }
};

module.exports = { uploadMedia };
