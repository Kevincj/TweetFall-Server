import { TwitterApi } from "twitter-api-v2";
import { TwitterApiAutoTokenRefresher } from "@twitter-api-v2/plugin-token-refresher";
import config from "config";

const credentials = {
  clientId: config.get("Twitter.OAuth2.client_id"),
  clientSecret: config.get("Twitter.OAuth2.client_secret"),
};
// Obtained first through OAuth2 auth flow
const tokenStore = {
  accessToken: config.get("Twitter.OAuth2.access_token"),
  refreshToken: config.get("Twitter.OAuth2.refresh_token"),
};

const autoRefresherPlugin = new TwitterApiAutoTokenRefresher({
  refreshToken: tokenStore.refreshToken,
  refreshCredentials: credentials,
  onTokenUpdate(token) {
    tokenStore.accessToken = token.accessToken;
    tokenStore.refreshToken = token.refreshToken;
    // store in DB/Redis/...
  },
  onTokenRefreshError(error) {
    console.error("Refresh error", error);
  },
});

const client = new TwitterApi(tokenStore.accessToken, {
  plugins: [autoRefresherPlugin],
});
