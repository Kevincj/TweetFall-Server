import { TwitterApi } from "twitter-api-v2";
import config from "config";
import logger from "../logging.js";
import TwitterCredentialService from "../database/service/twitter_credential_service.js";

const credential = await TwitterCredentialService.loadCredential();
const v1Client = new TwitterApi({
  appKey: credential.OAuthV1.apiKey,
  appSecret: credential.OAuthV1.apiSecret,
  accessToken: credential.OAuthV1.accessToken,
  accessSecret: credential.OAuthV1.accessSecret,
});

// await v1Client.currentUser().catch((err) => logger.error(err));
export default v1Client;
