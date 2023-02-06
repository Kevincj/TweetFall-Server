import getRateLimit from "../../src/twitter/rate_limit.js";

(async () => {
  console.log(getRateLimit("users/me"));
})();
