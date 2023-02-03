import { mongoose, Schema } from "mongoose";

const tweetSchema = new Schema({
  _id: { type: String, required: true },

  tweetType: String,
  text: String,

  replyTo: String,
  retweetFrom: String,
  QuoteFrom: String,

  ref: {
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
      mediaID: String,
      mediaType: String,
      url: String,
      preview: String,
    },
  ],
});

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
