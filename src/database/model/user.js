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
    retweetAfterOneDay: Number,
    retweetAfterThreeDays: Number,
    retweetAfterSevenDays: Number,
    likeAfterOneDay: Number,
    likeAfterThreeDays: Number,
    likeAfterSevenDays: Number,
  },

  retweetThreshold: {
    retweetAfterOneDay: Number,
    retweetAfterThreeDays: Number,
    retweetAfterSevenDays: Number,
    likeAfterOneDay: Number,
    likeAfterThreeDays: Number,
    likeAfterSevenDays: Number,
  },

  likedTweetThreshold: {
    retweetAfterOneDay: Number,
    retweetAfterThreeDays: Number,
    retweetAfterSevenDays: Number,
    likeAfterOneDay: Number,
    likeAfterThreeDays: Number,
    likeAfterSevenDays: Number,
  },

  followerCount: Number,
  followingCount: Number,
  likes: Number,

  blackListed: Boolean,

  lastCheckedAt: {
    type: Date,
    default: () => Date.now(),
  },
});
const User = mongoose.model("User", userSchema);

export default User;
