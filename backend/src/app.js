const express = require("express");

const app = express();

//App Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ alive: true })
});

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => console.log("Server running on port: " + PORT));