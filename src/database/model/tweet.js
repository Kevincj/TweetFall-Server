import { mongoose, Schema } from "mongoose";

const tweetSchema = new Schema({
  _id: { type: String, required: true },

  authorId: String,

  retweetedBy: {
    type: [String],
    default: [],
  },
  likedBy: {
    type: [String],
    default: [],
  },

  finalized: {
    type: Boolean,
    default: false,
  },

  inTrashBin: {
    type: Boolean,
    default: false,
  },

  text: String,

  retweetCount: Number,
  likeCount: Number,

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },

  media: [
    {
      mediaID: String,
      mediaType: String,
      mediaUrl: String,
      previewUrl: String,
      storedLocally: Boolean,
      mediaPath: String,
      previewPath: String,
    },
  ],
});

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
