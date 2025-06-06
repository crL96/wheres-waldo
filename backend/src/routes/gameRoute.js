const router = require("express").Router();
const controller = require("../controllers/gameController");
const verifyToken = require("../middleware/verifyToken");

router.post("/attempt", verifyToken, controller.attemptPost);

router.get("/start", controller.startGameGet);

router.post("/leaderboard", verifyToken, controller.leaderboardPost);

module.exports = router;