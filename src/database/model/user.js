import { mongoose, Schema } from "mongoose";

const userSchema = new Schema({
  _id: { type: String, required: true },

  screenName: String,
  userName: String,

  trackOriginalTweets: {
    type: Boolean,
    default: True,
  },
  trackRetweets: {
    type: Boolean,
    default: False,
  },
  trackLikedTweets: {
    type: Boolean,
    default: False,
  },

  retweets: {
    type: [String],
    default: [],
  },

  likes: {
    type: [String],
    default: [],
  },

  originalTweetThreshold: {
    retweet: Number,
    like: Number,
  },

  retweetThreshold: {
    retweet: Number,
    like: Number,
  },

  likedTweetThreshold: {
    retweet: Number,
    like: Number,
  },

  followerCount: Number,
  followingCount: Number,
  likes: Number,

  blackListed: Boolean,
});
const User = mongoose.model("User", userSchema);

export default User;
