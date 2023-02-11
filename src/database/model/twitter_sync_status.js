import { mongoose, Schema } from "mongoose";

const twitterSyncStatusSchema = new Schema({
  timelineMaxId: Number,
  lastUpdateTimelineAt: {
    type: Date,
    default: () => Date.parse("2010-11-06T00:00:00Z"),
  },
});

const TwitterSyncStatus = mongoose.model(
  "TwitterSyncStatus",
  twitterSyncStatusSchema
);
export default TwitterSyncStatus;
