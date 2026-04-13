import express from 'express';
import cors from 'cors';

// 1st commit
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

app.get('/restaurants/:postcode', (req, res) => {
	res.status(200).json({});
})


export default app;