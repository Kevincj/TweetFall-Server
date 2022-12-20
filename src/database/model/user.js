import { mongoose, Schema } from "mongoose";

const userSchema = new Schema({
  _id: { type: String, required: true },
  userName: String,
  screenName: String,
  followers: Number,
  following: Number,
});
const User = mongoose.model("User", userSchema);

export default User;
