import "../connect.js";
import config from "config";
import logger from "../../logging.js";
import TwitterSyncStatus from "../model/twitter_sync_status.js";

class TwitterSyncStatusService {
  static async loadTwitterSyncStatus() {
    var twitterSyncStatus = await TwitterSyncStatus.findOne();

    if (twitterSyncStatus == null) {
      logger.info(`No Twitter sync status found. Create one.`);
      twitterSyncStatus = {
        timelineMaxId: 0,
      };
      await TwitterSyncStatus.create(twitterSyncStatus)
        .then(logger.info(`Created one Twitter sync status.`))
        .catch((err) => logger.error(err));
      return await TwitterSyncStatus.findOne();
    } else {
      logger.info(`Found one Twitter sync status.`);
      return twitterSyncStatus;
    }
  }

  static async updateTwitterSyncStatus(twitterSyncStatus) {
    await TwitterSyncStatus.save()
      .then(logger.info(`Twitter sync status saved`))
      .catch((err) => logger.error(err));
  }
}

export default TwitterSyncStatusService;
