import "../connect.js";
import config from "config";
import TwitterCredential from "../model/twitter_credential.js";
import logger from "../../logging.js";
class TwitterCredentialService {
  static async loadCredential() {
    let credential = await TwitterCredential.findOne();

    if (credential == null) {
      logger.info(`No credentials found. Create one from config file.`);
      let twitterInfo = {
        OAuthV1: {
          apiKey: config.get("Twitter.OAuth1.api_key"),
          apiSecret: config.get("Twitter.OAuth1.api_secret"),
          accessToken: config.get("Twitter.OAuth1.access_token"),
          accessSecret: config.get("Twitter.OAuth1.access_secret"),
        },

        OAuthV2: {
          clientId: config.get("Twitter.OAuth2.client_id"),
          clientSecret: config.get("Twitter.OAuth2.client_secret"),
          accessToken: config.get("Twitter.OAuth2.access_token"),
          refreshToken: config.get("Twitter.OAuth2.refresh_token"),
        },
        Bearer: config.get("Twitter.Bearer"),
      };

      await TwitterCredential.create(twitterInfo)
        .then(logger.info(`Created one creadential entry.`))
        .catch((err) => logger.error(err));
    } else {
      logger.info(`Found one credential.`);
    }
  }
}

export default TwitterCredentialService;
