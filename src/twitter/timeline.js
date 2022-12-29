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
  const timelineResponse = tweetJSON; // Mock the Timeline response
  //   logger.debug(`Fetched response: ${JSON.stringify(timelineResponse, null, 2)}`);

  // Extract users and save
  let userSet = new Set(
    timelineResponse.data.map((tweet) => tweet.user.id_str)
  );
  logger.debug(`Users in response: ${JSON.stringify(userSet)}`);
  let nonExistingUsers = await UserService.findNonExistingUsersByIds([
    ...userSet,
  ]);
  logger.debug(`Nonexisting users: ${JSON.stringify(nonExistingUsers)}`);
  if (nonExistingUsers.length > 0) {
    let users = await fetchUsers(nonExistingUsers);
    await UserService.insertMany(users)
      .then(() => logger.info(`User insertion succeeds.`))
      .catch((err) => logger.error(err));
  }

  // Format Tweets in the response
  var tweets = [];
  var tweetIdSet = new Set();

  for (var i = 0; i < timelineResponse.data.length; i++) {
    var ele = timelineResponse.data[i];
    // logger.debug(`Tweet element ${ele}`);
    let tweet = {
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
    // logger.debug(
    //   `Tweet: ${ele.id_str}, Medias: ${JSON.stringify(ele.extended_entities)}`
    // );

    if (ele.extended_entities && ele.extended_entities.media) {
      tweet.media = ele.extended_entities.media.map((mediaJSON) => {
        // logger.info(
        //   `Tweet: ${ele.id_str}, media: ${JSON.stringify(
        //     mediaJSON
        //   )}, extracted: ${JSON.stringify(extractMedia(ele.id_str, mediaJSON))}`
        // );
        return extractMedia(ele.id_str, mediaJSON);
      });
    } else continue;
    // logger.debug(`Tweet media: ${JSON.stringify(tweet.media)}`);

    tweetIdSet.add(tweet._id);
    tweets.push(tweet);
    // logger.debug(
    //   `Not existed add to tweets, ${[...tweetIdSet]}, ${tweets.length}`
    // );
    if (!tweetIdSet.has(tweet._id)) {
      tweetIdSet.add(tweet._id);
      tweets.push(tweet);
      logger.debug(`Not existed add to tweets, ${[...tweetIdSet]}`);
    }
  }
  logger.debug(`Number of tweets to update: ${tweets.length}`);
  logger.debug(`Tweet IDs: ${[...tweetIdSet]}`);
  let nonExistingTweetIdSet = new Set(
    await TweetService.findNonExistingTweetsByIds([...tweetIdSet]).catch(
      (err) => logger.error(err)
    )
  );

  logger.debug(
    `Non-existing Tweet IDs: ${JSON.stringify(nonExistingTweetIdSet)}`
  );
  if (nonExistingTweetIdSet.size > 0) {
    tweets = tweets.filter((tweet) => nonExistingTweetIdSet.has(tweet._id));
    await TweetService.insertMany(tweets)
      .then(() => logger.info(`Tweets insertion succeeds.`))
      .catch((err) => logger.error(err));
  }

  return tweets;
}

export default fetchTimeline;
