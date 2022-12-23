import express from "express";
import cors from "cors";

import config from "config"; // Import config file using node-config

import "./src/database/connect.js"; // Database connection

import UserService from "./src/database/service/user_service.js";
import TweetService from "./src/database/service/tweet_service.js";
import extractMedia from "./src/twitter/media.js";

import tweetJSON from "./test_data.json" assert { type: "json" }; // Sample Twitter timeline response
const twitterData = tweetJSON;

function fetch() {
  let tweetsToAdd = [];
  let userSet = new Set();
  for (var i = 0; i < twitterData.data.length; i++) {
    var ele = twitterData.data[i];
    userSet.add(ele.user.id_str);
    var tweet = {
      _id: ele.id_str,
      text: ele.text,
      author: ele.user.id_str,
      createAt: ele.created_at,
      updateAt: Date.now(),
      metrics: {
        retweetCount: ele.retweet_count,
        favoriteCount: ele.favorite_count,
      },
    };
    if (ele.extended_entities && ele.extended_entities.media) {
      tweet.media = ele.extended_entities.media.map((media) =>
        extractMedia(media)
      );
    }
    tweetsToAdd.push(tweet);
  }
  return tweetsToAdd;
  //   let existingUsers = await UserService.findUsersByIds([...userSet]);
  //   let nonexistingUsers = [...userSet].filter((idx) => !existingUsers.has(idx));
  //   console.log(nonexistingUsers);

  //   assert(1 == 0);
}

async function insert(data) {
  try {
    const res = await Tweet.createMany(data);
    console.log(res);
  } catch (e) {
    console.log(e.message);
  }
}

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
app.get("/", (req, res) => {
  const tweets = fetch();
  console.log(tweets);
  res.send(tweets);
});

// Start server
app.listen(port, () => {
  console.log(`TweetFall listening on port ${port}`);
});
