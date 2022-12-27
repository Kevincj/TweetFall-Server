import Twit from "twit";
import config from "config";
import logger from "../logging.js";
const API = new Twit({
  consumer_key: config.get("twitter.OAuth1.api_key"),
  consumer_secret: config.get("twitter.OAuth1.api_secret"),
  access_token: config.get("twitter.OAuth1.access_token"),
  access_token_secret: config.get("twitter.OAuth1.access_secret"),
});

export default API;
