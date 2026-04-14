# Restaurant List Take Home Assignment

# Backend
- Language: Javascript
- Framework: Express
- Testing: Vitest and Supertest

# Frontend
- Languages: Javascript, CSS, and HTML
- Library: React
- Testing: Vitest and React Testing Library

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

## Let's start with the backend
1. Once you created your git repository, create a server directory and navigate into it:
	``` bash

    mkdir server
	cd server
    ```

2. Initialize NPM with the following code:
	``` bash

	npm init -y
    ```

3. Install the relevant dependencies. In this case, it would be:
	``` bash

	npm install express cors axios dotenv
    ```

4. Install as well the following dependencies for the testing later:
	``` bash

	npm install -D vitest supertest
    ```

5. Enable ES modules in the package.json file:
	``` bash
	// package.json
	
	"name": "server",
  	"version": "1.0.0",
  	"description": "",
  	"type": "module", => ADD THIS
  	"main": "server.js",
	```

6. Create an app.js file and import the dependencies you previously installed
	``` bash
	// app.js

	import express from 'express';
	import cors from 'cors';
	import axios from 'axios';

	const app = express();

	export default app;
	```
7. Create the first route to test your server. An example could be:
    ``` bash
    // app.js
    // ...
    
    app.get("/", (req, res) => {
        res.send("Testing 1, 2, 3")
    })
    ```
8. Start the server with your port of choice:
    ``` bash
    // app.js
    // ...
    
    app.listen(8080, () => console.log(`Server running on localhost:8080`))
    ```
9. Once everything is working, proceed with the app with all the requirements you need to satisfy. In this case, we need to bypass the CORS restrictions from the public API.

10. Create a seperate server.js file to seperate the logic from running the server and move the PORT and listening log to it:
	``` bash
	import app from './app.js';
	import dotenv from 'dotenv';

	dotenv.config();

	const PORT = 8080;

	app.listen(8080, () => {
  		console.log(`Server running on localhost:8080`);
	});
	```

11. Create a `.env` file in the root folder and add the following environment variables with your local port and origin:
    ``` bash
    // .env

    PORT=8080
    FRONTEND_URL=http://localhost:5173
	API_URL = "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/"
    ```

12. Once this `.env` file is created, to access these environment variables, run the following code:
    ``` bash
    
    const FRONTEND_URL = process.env.FRONTEND_URL => write in app.js
    const PORT = process.env.PORT || 8080 => write in server.js
    ```
    This does the following:
    - Using `process.env` allows access to these variables
    - Using the `||` logical operator, it allows us to set a default value if there is an issue accessing the environment variables
    
    With the new PORT variable, replace port `8080` with this in the `app.listen()`. It should look like this:
    ``` bash
    // server.js
    // ...

    app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))
    ```

13. This next step is IMPORTANT. By default, a `.gitignore` file is not created when setting up this Express server. This `.gitignore` allows us to tell Git which files to ignore when committing. In our case, we need to ignore the `node_modules` and the `.env`. This can be done by creating a `.gitignore` file in the root folder with the following code:
    ``` bash
    // .gitignore
    // ...

    # Dependency directories
    node_modules/

    # Debug log from npm
    npm-debug.log

    # Environment Variables should NEVER be published
    .env

    # macOS
    .DS_Store
    .AppleDouble
    .LSOverride

    # Windows
    Thumbs.db
    Thumbs.db:encryptable
    ehthumbs.db
    *.lnk


    # VS Code
    .vscode/*
    ```

14. To set up CORS, run the following code:
    ``` bash
    // app.js
    // ...
    
    app.use(
    	cors({
        	origin: [FRONTEND_URL],
    	})
    )
    ```
    This does the following:
    - This specifies the requests from specific origins, which in this case would be our `FRONTEND_URL` variable that we created in the previous steps. This means that only the application hosted at this `FRONTEND_URL` is allowed access.
    - Alternatively, by leaving CORS blank, this would mean that any frontend domain can have access, which is not ideal for security reasons.

15. Create a `GET` route to handle requests to the path `"/restaurants/:postcode"` with postcode as a URL parameter. This can be done like this:
    ``` bash
    // app.js
    // ...
    
    app.get('/restaurants/:postcode', async (req, res) => {
		const apiUrl = process.env.API_URL;
		const { postcode } = req.params;
	
		try {
			const response = await axios.get(`${apiUrl}${postcode}`);
			res.json(response.data);
		} catch (err) {
			res.status(500).json({ message: "Error getting postcode" });
		}
	})
    ```
    The following is achieved with this piece of code:
    - Using `req.params`, the postcode is extracted from the URL parameters.
    - The API URL is then constructed to query restaurant data based on the postcode using the Just Eat API
    - Using axios, it then makes a `GET` request. If successful, the client then receives a JSON response from the API. If not susccessful, it logs the error and sends a 500 status with a JSON response indicating an error.

16. With this project, I decided to use a Test Driven Development approach, where I would write tests that intentionally fail and write the logic after to pass those tests. I have stored all the tests in a seperate app.test.js file as shown below:
	```bash
	// app.test.js

	import app from './app.js';
	import request from 'supertest';
	import { describe, it, expect, vi } from 'vitest';
	import axios from 'axios';

	vi.mock('axios' , () => ({
		default: {
			get: vi.fn()
		}
	}));

	describe ('GET /restaurants/:postcode', () => {
		it('Return 200 when successful', async () => {
			const res = await request(app).get('/restaurants/EC4M7RF');
			expect(res.statusCode).toBe(200);
		})

		it ('Return restaurants array', async () => {
			const res = await request(app).get('/restaurants/EC4M7RF');
			expect(res.body).toHaveProperty('restaurants');
		})

		it ('Return restaurant data for 1 restaurant', async () => {
			axios.get.mockResolvedValue({
				data: {
					restaurants: [{ name: 'Test' }]
				}
			});

			const res = await request(app).get('/restaurants/EC4M7RF');
			expect(res.body.restaurants.length).toBe(1);
		})

		it ('Return 500 when API call fails', async () => {
			axios.get.mockRejectedValue(new Error('API failed'));
			const res = await request(app).get('/restaurants/EC4M7RF');
			expect(res.statusCode).toBe(500);
			expect(res.body.message).toBe('Error getting postcode');
		})
	});
	```

17. To run the tests above, since the relevant test dependencies have been installed earlier, the remaining thing to do is navigate to the package.json file and under "scripts", add your test script and feel free to name it to your liking:
	```bash
	// package.json

	"scripts": {
    	"tests": "vitest", => ADD THIS
		"dev": "nodemon server.js"
  	},
	```

## Now let's move to the frontend.

1. Go back to the root of the repository and now create a client directory and navigate into it:
	```bash
	
	mkdir client
	cd client
	```

2. Create a React app using Vite:
	```bash
	
	npm create vite@latest

	// Follow the prompts:
	Select React
	Selet Javascript
	```

3. Run the following command to install dependencies and additional dependencies:
	```bash

	npm install
	npm install axios react-router-dom
	```

4. To see the default created React app, run the following command:
	```bash

	npm run dev
	```

5. Navigate to the `main.jsx` file in the root folder and import `BrowserRouter` from `react-router-dom`. Once imported, wrap it around the `App` component: It should look like this:
    ``` bash
    // main.jsx
    // ...

    import { BrowserRouter } from 'react-router-dom';

	createRoot(document.getElementById('root')).render(
  		<StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
  		</StrictMode>,
	)
    ```
    By doing this, we allow client-side routing within the React application, where dynamic updates can happen without having the page to fully reload.

6. This completes the basic setup for the react app. From here onwards, proceed with the app with all the requirements you need. In this specific case, this is outlined in the following steps.

7. In the root folder, create a new folder called `pages`. This will allow us to store pages that we create for the React app. In this case, create two pages, one called `RestaurantListPage.jsx` to display the list of restaurants by postcode, and one called `HomePage.jsx` which displays a search bar where we can type the postcode we want to search. For the initial setup of the page, you can use the following code:
    ``` bash
    // .src/pages/RestaurantListPage.jsx
    // ...

    function RestaurantListPage() {
        return(
            <h1>List of restaurants</h1>
        )
    }
    
    export default RestaurantListPage
    ```
    ``` bash
    // .src/pages/RestaurantListPage.jsx
    // ...

    function HomePage() {
        return(
            <h1>Home Page</h1>
        )
    }
    
    export default HomePage
    ```
    Please note that this is done just to check if the pages are working on the browser with their respective paths for the next step.
    

8. Navigate to the `App.jsx` then import `Route` and `Routes` from `react-router-dom` to set up routes within our React app. Once imported, create the routes you need. In this case, we need two routes for the two pages we created in the previous step. The following code should look like this:
    ``` bash
    // App.jsx
    // ...

    import { Route, Routes } from 'react-router-dom'
    import RestaurantListPage from './pages/RestaurantListPage'
    import HomePage from './pages/HomePage'
    //...

    return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurants/:postcode" element={<RestaurantListPage />} />
        </Routes>
    </>
    )
    ```
    Note here as well both pages were also imported. Please test the pages and the paths to ensure everything is working before proceeding to the next steps.

9. Create an `.env` file in the root folder and create the following environment variable:
    ``` bash
    // .env
    // ...

    VITE_BACKEND_URL=http://localhost:8080/restaurants/
    ```
    Please note that your server may be running in a different port, so feel free to adjust the port number as needed.

    IMPORTANT: Add the `.env` file in the `.gitignore` file that is already present in the root folder to prevent committing this file to Git. This is what it would look like:
    ``` bash
    // .env
    // ...

    node_modules
    dist
    dist-ssr
    *.local

    .env
    ```

10. Navigate to the `RestaurantListPage.jsx` to begin constructing the page to display the list of restaurants. First, we can begin by creating the state variable for the restaurant. This is what it would look like:
    ``` bash
    // .src/pages/RestaurantListPage.jsx
    // ...

    const [restaurants, setRestaurants] = useState(null)
    ```

    This does the following:
    - This uses the `useState` hook that allows functional components to manage state.
    - A state variable `restaurants` is declared and the function `setRestaurants` is used to update the variable.
    - The initial state is set to null.

11. Next thing to do is create the `GET` request for the restaurant data using the Express server we created to request the data from the Just Eat API. This is what it would look like:
    ``` bash
    // .src/pages/RestaurantListPage.jsx
    // ...

    const { postcode } = useParams(null);

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	const getRestaurants = async () => {
		try {
			const res = await axios.get(`${backendUrl}${postcode}`);
			setRestaurants(res.data.restaurants.slice(0, 10));
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getRestaurants();
	}, [])
    ```
    This does the following:
    - Using `useParams`, the postcode is extracted from the URL parameters.
    - The environment variable `VITE_API_URL` is then accessed using `import.meta.env`
    - Using axios, it then makes a `GET` request to the API endpoint specified. If successful, then the `try` block is executed. 
        - This block uses the function we created earlier `setRestaurants` where the parameter `response.data.restaurants` is used to update our state variable with the list of restaurants from the API response.
        - `.slice(0, 10)` is then added at the end to select the first 10 restaurants.
    - If not successful, then the `catch` block is executed where the error and error message is logged to the console.
    - The `useEffect` hook is then used to optionally perform side effects. The function `getApiData` (which is whwere we saved our `GET` request) is called within this hook. The dependency array `[]` is left empty in this case, which means it will only run once after the component is mounted.