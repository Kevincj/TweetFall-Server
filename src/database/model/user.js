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
    retweetAfterOneDay: {
      type: Number,
      default: -1,
    },
    retweetAfterThreeDays: {
      type: Number,
      default: -1,
    },
    retweetAfterSevenDays: {
      type: Number,
      default: -1,
    },
    likeAfterOneDay: {
      type: Number,
      default: -1,
    },
    likeAfterThreeDays: {
      type: Number,
      default: -1,
    },
    likeAfterSevenDays: {
      type: Number,
      default: -1,
    },
  },

  retweetThreshold: {
    retweetAfterOneDay: {
      type: Number,
      default: -1,
    },
    retweetAfterThreeDays: {
      type: Number,
      default: -1,
    },
    retweetAfterSevenDays: {
      type: Number,
      default: -1,
    },
    likeAfterOneDay: {
      type: Number,
      default: -1,
    },
    likeAfterThreeDays: {
      type: Number,
      default: -1,
    },
    likeAfterSevenDays: {
      type: Number,
      default: -1,
    },
  },

  likedTweetThreshold: {
    retweetAfterOneDay: {
      type: Number,
      default: -1,
    },
    retweetAfterThreeDays: {
      type: Number,
      default: -1,
    },
    retweetAfterSevenDays: {
      type: Number,
      default: -1,
    },
    likeAfterOneDay: {
      type: Number,
      default: -1,
    },
    likeAfterThreeDays: {
      type: Number,
      default: -1,
    },
    likeAfterSevenDays: {
      type: Number,
      default: -1,
    },
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
