import mongoose from 'mongoose';
const {Schema} = mongoose;


const tweetSchema = new Schema({
	id: String,
	text: String,

	ref:{
		isReply: Boolean,
		replyToUser: {type: Schema.Types.ObjectId, ref: "User"},
		replyToTweet: {type: Schema.Types.ObjectId, ref: "Tweet"},
		isRetweet: Boolean,
		retweetToUserId: {type: Schema.Types.ObjectId, ref: "User"},
		retweetToTweetId: {type: Schema.Types.ObjectId, ref: "Tweet"},
		isQuote: Boolean,
		quoteToUserId: {type: Schema.Types.ObjectId, ref: "User"},
		quoteToTweetId: {type: Schema.Types.ObjectId, ref: "Tweet"},
		hasMentions: Boolean,
		mentions:[{type: Schema.Types.ObjectId, ref: "User"}],
		hasHashTags:Boolean,
		hashTags: [String]
	},

	author: {type: Schema.Types.ObjectId, ref: "User"},

	createdAt: {
		type: Date, 
		immutable: true,
		default: () => Date.now()
	},

	UpdatedAt: {
		type: Date, 
		default: () => Date.now()
	},

	metrics:{
		retweetCount: Number,
		favoriteCount: Number
	},

	media:[
		{
			type: String,
			url: String
		}
	]
})

module.exports = mongoose.model('Tweet', tweetSchema);