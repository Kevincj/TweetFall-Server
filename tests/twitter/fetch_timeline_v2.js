import { v2Client } from "../../src/twitter/connect_v2.js";

(async () => {
  const homeTimeline = await v2Client.v2.homeTimeline({
    max_results: 100,
  });

  console.log(homeTimeline.tweets.length);
})();
