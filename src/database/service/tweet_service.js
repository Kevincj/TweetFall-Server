import Tweet from "../model/tweet.js";

class TweetService {
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
}

export default TweetService;
