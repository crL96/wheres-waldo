const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

async function attemptPost(req, res) {
    const charAttempt = req.body.character.toLowerCase();

    const charCorrect = await prisma.character.findUnique({
        where: { name: charAttempt }
    });

    if (!charCorrect) {
        res.status(404).json({ message: "invalid character" });
        return;
    }

    if ( //Check if guess is in correct X range
        !(
            req.body.x > charCorrect.minX &&
            req.body.x < charCorrect.maxX
        )
    ) {
        res.json({ correct: false, message: "Incorrect guess, try again" });
        return
    }

    if ( //Check if guess is in correct Y range
        !(
            req.body.y > charCorrect.minY &&
            req.body.y < charCorrect.maxY
        )
    ) {
        res.json({ correct: false, message: "Incorrect guess, try again" });
        return
    }

    // Guess must be correct, return success
    res.json({ correct: true, message: "Correct!" });
}

function startGameGet(req, res) {
    const payload = {
        id: crypto.randomUUID(),
        issuedAt: Date.now(),
        charactersLeft: ["waldo", "odlaw", "wizard"]
    }

    jwt.sign({payload}, process.env.JWT_SECRET, (error, token) => {
        res.json({
            token: "Bearer " + token
        })
    });    
};

module.exports = {
    attemptPost,
    startGameGet,
}
