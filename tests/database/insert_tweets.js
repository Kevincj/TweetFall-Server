import TweetService from "../../src/database/service/tweet_service.js";
import mongoose from "mongoose";
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

TweetService.insert(tweet);
