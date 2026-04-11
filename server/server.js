const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 8080;

const FRONTEND_URL = "http://localhost:3000"; // Change later when deployed

// For testing later once frontend is setup
app.use(
	cors({
		origin: [FRONTEND_URL]
	})
);

app.get('/', (req, res) => {
	res.send("Testing 1, 2, 3");
});

app.listen(PORT, () => {
	console.log(`Server running on localhost:${PORT}`);
})