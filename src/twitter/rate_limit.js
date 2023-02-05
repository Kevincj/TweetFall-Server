import logger from "../logging";
import { TwitterApi } from "twitter-api-v2";
import { TwitterApiAutoTokenRefresher } from "@twitter-api-v2/plugin-token-refresher";
import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";

export default async function getRateLimit(entryPoint) {
  const currentRateLimit = await rateLimitPlugin.v2.getRateLimit(entryPoint);
  logger.info(
    `Rate limit for ${entryPoint}: ${currentRateLimit.remaining} out of ${currentRateLimit.limit}`
  );
}

async () => {
  getRateLimit;
};
