const express = require("express");
const cors = require("cors");
const gameRouter = require("./routes/gameRoute");

const app = express();

//App Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({ alive: true })
});
app.use("/game", gameRouter);

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => console.log("Server running on port: " + PORT));