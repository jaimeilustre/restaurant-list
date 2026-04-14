# Restaurant List Take Home Assignment

# Backend
- Language: Javascript
- Framework: Express

# Frontend
- Languages: Javascript, CSS, and HTML
- Library: React

## Steps to run the app locally
1. Fork this repo and clone it.
2. Navigate to this directory and run the following code:
    ``` bash

    npm install // to install dependencies needed for this project
    code .
    ```
3. Navigate to the server/ directory and run npm install again to install relevant dependencies for the backend.
  	``` bash

    cd server
	npm install
    ```
4. Create then a `.env` file in the and add the following environment variables with your local port and origin of choice and the API endpoint:
    ``` bash
    // .env

    PORT=8080
    FRONTEND_URL=http://localhost:5173 // we will be using Vite later to build the foundation of the frontend so the default port is 5173
	API_URL = "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/"
    ```
4. Once done, do the same in the client/ directory:
    ``` bash

    cd ../client
	npm install
    ```
5. For the `.env` file in the client/ directory, add the backend URL for the frontend to access:
	``` bash
    // .env

    VITE_BACKEND_URL=http://localhost:8080/restaurants/
    ```
6. Once done, go back to the root of this repository and run the following command:
	``` bash

    npm run dev
    ```
   To interact with my interface, go to your browser (preferably Google Chrome as this was what I used to test this) and input the frontend URL, in this case it would be:
   
   localhost:5173

7. Should for example it complains that nodemon cannot be found, navigate to the package.json file in the server/ directory and change the script to run node instead:
	``` bash
	// server/package.json

	"scripts": {
    "tests": "vitest",
	"dev": "nodemon server.js" // change this to => "node server.js"
  	},
    ```

## Steps to build and compile the web application


