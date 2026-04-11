const express = require("express");;
const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
	res.send("Testing 1, 2, 3");
});

app.listen(PORT, () => {
	console.log(`Server running on localhost:${PORT}`);
})