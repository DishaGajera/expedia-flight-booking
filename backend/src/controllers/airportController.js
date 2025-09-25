// controllers/airportController.js
const axios = require("axios");
const API_KEY = process.env.AVIATIONSTACK_API_KEY;

let cachedAirports = { from: [], to: [] }; // cache to avoid repeated API calls

exports.getFlightAirports = async (req, res) => {
    try {
        if (cachedAirports.from.length > 0 && cachedAirports.to.length > 0) {
            return res.json(cachedAirports);
        }

        // Fetch flights from AviationStack API
        const response = await axios.get("https://api.aviationstack.com/v1/flights", {
            params: { access_key: API_KEY },
        });

        // ⚡ Fix here: extract array from `data` property
        const flights = response.data.data;

        const fromSet = new Set();
        const toSet = new Set();

        flights.forEach((f) => {
            if (f.departure?.iata) fromSet.add(`${f.departure.iata} - ${f.departure.airport || f.departure.city}`);
            if (f.arrival?.iata) toSet.add(`${f.arrival.iata} - ${f.arrival.airport || f.arrival.city}`);
        });

        cachedAirports = {
            from: Array.from(fromSet).sort(),
            to: Array.from(toSet).sort(),
        };

        res.json(cachedAirports);
    } catch (error) {
        console.error("Error fetching flight airports:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch flight airports", details: error.response?.data || error.message });
    }
};
