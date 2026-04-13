import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

const FRONTEND_URL = "http://localhost:5173"; // Change later when deployed

// For testing later once frontend is setup
app.use(
	cors({
		origin: [FRONTEND_URL]
	})
);

app.get('/', (req, res) => {
	res.send("Testing 1, 2, 3");
});

app.get('/restaurants/:postcode', async (req, res) => {
	// res.status(200).json({
	// 	restaurants: [{name: "Test"}]
	// });
	// const apiUrl = "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/";
	// const { postcode } = req.params;
	
	// const response = await axios.get(`${apiUrl}${postcode}`);
	// res.json(response.data);

	const apiUrl = "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/";
	const { postcode } = req.params;
	
	try {
		const response = await axios.get(`${apiUrl}${postcode}`);
		res.json(response.data);
	} catch (err) {
		res.status(500).json({ message: "Error getting postcode" });
	}
})


export default app;