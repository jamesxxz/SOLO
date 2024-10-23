# SOLO
React Ionic app. Relevant directories: 
* SOLO-frontend
* SOLO-backend

__Note:__ The rest of the directories are in Swift. They do not have the backend developed and the frontend is incomplete. 

## AWS services used
* EC2 - to deploy app
* RDS - MySQL database
* S3 - to store media
  
## Cloning the Repo
1. Go into your desired project folder and clone the repo: ```git clone https://github.com/hannahnh/SOLO.git```
2. Go into the SOLO project repo ```cd SOLO```
   
## Frontend setup
1. Go into frontend folder ```cd SOLO-frontend```
2. Download dependencies
3. ```
   npm cache clean --force
      rm -rf node_modules package-lock.json
      npm install
      npm install --legacy-peer-deps
     ```
    if needed:
     ```npm install --legacy-peer-deps```
## Backend setup
1. Read __SOLO-backend/services/SERVICES.md__ to set up .env
2. Go into backend folder in a separate terminal ```cd SOLO-backend```
3. Download dependencies
   ``` 
    git init
    npm uninstall husky
    npm install husky --save-dev
    npx husky install
    npm i
    ```

## Running the app
### via web browser
* Run Backend ```npm run start```
* Run Frontend ```ionic serve```

### via IOS Simulator
* Run Backend ```npm run start```
* Run Frontend 
    ``` 
    npm run build
    npx cap copy
    npx cap sync
    npx cap open ios
    npx cap run ios
    ```

