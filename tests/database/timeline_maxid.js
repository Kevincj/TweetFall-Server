import TweetService from "../../src/database/service/tweet_service.js";

const maxId = TweetService.getTimeLineMaxId();
console.log(maxId);
