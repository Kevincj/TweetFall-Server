import { mongoose, Schema } from "mongoose";

const likedTweetSchema = new Schema({
  _id: { type: String, required: true },
});

const LikedTweet = mongoose.model("LikedTweet", likedTweetSchema);
export default LikedTweet;
