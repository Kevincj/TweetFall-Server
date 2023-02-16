import extractMedia from "../tools/media.js";
// import TweetService from "../database/service/tweet_service";
// Database connection
import logger from "../../logging.js";
import tweetJSON from "../../../test_data.json" assert { type: "json" }; // Sample Twitter timeline response
import TweetService from "../../database/service/tweet_service.js";
import UserService from "../../database/service/user_service.js";
import { fetchUsersInTimeline } from "./user.js";
import TwitterSyncStatusService from "../../database/service/twitter_sync_status_service.js";
import config from "config";
import v1Client from "../connect/connect_v1.js";

import fs from "fs";
import { fetchTweets } from "./tweet.js";

async function updateTimeline() {
  // Load Twitter configuration from database
  let twitterSyncStatus =
    await TwitterSyncStatusService.loadTwitterSyncStatus();

  // Get last position (max Tweet ID) from database
  let timelineMaxId = twitterSyncStatus.timelineMaxId;
  let lastUpdateTimelineAt = twitterSyncStatus.lastUpdateTimelineAt;
  logger.debug(
    `Received timelineMaxId: ${timelineMaxId}, lastUpdateAt: ${lastUpdateTimelineAt.toLocaleString()}`
  );
  let currentTimestamp = new Date();

  // let timelineTweets = [];
  // if (
  //   currentTimestamp - lastUpdateTimelineAt >
  //   config.get("Configuration.min_timeline_update_interval")
  // ) {
  //   logger.debug(
  //     `Reach minimum timeline update interval. Time diff: ${
  //       currentTimestamp - lastUpdateTimelineAt
  //     }`
  //   );

  //   var homeTimeline = await v1Client.v2.homeTimeline({
  //     max_results: 100,
  //   });
  //   while (
  //     !homeTimeline.done &&
  //     homeTimeline.rateLimit.remaining > 0 &&
  //     timelineMaxId < homeTimeline.tweets[homeTimeline.tweets.length - 1].id
  //   ) {
  //     const tweetIds = homeTimeline.tweets.map((ele) => ele.id);
  //     console.log(tweetIds);

  //     const tweets = await fetchTweets(tweetIds);
  //     timelineTweets.push(...tweets);
  //     logger.debug(
  //       `Received ${tweetIds.length} tweets. Rate limit: ${homeTimeline.rateLimit.remaining} / ${homeTimeline.tweets.length}`
  //     );

  //     if (timelineTweets.length > 300) break;
  //     homeTimeline = await homeTimeline.next();
  //   }
  // } else {
  //   logger.info(
  //     `Not reach target timeline interval. Skip fetching from Twitter.`
  //   );
  // }
  // var jsonContent = JSON.stringify(timelineTweets);
  // fs.writeFile("output.json", jsonContent, "utf8", function (err) {
  //   if (err) {
  //     console.log("An error occured while writing JSON Object to File.");
  //     return console.log(err);
  //   }

  //   console.log("JSON file has been saved.");
  // });
  // console.log(timelineTweets.length);
  // // console.log(jsonContent);

  const timelineTweets = tweetJSON;

  // Extract users and save
  const nonExistingUserIds = await UserService.findNonExistingUserIds(
    timelineTweets
  );
  logger.debug(`Nonexisting users: ${JSON.stringify(nonExistingUsers)}`);
  if (nonExistingUsers.length > 0) {
    let users = await fetchUsersInTimeline(nonExistingUserIds);
    await UserService.insertMany(users)
      .then(() => logger.info(`User insertion succeeds.`))
      .catch((err) => logger.error(err));
  }

  const nonExistingTweetIdSet = new Set(
    await TweetService.findNonExistingTweetIds(timelineTweets)
  );

  for (var i = 0; i < timelineTweets.length; i++) {
    var ele = timelineTweets[i];
    // logger.debug(`Tweet element ${ele}`);

    var retweetedBy = undefined;

    if (ele.retweeted_status != undefined) {
      retweetedBy = ele.user.id_str;
      ele = ele.retweeted_status;
    }

    var tweet = undefined;
    if (nonExistingTweetIdSet.has(ele.id_str)) {
      // New tweet
      tweet = {
        _id: ele.id_str,

        authorId: ele.user.id_str,
        text: ele.text,

        retweetCount: retweet_count,
        likeCount: favorite_count,

        createdAt: ele.created_at,
        lastCheckedAt: Date.now(),
      };

      // Extract Tweet media
      if (ele.extended_entities && ele.extended_entities.media) {
        tweet.media = ele.extended_entities.media.map((mediaJSON) =>
          extractMedia(ele.user.id_str, ele.id_str, mediaJSON)
        );
      }

      // Update Tweet statistics
    } else {
      // Existing tweet, fetch and update it.
    }

    return [];
    // logger.debug(
    //   `Tweet: ${ele.id_str}, Medias: ${JSON.stringify(ele.extended_entities)}`
    // );

    if (ele.extended_entities && ele.extended_entities.media) {
      tweet.media = ele.extended_entities.media.map((mediaJSON) =>
        extractMedia(ele.id_str, mediaJSON)
      );
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
  let nonExistingTweetIds = new Set(
    await TweetService.findNonExistingTweetsByIds([...tweetIdSet]).catch(
      (err) => logger.error(err)
    )
  );

  logger.debug(
    `Non-existing Tweet IDs: ${JSON.stringify(nonExistingTweetIds)}`
  );
  if (nonExistingTweetIds.size > 0) {
    tweets = tweets.filter((tweet) => nonExistingTweetIds.has(tweet._id));
    await TweetService.insertMany(tweets)
      .then(() => logger.info(`Tweets insertion succeeds.`))
      .catch((err) => logger.error(err));
  }

  return tweets;
}

export default updateTimeline;
