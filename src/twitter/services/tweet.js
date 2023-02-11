import v1Client from "../connect/connect_v1.js";

export async function fetchTweets(tweetIds) {
  const tweets = await v1Client.v1.tweets(tweetIds);
  return tweets;
}
