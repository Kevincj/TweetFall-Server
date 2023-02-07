import { mongoose, Schema } from "mongoose";

const twitterSyncStatusSchema = new Schema({
  timelineMaxId: Number,
});

const TwitterSyncStatus = mongoose.model(
  "TwitterSyncStatus",
  twitterSyncStatusSchema
);
export default TwitterSyncStatus;
