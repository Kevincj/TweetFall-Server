import Tweet from "../model/tweet.js";
import "../connect.js";
import logger from "../../logging.js";
import LikedTweet from "../model/liked_tweet.js";
import getNonExistingElements from "../../toolbox/list_diff.js";
class TweetService {
  static async findNonExistingTweetIds(tweets) {
    const tweetIds = [
      ...new Set(
        tweets.data.map((tweet) => {
          if (tweet.retweeted_status == undefined) return tweet.id_str;
          else return tweet.retweeted_status.id_str;
        })
      ),
    ];
    const existingIds = await this.findTweetsByIds(tweetIds);
    return getNonExistingElements(tweetIds, existingIds);
  }

  static async findTweetsByIds(tweetIds) {
    return new Set(
      (await Tweet.find().where("_id").in(tweetIds).exec()).map(
        (res) => res._id
      )
    );
  }

  static async getTimeLineMaxId() {
    let latestTweet = await Tweet.find().sort({ _id: -1 }).limit(1);
    if (latestTweet.length != 0) return latestTweet._id;
    return 0;
  }

  static async insertMany(tweets) {
    return Tweet.insertMany(tweets);
  }

  static async insert(tweet) {
    return Tweet.create(tweet);
  }

  static async delete(tweetId) {
    return Tweet.deleteOne({ _id: tweetId });
  }

  static async deleteMany(tweetIds) {
    return Tweet.deleteMany({ _id: { $in: tweetIds } });
  }

  static async updateMediaPath(tweetId, mediaID) {}

  static async getLikedTweetIds() {
    return new Set((await LikedTweet.find()).map((ele) => ele._id));
  }

  static async findNonExistingLikedTweet(tweets) {
    const existingIds = await this.getLikedTweetIds();
    return tweets.filter((tweet) => !existingIds.has(tweet._id));
  }
}

export default TweetService;
