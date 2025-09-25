const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const flightRoutes = require("./routes/flightRoutes");
const airportRoutes = require("./routes/airportRoutes");


const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use("/api", flightRoutes);
app.use("/api/airports-from-flights", airportRoutes);
app.get("/", (req, res) => {
    res.send("Flight Booking API using external API");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
