import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

const FRONTEND_URL = "http://localhost:5173"; // Change later when deployed

// For testing later once frontend is setup
app.use(
	cors({
		origin: FRONTEND_URL,
	})
);

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

export default app;