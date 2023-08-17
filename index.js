const express = require("express");
const routes = require("./app/routes/api");
const morgan = require("morgan");
const connectDB = require("./database/connections");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

//! Start the server
// const port = config.port || 3000;
dotenv.config({ path: "config.env" });
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));

//MongoDb connection
connectDB();

app.use(express.json({ extended: true })); // Parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

// Routes
app.use("/api", routes);

app.get("*", (req, res) => res.status(404).json({ error: "API not found." }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
