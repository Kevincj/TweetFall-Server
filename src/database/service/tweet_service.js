import Tweet from "../model/tweet.js";
import "../connect.js";

class TweetService {
  static async getTimeLineMaxId() {
    latestTweet = await Tweet.find().sort({ _id: -1 }).limit(1);
    if (latestTweet.length != 0) return latestTweet._id;
    return 0;
  }
}
const test = TweetService.getTimeLineMaxId();
console.log(test);
