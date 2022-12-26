import { mongoose, Schema } from "mongoose";

const tweetSchema = new Schema({
  _id: { type: String, required: true },
  text: String,

  ref: {
    isReply: Boolean,
    replyToUser: String,
    replyToTweet: String,
    isRetweet: Boolean,
    retweetToUserId: String,
    retweetToTweetId: String,
    isQuote: Boolean,
    quoteToUserId: String,
    quoteToTweetId: String,
    hasMentions: Boolean,
    mentions: [String],
    hasHashTags: Boolean,
    hashTags: [String],
  },

  author: String,

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },

  UpdatedAt: {
    type: Date,
    default: () => Date.now(),
  },

  metrics: {
    retweetCount: Number,
    favoriteCount: Number,
  },

  media: [
    {
      type: String,
      url: String,
    },
  ],
});

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
