const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// Add a basic test route
app.get("/", (req, res) => {
  res.json({ message: "SpareParts Backend API is running!" });
});

const URL = process.env.MONGODB_URL;

// Add error handling for MongoDB connection
mongoose.connect(URL, {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
  //useFindAndModify: false
}).then(() => {
  console.log("MongoDB Connection success!");
}).catch((err) => {
  console.log("MongoDB Connection failed. Server will continue without database functionality.");
  console.log("Error:", err.message);
});

const connection = mongoose.connection;
connection.on("error", (err) => {
  console.log("MongoDB connection error:", err.message);
});

const studentRouter = require("./routes/studentroutes.js");

app.use("/studentroutes", studentRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
