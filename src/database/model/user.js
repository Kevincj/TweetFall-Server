import { mongoose, Schema } from "mongoose";

const userSchema = new Schema({
  _id: { type: String, required: true },
  userName: String,
  userType: String,
  screenName: String,
  followers: Number,
  following: Number,
  favorites: Number,
  threshold: {
    retweet: Number,
    like: Number,
  },
});
const User = mongoose.model("User", userSchema);

export default User;
