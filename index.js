import express from "express";
import cors from "cors";
import config from "config";

import UserService from "./src/database/service/user_service.js";
import "./src/database/connect.js";

import tweetJSON from "./test_data.json" assert { type: "json" };
const twitterData = tweetJSON;

const app = express();
console.log(`${config.get("cors.address")}`);
var corsOptions = {
  origin: `${config.get("cors.address")}`,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

function findBestVideoSource(videoSources) {
  let bestBitRate = 0;
  let bestVideoSource = "";
  for (var i = 0; i < videoSources.length; i++) {
    let video = videoSources[i];
    if (
      video.content_type &&
      video.content_type == "video/mp4" &&
      video.bitrate > bestBitRate
    ) {
      bestVideoSource = video.url;
      bestBitRate = video.bitrate;
    }
  }
  return bestVideoSource;
}

function extractMedia(mediaInfo) {
  if (mediaInfo.type == "photo") {
    return {
      type: "image",
      url: mediaInfo.media_url,
    };
  } else if (mediaInfo.type == "video") {
    let bestVideoSource = findBestVideoSource(mediaInfo.video_info.variants);

    return {
      type: "video",
      url: bestVideoSource,
    };
  }
}
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

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  const tweets = fetch();
  console.log(tweets);
  res.send(tweets);
});

const port = config.get("server.port");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
