import {
  getRateLimitV1,
  getRateLimitV2,
} from "../../src/twitter/rate_limit.js";

(async () => {
  console.log(await getRateLimitV2("users/me"));
})();

(async () => {
  console.log(await getRateLimitV1("statuses", "statuses/home_timeline"));
})();
