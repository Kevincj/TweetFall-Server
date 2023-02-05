import { mongoose, Schema } from "mongoose";

const twitterCredentialSchema = new Schema({
  OAuthV1: {
    apiKey: String,
    apiSecret: String,
    accessToken: String,
    accessSecret: String,
  },

  OAuthV2: {
    clientId: String,
    clientSecret: String,
    accessToken: String,
    refreshToken: String,
  },
  Bearer: String,
});

const TwitterCredential = mongoose.model(
  "TwitterCredential",
  twitterCredentialSchema
);
export default TwitterCredential;
