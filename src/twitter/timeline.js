import extractMedia from "./media.js";
// import TweetService from "../database/service/tweet_service";
// Database connection
import logger from "../logging.js";
import tweetJSON from "../../test_data.json" assert { type: "json" }; // Sample Twitter timeline response
import TweetService from "../database/service/tweet_service.js";
import UserService from "../database/service/user_service.js";
import { fetchUsers } from "./user.js";

async function fetchTimeline() {
  let maxTimelineId = TweetService.getTimeLineMaxId(); // Get last position (max Tweet ID) from database

  // Query new Tweets from timeline API
  let response = tweetJSON; // Mock the Timeline response
  logger.debug(`Fetched response: ${response}`);

  // Extract users and save
  let userSet = new Set(response.data.map((tweet) => tweet.user.id_str));
  logger.debug(`Users in response: ${userSet}`);
  let nonExistingUsers = await UserService.findNonExistingUsersByIds([
    ...userSet,
  ]);
  logger.debug(`Nonexisting users: ${nonExistingUsers}`);
  if (nonExistingUsers.length > 0) {
    let users = await fetchUsers(nonExistingUsers);
    await UserService.insertMany(users)
      .then(() => logger.info(`User insertion succeeds.`))
      .catch((err) => logger.error(err));
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
      tweet.media = ele.extended_entities.media.map((mediaJSON) =>
        extractMedia(ele.id_str, mediaJSON)
      );
    } else continue;
    if (!tweetIdSet.has(tweet._id)) tweets.push(tweet);
  }
  logger.verbose(tweets);
  logger.debug(tweetIdSet);
  let nonExistingTweetIdSet = new Set(
    await TweetService.findNonExistingTweetsByIds([...tweetIdSet]).catch(
      (err) => logger.error(err)
    )
  );

  //   console.log(nonExistingTweetIdSet);
  if (nonExistingTweetIdSet.size > 0) {
    tweets = tweets.filter((tweet) => nonExistingTweetIdSet.has(tweet._id));
    await TweetService.insertMany(tweets)
      .then(() => logger.info(`Tweets insertion succeeds.`))
      .catch((err) => logger.error(err));
  }

  return tweets;
}

export default fetchTimeline;
