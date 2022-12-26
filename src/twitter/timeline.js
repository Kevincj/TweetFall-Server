import extractMedia from "./media.js";
// import TweetService from "../database/service/tweet_service";
// Database connection

import tweetJSON from "../../test_data.json" assert { type: "json" }; // Sample Twitter timeline response
import TweetService from "../database/service/tweet_service.js";
import UserService from "../database/service/user_service.js";
import { fetchUsers } from "./user.js";

async function fetchTimeline() {
  let maxTimelineId = TweetService.getTimeLineMaxId(); // Get last position (max Tweet ID) from database

  // Query new Tweets from timeline API
  let response = tweetJSON; // Mock the Timeline response
  //   console.log(response);

  // Extract users and save
  let userSet = new Set(response.data.map((tweet) => tweet.user.id_str));
  let nonExistingUsers = await UserService.findNonExistingUsersByIds([
    ...userSet,
  ]);
  if (nonExistingUsers.length > 0) {
    let users = await fetchUsers(nonExistingUsers);
    await UserService.insertMany(users);
  }

  // Format Tweets in the response
  let tweets = [];
  let tweetIdSet = new Set();
  for (var i = 0; i < response.data.length; i++) {
    var ele = response.data[i];
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
      console.log(ele.extended_entities.media);
      let medias = await Promise.all(
        ele.extended_entities.media.map((mediaJSON) => extractMedia(mediaJSON))
      );

      tweet.media = medias.filter((media) => media.filePath != "");
      if (tweet.media.size <= 0) continue;
    } else continue;
    if (!tweetIdSet.has(tweet._id)) tweets.push(tweet);
  }
  console.log(tweetIdSet);
  let nonExistingTweetIdSet = new Set(
    await TweetService.findNonExistingTweetsByIds([...tweetIdSet])
  );

  console.log(nonExistingTweetIdSet);
  if (nonExistingTweetIdSet.size > 0) {
    tweets = tweets.filter((tweet) => nonExistingTweetIdSet.has(tweet._id));
    await TweetService.insertMany(tweets);
  }
  return tweets;
}

export default fetchTimeline;
