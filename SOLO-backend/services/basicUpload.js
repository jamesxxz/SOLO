const AWS = require("aws-sdk");
const
s3 = new AWS.S3();
(async () => {
    await s3
        .putObject({
            Body: "hello world",
            Bucket: "wdj-my-uploads",
            Key: "my-file.txt",
        },
            promise());
})();
