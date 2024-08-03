# SOLO
React Ionic app. Relevant directories: 
* SOLO-frontend
* SOLO-backend

__Note:__ The rest of the directories are in Swift. They do not have the backend developed and the frontend is incomplete. 

## AWS services used
* EC2 - to deploy app
* RDS - MySQL database
* S3 - to store media

## Frontend setup
1. Go into frontend folder ```cd SOLO-frontend```
2. Download dependencies ```npm i``` or ```npm install --legacy-peer-deps```

## Backend setup
1. Read __SOLO-backend/services/SERVICES.md__ to set up .env
2. Go into frontend folder ```cd SOLO-backend```
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

