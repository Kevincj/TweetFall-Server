import TweetService from "../../src/database/service/tweet_service.js";

const maxId = await TweetService.getTimeLineMaxId();
console.log(maxId);
