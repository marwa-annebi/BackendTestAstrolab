const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const connectDB = require("./data/db");
const parkingRoute = require("./routes/parkingRoute");
const ticketRoute = require("./routes/ticketRoute");
const slotRoute = require("./routes/slotRoute");
const floorRoute = require("./routes/floorRoute");
const vehiculeTypeRoute = require("./routes/vehiculeTypeRoute");
var bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);
connectDB();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
  })
);

app.use("/parking", parkingRoute);
app.use("/ticket", ticketRoute);
app.use("/floor", floorRoute);
app.use("/slot", slotRoute);
app.use("/vehiculeType", vehiculeTypeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
