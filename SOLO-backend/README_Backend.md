# Services
AWS services have been setup. Follow instructions for .env

## AWS S3
Using AWS S3 for scalable media storage. Basic instructions.

### .env setup
1. Set up .env file inside this services folder to connect with S3 instance 
2. Get your user's AWS access key id, key, and region
    * **Access Key ID and Secret Access Key**
        * (Root user) [AWS console](https://aws.amazon.com/console/): Log in to the AWS Management Console. In the top-right corner, click on your account name or number, then select "My Security Credentials." Under "Access keys for CLI, SDK, & API access," click "Create New Access Key."Download the key file or copy the Access Key ID and Secret Access Key from the displayed information.
        * (Everyone else that has been given access from root user) Root user will log in to the AWS Management Console. Navigate to the IAM dashboard. Select "Users" from the navigation pane. Choose the user for whom you want to create access keys (or create a new user if necessary). Under "Security credentials," click "Create access key." Download the key file or copy the Access Key ID and Secret Access Key.
    * **Region**
        * (Root user) The region refers to the geographical location of your AWS resources. You can find the region name in the AWS Management Console, typically displayed in the top-right corner next to your account name. The region code is a string like *us-west-2, eu-central-1*, etc. You can select the appropriate region based on where your S3 bucket is located.
    * **Bucket Name**
        * Name of the bucket in the console. There should not be any spaces or capital letters. (ex. test-bucket instead of Test Bucket)
3. Fill in your info into these variables
    ```
        AWS_ACCESS_KEY_ID = id
        AWS_SECRET_ACCESS_KEY = key
        AWS_REGION = region
        AWS_BUCKET_NAME = bucket name
    ```

### If there are permissions/connection issues 
1. (Root user) Log in to the [AWS console](https://aws.amazon.com/console/).
2. Navigate to the IAM Service: In the AWS Management Console, type "IAM" in the search bar and select the IAM service from the dropdown.
3. Select the User that needs to connect to S3 bucket. 
4. In the user's or role's summary page, scroll down to the "Permissions" tab. 
5. Click 'Add permissions' dropdown. Choose 'Create inline permissions'
6. Make sure these basic policies are added. These are the ones I added (configured on 04/18/2024).
    ```
        {
            "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "Statement1",
                        "Effect": "Allow",
                        "Action": [
                            "s3:PutObject",
                            "s3:GetObject",
                            "s3:ListBucket",
                            "s3:ListAccessPoints",
                            "s3:GetBucketLogging",
                            "s3:GetBucketNotification",
                            "s3:GetObjectAttributes"
                        ],
                        "Resource": [
                            "arn:aws:s3:::YOUR_BUCKET_NAME",
                            "arn:aws:s3:::YOUR_BUCKET_NAME/*"
                        ]
                    }
                ]
        }
    ```
7. Hit confirm. Name the policy properly. User should be able to connect now. 

* (NOTE) For every user that needs to connect, add this permission to their permissions (steps 1-4).  This time you can just search the permisson name to add it. No need to follow steps 5-7.
* (OPTIONAL) to verify that the bucket permissions are added, run this command in the AWS CLI ```aws s3 ls```. Your bucket name should show up as the result. 

## AWS RDS
In the same .env file, add the MySQL configurations to connect to the database. 
1. DB_HOST - This is the endpoint of your AWS RDS instance. You can find this information in the RDS dashboard under the "Connectivity & security" tab as the "Endpoint".

2. DB_USER - This is the username you created for your database. If you are using the default master user, this information was set up during the RDS instance creation process.

3. DB_PORT - This is the port used by the MySQL database, which is typically set to 3306. This is found under the the endpoint.

4. DB_PASSWORD - This is the password for your database user. This is set when you created the database is created.

5. DB_NAME - This is the name of the database to which you want to connect. This is the database name you specified when setting up the RDS instance.

    ```
    DB_HOST = endpoint
    DB_USER = user
    DB_PORT = port
    DB_PASSWORD = password
    DB_NAME = database name
    ```

### Issues connecting to MySQL
Ensure that that RDS instance is configured to allow connections from the app's IP address. This can be set in the RDS instance's security group settings. It could also be the region. Check with sponsors.