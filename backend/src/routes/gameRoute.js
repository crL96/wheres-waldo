const router = require("express").Router();
const controller = require("../controllers/gameController");

router.post("/attempt", controller.attemptPost);

module.exports = router;