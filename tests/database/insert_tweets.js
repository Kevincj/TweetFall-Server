import TweetService from "../../src/database/service/tweet_service.js";
import mongoose from "mongoose";
import Tweet from "../../src/database/model/tweet.js";
import "../../src/database/connect.js";
let tweet = {
  _id: "123",
  text: "test",
  author: "446",
  createAt: Date.now(),
  updateAt: Date.now(),
  metrics: {
    retweetCount: 1,
    favoriteCount: 2,
  },
};

async function insertOneTweetTest() {
  await TweetService.insert(tweet)
    .then(console.log("Success"))
    .catch((err) => console.log(err));

  await Tweet.deleteOne({ _id: "123" });
}

let tweets = [
  {
    _id: "123",
    text: "test",
    author: "346",
    createAt: Date.now(),
    updateAt: Date.now(),
    metrics: {
      retweetCount: 1,
      favoriteCount: 2,
    },
  },
  {
    _id: "234",
    text: "test2",
    author: "4436",
    createAt: Date.now(),
    updateAt: Date.now(),
    metrics: {
      retweetCount: 3,
      favoriteCount: 2,
    },
  },
];

async function insertManyTweetsTest() {
  await TweetService.insertMany(tweets)
    .then(console.log("Success"))
    .catch((err) => console.log(err));

  await Tweet.deleteMany({ _id: { $in: ["234", "123"] } });
}

insertOneTweetTest();
insertManyTweetsTest();
