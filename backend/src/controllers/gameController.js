const prisma = require("../config/prisma");

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

module.exports = {
    attemptPost,
}
