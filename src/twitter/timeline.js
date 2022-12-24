import extractMedia from "./media.js";
// import TweetService from "../database/service/tweet_service";

import tweetJSON from "../../test_data.json" assert { type: "json" }; // Sample Twitter timeline response
import TweetService from "../database/service/tweet_service.js";
import UserService from "../database/service/user_service.js";

async function fetchTimeline() {
  let maxTimelineId = TweetService.getTimeLineMaxId(); // Get last position (max Tweet ID) from database

  // Query new Tweets from timeline API
  let response = tweetJSON; // Mock the Timeline response
  console.log(response);

  // Extract users and compare
  let userSet = new Set(response.data.map((tweet) => tweet.user.id_str));
  // console.log(userSet);
  let existingUsers = await UserService.findUsersByIds([...userSet]);
  let nonexistingUsers = [...userSet].filter((idx) => !existingUsers.has(idx));
  // console.log(nonexistingUsers);
  // Format Tweets in the response
  let tweetsToAdd = [];
  for (var i = 0; i < response.data.length; i++) {
    var ele = response.data[i];
    // userSet.add(ele.user.id_str);
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
  console.log(tweetsToAdd);
  return tweetsToAdd;
}

export default fetchTimeline;
