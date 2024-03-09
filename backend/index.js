require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = process.env.NODE_ENV;
const MONGODB_URI = process.env.MONGODB_URI;

// ------------------------MongoDB Server----------------------------------
mongoose
  .connect(`${MONGODB_URI}`)
  .then(() => console.log(`MongoDB ATLAS connected successfully!`))
  .catch((error) => console.log(`MongoDB ATLAS failed to connect! ${error}`));

// ------------------------MongoDB Server----------------------------------

// Importing Routes ----------------------------------
const videosRoutes = require("./routes/videos.routes");
// Importing Routes ----------------------------------

// Routes :
app.use("/v1", videosRoutes);

// -----------------------Express Server-----------------------------------
app.listen(`${PORT}`, () => {
  console.log(`Express Server listening at PORT : ${PORT}`);
});