const express = require("express");
const router = express.Router();
const { getFlightAirports } = require("../controllers/airportController");

router.get("/", getFlightAirports); // match your frontend axios call

module.exports = router;
