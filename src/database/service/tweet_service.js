import Tweet from "../model/tweet.js";
import "../connect.js";
import logger from "../../logging.js";
class TweetService {
  static async findNonExistingTweetsByIds(tweetIds) {
    let existingIds = await this.findTweetsByIds(tweetIds);
    return tweetIds.filter((idx) => !existingIds.has(idx));
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
}

export default TweetService;
