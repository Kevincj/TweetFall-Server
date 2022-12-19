const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema(
{
  _id: {type: String, required: true},
  userName: String,
  screenName: String,
  followers: Number,
  following: Number
}
)

module.exports = mongoose.model('User', userSchema);