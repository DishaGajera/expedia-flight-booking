const axios = require("axios");

const API_KEY = process.env.AVIATIONSTACK_API_KEY; // Store your API key in .env
// console.log("API Key:", API_KEY); // Debugging line to check if the key is loaded

exports.searchFlights = async (req, res) => {
    const { from, to, date } = req.query;

    if (!from || !to || !date) {
        return res.status(400).json({ message: "Missing search parameters" });
    }

    try {
        const response = await axios.get("https://api.aviationstack.com/v1/flights", {
            params: {
                access_key: API_KEY,
                dep_iata: from,
                arr_iata: to,
                dep_date: date,
            },
        });

        const flights = response.data.data;
        res.json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching flight data" });
    }
};
