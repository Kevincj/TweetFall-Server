import { TwitterApi } from "twitter-api-v2";
import { TwitterApiAutoTokenRefresher } from "@twitter-api-v2/plugin-token-refresher";
import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";
import config from "config";
import TwitterCredentialService from "../database/service/twitter_credential_service.js";
import logger from "../logging.js";

const rateLimitPlugin = new TwitterApiRateLimitPlugin();

const credential = await TwitterCredentialService.loadCredential();

const autoRefresherPlugin = new TwitterApiAutoTokenRefresher({
  refreshToken: credential.OAuthV2.refreshToken,
  refreshCredentials: {
    clientId: credential.OAuthV2.clientId,
    clientSecret: credential.OAuthV2.clientSecret,
  },
  onTokenUpdate(token) {
    logger.info(`Token expired. Refreshing token...`);
    credential.OAuthV2.accessToken = token.accessToken;
    credential.OAuthV2.refreshToken = token.refreshToken;
    TwitterCredentialService.updateCredential(credential);
  },
  onTokenRefreshError(error) {
    console.error("Refresh error", error);
  },
});

const v2Client = new TwitterApi(credential.OAuthV2.accessToken, {
  plugins: [autoRefresherPlugin, rateLimitPlugin],
});

await v2Client.currentUserV2().catch((err) => logger.error(err));

export { rateLimitPlugin, v2Client };
