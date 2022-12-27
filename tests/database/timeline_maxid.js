import TweetService from "../../src/database/service/tweet_service.js";
import logger from "../../src/logging.js";
const maxId = await TweetService.getTimeLineMaxId();
console.log(maxId);
