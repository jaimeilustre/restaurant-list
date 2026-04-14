import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

if (!FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not set");
};

app.use(
	cors({
		origin: [FRONTEND_URL],
	})
);

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

export default app;