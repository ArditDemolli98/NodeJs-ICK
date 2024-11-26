const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.getHome);

router.get("/api/:playerName", mainController.getPlayer);

module.exports = router;