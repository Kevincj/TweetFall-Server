import { mongoose, Schema } from "mongoose";

const userSchema = new Schema({
  _id: { type: String, required: true },

  screenName: String,
  userName: String,

  trackOriginalTweets: {
    type: Boolean,
    default: true,
  },
  trackRetweets: {
    type: Boolean,
    default: false,
  },
  trackLikedTweets: {
    type: Boolean,
    default: false,
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

  lastCheckedAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});
const User = mongoose.model("User", userSchema);

export default User;
