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
3. Navigate to the `server` directory and run npm install again to install relevant dependencies for the backend.
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
4. Once done, do the same in the `client` directory:
    ``` bash

    cd ../client
	npm install
    ```
5. For the `.env` file in the `client` directory, add the backend URL for the frontend to access:
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

7. Should for example it complains that nodemon cannot be found, navigate to the `package.json` file in the `server` directory and change the script to run node instead:
	``` bash
	// server/package.json

	"scripts": {
    "tests": "vitest",
	"dev": "nodemon server.js" // change this to => "node server.js"
  	},
    ```

## Steps to build and compile the web application

## Let's start with the backend
1. Once you created your git repository, create a `server` directory and navigate into it:
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

6. Create an `app.js` file and import the dependencies you previously installed
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

10. Create a seperate `server.js` file to seperate the logic from running the server and move the PORT and listening log to it:
	``` bash
	// server.js

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

	import dotenv from 'dotenv';
	dotenv.config();

	// ...
    
    app.get('/restaurants/:postcode', async (req, res) => {
		const apiUrl = process.env.API_URL;

		if (!apiUrl) {
  			throw new Error("API_URL is not set");
		};

		const { postcode } = req.params;
	
		try {
			const response = await axios.get(`${apiUrl}${postcode}`);
			res.json(response.data);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ message: "Error getting postcode" });
		}
	})
    ```
    The following is achieved with this piece of code:
    - Using `req.params`, the postcode is extracted from the URL parameters.
    - The API URL is then constructed to query restaurant data based on the postcode using the Just Eat API
    - Using axios, it then makes a `GET` request. If successful, the client then receives a JSON response from the API. If not susccessful, it logs the error and sends a 500 status with a JSON response indicating an error.

16. With this project, I decided to use a Test Driven Development approach, where I would write tests that intentionally fail and write the logic after to pass those tests. I have stored all the tests in a seperate `app.test.js file` as shown below:
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

17. To run the tests above, since the relevant test dependencies have been installed earlier, the remaining thing to do is navigate to the `package.json` file and under `"scripts"`, add your test script and feel free to name it to your liking:
	```bash
	// package.json

	"scripts": {
    	"tests": "vitest", => ADD THIS
		"dev": "nodemon server.js"
  	},
	```

## Now let's move to the frontend.

1. Go back to the root of the repository and now create a `client` directory and navigate into it:
	```bash
	
	mkdir client
	cd client
	```

2. Create a React app using Vite:
	```bash
	
	npm create vite@latest

	// Follow the prompts:
	Select React
	Select Javascript
	```

3. Run the following command to install dependencies and additional dependencies:
	```bash

	npm install
	npm install axios react-router-dom
	npm install --save-dev @testing-library/react @testing-library/dom @testing-library/jest-dom
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
    // .src/pages/HomePage.jsx
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

	if (!backendUrl) {
  		throw new Error("VITE_BACKEND_URL is not set");
	};

	const getRestaurants = async () => {
		try {
			const res = await axios.get(`${backendUrl}${postcode}`);
			setRestaurants(res.data.restaurants.slice(0, 10));
		} catch (err) {
			console.log(err.message);
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

12. After that, we can start rendering the data on our frontend with the following code:
    ``` bash
    // .src/pages/RestaurantListPage.jsx
    // ...

    return (
		<>
			{!restaurants
				? <p>Loading...</p>
				: restaurants.map(restaurant => {
					return (
						<div className="restaurant-card" key={restaurant.id}>
							<div className="restaurant-info">
								<h2>{restaurant.name}</h2>
								<h3>{restaurant.cuisines?.map(c => c.name).join(', ')}</h3>
								<h3>
									<img className="rating-logo" src={star} alt="text" />
									<span>{parseFloat(restaurant.rating?.starRating)}</span>
								</h3>
							</div>

							<div className="restaurant-address">
								<h3>{restaurant.address?.firstLine}</h3>
								<h3>{restaurant.address?.postalCode}</h3>
								<h3>{restaurant.address?.city}</h3>
							</div>
							
						</div>
					)
				})
			}
		</>
	)
    ```
    This does the following:
    - A conditional render is created where if the state variable `restaurants` is empty, then a message `"Loading..."` is then displayed. 
    - If `restaurants` does have data, then the `.map()` method is then used to create a new array of restaurants with the information of your choice. As each restaurant is an object, we can use dot notation to access the object keys and values.
        - Using the requirements for this assignment, we are able to display the restaurant name, cuisines, rating, and address.
        - For the cuisines, as the values are stored in an array, we then use the `.map()` method again to create a new array for the cuisines. Using `.join(', ')` at the end, we can then display these cuisines next to each other with a space and comma in between.
        - For the rating, a star logo is added next to the rating number to make it look more realistic and for the rating number, `parseFloat()` is added to ensure that the number is properly rendered as a number and not a string.

13. Please check that everything is working on this page before proceeding with the `HomePage.jsx`.

14. Navigate to the `HomePage.jsx` to begin constructing the page with the search bar. First, like before, we can start by creating the state variables. This is what it would look like:
    ``` bash
    // .src/pages/HomePage.jsx
    // ...

    const [searchPostcode, setSearchPostcode] = useState('')
    const [validPostcode, setValidPostcode] = useState(true)
    ```
    This does the following:
    - The first `useState` hook declares a `searchPostcode` variable with its respective function to update its values. This is where we store the postcode we type in the search bar. Its initial value is set as an empty string
    - The second `useState` hook declares a `validPostcode` variable with its respective function to update its values. More will be explained later, but this is where we would store whether the postcode entered is a valid UK one (true) or not (false). Its initial value is set to true.

15. Next thing to do is to create a search handler to handle what happens when we click the search button. This is what it would look like:
    ``` bash
    // .src/pages/HomePage.jsx
    // ...
    
    const navigate = useNavigate()

    const searchHandler = (e) => {
        setSearchPostcode(e.target.value)
    }

    const postcodeRegEx = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i
  
    const searchButtonHandler = () => {
        if (searchPostcode !== "") {
            if (postcodeRegEx.test(searchPostcode)) {
                navigate(`restaurants/${searchPostcode}`)
            } else {
                setValidPostcode(false)
                setTimeout(() => {
                    setValidPostcode(true)
                }, 1000)
            }
        } else {
            alert('Please enter a postcode')
        }
    }
    ```
    This does the following:
    - The first part is using the `useNavigate` hook to help us later with navigating to the restaurant list page once we hit search.
    - The next part is creating a search handler which is for the `onChange` in the `<input>` later in the rendering. The `e` is the event object and the `.target.value` retrieves the current value of the input field. In this case, it would be what we type in the search bar. This is then used as an argument for the function `setSearchPostcode` to update the state variable.
    - The next part is where we use a Regular Expression, or RegEx to check that the postcode is a valid UK format. This is what's stated:
        - `/^` Beginning of string
        - `[A-Z]{1,2}` One or two uppercase letters
        - `[0-9]` A single digit
        - `[A-Z0-9]?` An optional alphanumeric character
        - `''` A single space in between
        - `[0,9]` A single digit
        - `[A-Z]{2}` Two uppercase letters
        - `$` End of the string
        - `/i` Case insensitive
    - The next part is the `searchButtonHandler` function, which combines everything we discussed previously.
        - Starting with an `if` statement, we state that if the `searchPostcode` is not empty, and with a nested `if` statement, state that in addition, if the postcode is a valid postcode (`postcodeRegEx.test(searchPostcode)` is used to check the validity with our RegEx), then we navigate to the respective `RestaurantListPage.jsx`.
        - If not a valid postcode, we then update our `validPostcode` state variable to false and we use a `setTimeout()` to set the state variable back to true. This is done as later in the rendering part, a message will pop up briefly reminding to input a valid UK postcdode.
        - On the other hand, if the postcode field in the search bar is empty, then an alert on your browser will pop up stating to enter a postcode.

16. After that, we can start rendering the data on our frontend with the following code:
    ``` bash
    // .src/pages/HomePage.jsx
    // ...

	return (
		<div className="search-body">
			<h1 className="search-header">Search restaurants by postcode</h1>
			<div className="search-bar">
				<input
					type="text"
					value={searchPostcode}
					onChange={searchHandler}
					placeholder="Type postcode here"
				/>

				<button onClick={searchButtonHandler}>Search</button>
			</div>
			
			{!validPostcode && <p>Please enter a valid postcode</p>}
		</div>
	)
	```

	This does the following:
    - A restaurant header is displayed and below that will be the search bar. This is done by using an `<input>` element with the following information:
        - `type` specifies the type of input. In this case, it would be `"text"`.
        - `value` specifies the input itself. In this case, it would be our state variable `searchPostcode`.
        - `onChange` specifies the function that is called when the input changes. In this case, as mentioned in the previous step, it would be our `searchHandler` function.
        - `placeholder` specifies a piece of text you see in the search bar to help you. In this case, it would be `"Type postcode here"`.
    - A button is then created with `searchButtonHandler` as our event handler in the `onClick`.
    - Lastly, as mentioned previously, when the state variable `validPostcode` is set to false, a brief message pops up for one second to remind you to enter a valid UK postcode.

17. Please check that everything is working and if it is, congratulations, the app is officially done. Feel free to add some basic CSS to ensure that the data is displayed clearly.

18. Similar to the backend, I also used a Test Driven Development approach here, where I would write tests that intentionally fail and write the logic after to pass those tests. I have stored all the tests in a seperate `RestaurantListPage.test.jsx` and `HomePage.test.jsx` file as shown below:
	```bash
	// RestaurantListPage.test.jsx

	import { render, screen } from '@testing-library/react';
	import { describe, it, vi } from 'vitest';
	import '@testing-library/jest-dom';
	import RestaurantListPage from './RestaurantListPage';
	import axios from 'axios';
	import { MemoryRouter, Route, Routes } from 'react-router-dom';

	vi.mock('axios' , () => ({
		default: {
			get: vi.fn()
		}
	}));

	describe('Restaurant List Page', () => {
		it('Shows loading word to test async behaviour', () => {
			render(<RestaurantListPage />);
			expect(screen.getByText('Loading...')).toBeInTheDocument();
		});

		it('Render restaurant names from API', async () => {
			axios.get.mockResolvedValue({
				data: {
					restaurants: [
						{ id: 1, name: 'Test restaurant'}
					]
				}
			});
			render(<RestaurantListPage />);
			const restaurant = await screen.findByText('Test restaurant');
			expect(restaurant).toBeInTheDocument();
		});

		it('Fetch restaurants using inputted postcode', async () => {
			axios.get.mockResolvedValue({
				data: { restaurants: [] }
			});

			render(
				<MemoryRouter initialEntries={['/restaurants/EC4M7RF']}>
					<Routes>
						<Route path="/restaurants/:postcode" element={<RestaurantListPage />} />
					</Routes>
				</MemoryRouter>
			);

			await screen.findByText('Loading...');
			expect(axios.get).toHaveBeenCalledWith(
			expect.stringContaining('EC4M7RF')
			);
		});

		it('Render restaurant details', async () => {
			axios.get.mockResolvedValue({
				data: {
					restaurants: [
						{
							id: 1,
							name: 'Test restaurant',
							address: {
								city: 'London',
								firstLine: "1 Street",
								postalCode: "123"
							},
							rating: {
								starRating: 5,
								count: 100
							},
							cuisines: [{name: 'Italian'}]
						}
					]
				}
			});

			render(<RestaurantListPage />);
			expect(await screen.findByText('Test restaurant')).toBeInTheDocument();
			expect(screen.getByText('Italian')).toBeInTheDocument();
		});

		it('Display only 10 restaurants', async () => {
			const mockRestaurants = Array.from({ length: 12 }, (_, i) => ({
				id: 1,
				name: `Restaurant ${i}`
			}));

			axios.get.mockResolvedValue({
				data: { restaurants: mockRestaurants }
			});

			render(<RestaurantListPage />);
			const restaurants = await screen.findAllByText(/Restaurant/);
			expect(restaurants.length).toBe(10);
		});
	});
	```

	```bash
	// HomePage.test.jsx

	import { fireEvent, render, screen } from '@testing-library/react';
	import { describe, it, vi } from 'vitest';
	import '@testing-library/jest-dom';
	import { MemoryRouter } from 'react-router-dom';
	import HomePage from './HomePage';

	const mockNavigate = vi.fn();

	vi.mock('react-router-dom', async () => {
  		const actual = await vi.importActual('react-router-dom');

  	return {
    	...actual,
    	useNavigate: () => mockNavigate,
  	};
	});

	describe('Home page with search function', () => {
		it('Test input typing', () => {
			render(
				<MemoryRouter>
					<HomePage />
				</MemoryRouter>
			);
		
			const input = screen.getByPlaceholderText('Type postcode here');
			fireEvent.change(input, { target: { value: 'EC4M7RF'}});
			expect(input.value).toBe('EC4M7RF');
		});

		it('Navigate to restaurant list page when postcode is inputed', () => {
			render(
				<MemoryRouter>
					<HomePage />
				</MemoryRouter>
			);

			const input = screen.getByPlaceholderText('Type postcode here');
			const button = screen.getByText('Search');

			fireEvent.change(input, { target: { value: 'EC4M7RF'}});
			fireEvent.click(button);

			expect(mockNavigate).toHaveBeenCalledWith('restaurants/EC4M7RF');
		});

		it('Error when postcode input is empty', () => {
			window.alert = vi.fn();

			render(
				<MemoryRouter>
					<HomePage />
				</MemoryRouter>
			);

			fireEvent.click(screen.getByText('Search'));
			expect(window.alert).toHaveBeenCalledWith('Please enter a postcode');
		});

		it('Error when invalid postcode is inputted', () => {
			render(
				<MemoryRouter>
					<HomePage />
				</MemoryRouter>
			);

			const input = screen.getByPlaceholderText('Type postcode here');
			const button = screen.getByText('Search');

			fireEvent.change(input, { target: { value: '1234 AB'}});
			fireEvent.click(button);

			expect(screen.getByText('Please enter a valid postcode')).toBeInTheDocument();
		});
	})
	```
	
19. To run the tests above, since the relevant test dependencies have been installed earlier, the remaining thing to do is navigate to the `package.json` file and under `"scripts"`, add your test script and feel free to name it to your liking:
	```bash
	// package.json

  	"scripts": {
    	"dev": "vite",
    	"build": "vite build",
    	"lint": "eslint .",
    	"preview": "vite preview",
    	"tests": "vitest" => ADD THIS
  	},
	```

### OPTIONAL: A navbar can also be created to help navigate to the home page quickly and if interested, will be outlined in the next steps.

20. Create a navbar component by first creating a folder in your root folder called `components` and within that folder create a component called `Navbar.jsx`.

21. For a simple navbar using the company's logo, the following code should look like this:
    ``` bash
    // .src/components/Navbar.jsx
    // ...

    import { Link } from "react-router-dom"
    import companyLogo from "../assets/logo.png"

    function Navbar () {
        return (
            <nav className="navbar">
                <Link to="/">
                    <img className="company-logo" src={companyLogo} />
                </Link>
            </nav>

        )
    }

    export default Navbar
    ```
    This does the following:
    - `Link` from the `react-router-dom` is imported to help navigate to the home page when we click the logo.
    - A saved `companyLogo` is also imported for use later.
    - Under a `<nav>` tag, the `companyLogo` is used with `Link` wrapped around it with a specified path to navigate to the home page. This means that if you click the logo, it takes you to the home page.

22. The last step for the navbar is to navigate back to the `App.jsx` file and import it and render it to see it on your react app. It should look like this:
    ``` bash
    // App.jsx
    // ...

    import Navbar from './components/Navbar'

    function App() {

    return (
        <>

        <Navbar />

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurants/:postcode" element={<RestaurantListPage />} />
        </Routes>
        </>
    )
    ```

23. Lastly, rather than have two seperate terminals to run the server and frontend, you can install `concurrently`, which allows you run both of these in one terminal with one command. Make sure you navigate back to the root of this repository and then install it:
	```bash

	cd ..
	npm install -D concurrently
	```

24. Navigate to the root `package.json` file and add this to it (if file does not exist, do: `npm init -y`):
	```bash
	// package.json

	{
  	"scripts": {
    	"dev": "concurrently -n SERVER,CLIENT -c green,blue \"npm run dev --prefix server\" \"npm run dev 	--prefix client\""
  	}
	}
	```

25. Then, navigate to the `server/package.json` file and add this to the `"scripts"`:
	```bash
	// server/package.json

	{
  		"scripts": {
    		"dev": "nodemon server.js" // or "node server.js" if not using nodemon
  		}
	}
	```

26. Now, you can run both the server and frontend in one terminal with one command from the root:
	```bash

	npm run dev
	```

## Assumptions or things that were not clear
- The API returns valid data in a consistent format: a restaurants array with the information we need to display.
- Only 10 restaurants need to be shown.
- Users should input a valid UK postcode but later on, I decided to implement a basic postcode format validator to detect invalid formats.
- Basic error handling is sufficient for the scope of this project.
- CSS not necessarily needed but I still wanted to make it look presentable.

## Improvements for future development
### Frontend:
	- Create a filter function with the cuisines by either making a drop down menu to pick the cuisines of your choice or listing all the cuisines and making them clickable to filter your favourites.
	- Use a map to display the address of the restaurant since the coordinates are present in the API. This can be done by using a react map package or using Google Map's developer features.
	- Create a sorting function where you can sort the restaurants by their name or rating for example.
	- Make the app responsive for different devices.
	- If needed to display all the restaurants, implement pagination and infinite scrolling for large datasets.
### Backend:
	- Seperate route handling and other services into different files for better readability.
	- Add more unit and integration tests for potential other edge cases.
	- Improve error handling with more clear descriptions to better debug.
	- Use a middleware (maybe Morgan) to better debug and monitor the performance of the server with logging.
	- Introduce caching for repeated API calls to the same postcode to improve performance
