const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
    if (req.headers["authorization"] === undefined ) {
        res.sendStatus(403);
        return;
    }
    const bearerHeader = req.headers["authorization"];
    const jwtToken = bearerHeader.split(" ")[1];

    jwt.verify(jwtToken, process.env.JWT_SECRET, (error, tokenData) => {
        if (error) {
            res.sendStatus(403);
            return;
        } else {
            req.gameSession = tokenData.payload;
            next();
        }
    })
}

module.exports = verifyToken;