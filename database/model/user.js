const mongoose = require('mongoose')


const userSchema = new Schema(
{
  id: String,
  userName: String,
  screenName: String,
  followers: Number,
  following: Number
}
)

module.exports = mongoose.model('User', userSchema);