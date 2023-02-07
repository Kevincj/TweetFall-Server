import express from "express";
import cors from "cors";

import config from "config"; // Import config file using node-config
import logger from "./src/logging.js";
import "./src/database/connect.js"; // Database connection
import updateTimeline from "./src/twitter/timeline.js";

// Initialize express server
const app = express();
const port = config.get("Server.port");

// Cors policy
var corsOptions = {
  origin: `${config.get("Cors.address")}`,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Homepage: Twitter timeline
app.get("/", async (req, res) => {
  let tweets = await updateTimeline();
  res.send(tweets);
});
app.use("/static", express.static("../../../e/Resources/TweetFallStore"));

// Start server
app.listen(port, () => {
  console.log(`TweetFall listening on port ${port}`);
});
