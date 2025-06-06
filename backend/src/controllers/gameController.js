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

    // Guess must be correct, update gameSession token and return it
    req.gameSession.charactersLeft = 
    req.gameSession.charactersLeft.filter((char) => char != charAttempt);

    //Check if all characters have been found, if so game completed
    if (req.gameSession.charactersLeft.length === 0) {
        req.gameSession.timeToComplete = Date.now() - req.gameSession.issuedAt;
    }

    jwt.sign({payload: req.gameSession}, process.env.JWT_SECRET, (error, token) => {
        res.json({
            token: "Bearer " + token,
            correct: true,
            message: "Correct",
            gameComplete: (req.gameSession.charactersLeft.length === 0)
        })
    });
}

function startGameGet(req, res) {
    const payload = {
        id: crypto.randomUUID(),
        issuedAt: Date.now(),
        charactersLeft: ["waldo", "odlaw", "wizard"],
        timeToComplete: null,
    }

    jwt.sign({payload}, process.env.JWT_SECRET, (error, token) => {
        res.json({
            token: "Bearer " + token
        })
    });    
};

async function leaderboardPost(req, res) {
    if (req.gameSession.timeToComplete === null) {
        res.sendStatus(403);
        return;
    }
    if (!req.body.name) {
        res.sendStatus(400);
        return;
    }
    try {
        await prisma.score.create({
            data: {
                id: req.gameSession.id,
                name: req.body.name,
                timeToComplete: req.gameSession.timeToComplete
            }
        })
        res.json({
            message: "Score posted to leaderboard",
            success: true,
        })
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = {
    attemptPost,
    startGameGet,
    leaderboardPost,
}
