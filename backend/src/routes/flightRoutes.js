const express = require("express");
const router = express.Router();
const { searchFlights } = require("../controllers/flightController");

router.get("/flights", searchFlights);

module.exports = router;
