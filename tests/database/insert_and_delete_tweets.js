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
    .then(console.log("InsertOne Success"))
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
    .then(console.log("InsertMany Success"))
    .catch((err) => console.log(err));

  await Tweet.deleteMany({ _id: { $in: ["234", "123"] } });
}

async function deleteOneTest() {
  await Tweet.create({
    _id: "123",
    text: "test",
    author: "446",
    createAt: Date.now(),
    updateAt: Date.now(),
    metrics: {
      retweetCount: 1,
      favoriteCount: 2,
    },
  });

  await TweetService.delete("123")
    .then(console.log("DeleteOne Success."))
    .catch((err) => console.log(err));
}

async function deleteManyTest() {
  await Tweet.insertMany([
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
  ]);

  await TweetService.deleteMany(["123", "234"])
    .then(console.log("DeleteMany Success."))
    .catch((err) => console.log(err));
}

insertOneTweetTest();
insertManyTweetsTest();
deleteOneTest();
deleteManyTest();
