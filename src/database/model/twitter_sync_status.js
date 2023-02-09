import { mongoose, Schema } from "mongoose";

const twitterSyncStatusSchema = new Schema({
  timelineMaxId: Number,
  lastUpdateTimelineAt: {
    type: Date,
    default: () => Date.parse("1970-01-01"),
  },
});

const TwitterSyncStatus = mongoose.model(
  "TwitterSyncStatus",
  twitterSyncStatusSchema
);
export default TwitterSyncStatus;
