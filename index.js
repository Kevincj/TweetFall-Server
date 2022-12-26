import express from "express";
import cors from "cors";

import config from "config"; // Import config file using node-config

import "./src/database/connect.js"; // Database connection
import fetchTimeline from "./src/twitter/timeline.js";

// Initialize express server
const app = express();
const port = config.get("server.port");

// Cors policy
var corsOptions = {
  origin: `${config.get("cors.address")}`,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Homepage: Twitter timeline
app.get("/", async (req, res) => {
  let tweets = await fetchTimeline();
  res.send(tweets);
});

// Start server
app.listen(port, () => {
  console.log(`TweetFall listening on port ${port}`);
});
