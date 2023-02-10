import logger from "../logging.js";
import { TwitterApi } from "twitter-api-v2";

import v1Client from "./connect_v1.js";
import v2Client from "./connect_v2.js";
import rateLimitPlugin from "./rate_limit_plugin.js";

async function getRateLimitV2(entryPoint) {
  const currentRateLimit = await rateLimitPlugin.v2.getRateLimit(entryPoint);
  logger.info(
    `Rate limit for ${entryPoint}: ${currentRateLimit.remaining} out of ${currentRateLimit.limit}}`
  );
  return [currentRateLimit.remaining, currentRateLimit.limit];
}

async function getRateLimitV1(resource, entryPoint) {
  const { resources } = await v1Client.v1.rateLimitStatuses(resource);

  logger.info(
    `Rate limit for ${entryPoint}: ${resources[resource][entryPoint].remaining} out of ${resources[resource][entryPoint].limit}`
  );
  return [
    resources[resource][entryPoint].remaining,
    resources[resource][entryPoint].limit,
  ];
}

export { getRateLimitV1, getRateLimitV2 };
