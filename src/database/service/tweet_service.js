import Tweet from "../model/tweet.js";

class TweetService {
  static async getTimeLineMaxId() {
    let latestTweet = await Tweet.find().sort({ _id: -1 }).limit(1);
    if (latestTweet.length != 0) return latestTweet._id;
    return 0;
  }

  static async insertMany(tweets) {
    try {
      console.log(tweets);
      const res = await Tweet.insertMany(tweets);
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
  }

  static async insert(tweet) {
    try {
      console.log(tweet);
      const res = await Tweet.create(tweet);
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default TweetService;
