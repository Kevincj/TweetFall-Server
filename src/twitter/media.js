import Downloader from "nodejs-file-downloader";
import { v4 as uuidv4 } from "uuid";
import Tweet from "../database/model/tweet.js";
import { extractUrl, extractExtension } from "../tools/url.js";

import config from "config";
import logger from "../logging.js";

function saveMedia(tweetID, mediaID, mediaUrl, mediaType) {
  if (mediaType == "preview")
    saveFile(tweetID, mediaID, mediaUrl, "previewFilePath");
  else saveFile(tweetID, mediaID, mediaUrl, "filePath");
}

function saveFile(tweetID, mediaID, mediaUrl, key) {
  //   const field = `media.$.${key}`;
  const directory = config.get("storage.directory");
  const extension = extractExtension(mediaUrl);
  const fileName = `${tweetID}-${mediaID}.${extension}`;
  const downloader = new Downloader({
    url: mediaUrl,
    directory: directory,
    fileName: fileName,
  });
  downloader
    .download()
    .then(() => {
      logger.debug(`Downloaded: ${mediaUrl}`);
      logger.debug(
        JSON.stringify(
          { _id: tweetID, "media.mediaID": mediaID },
          {
            $set: { [`media.$.${key}`]: fileName },
          }
        )
      );
      Tweet.updateOne(
        { _id: tweetID, "media.mediaID": mediaID },
        {
          $set: { [`media.$.${key}`]: fileName },
        }
      )
        .then((res) => logger.debug(JSON.stringify(res)))
        .catch((err) => logger.error(err));
    })
    .catch((e) => logger.error(`Failed to download:  ${mediaUrl}`));
}

function findBestVideoSource(videoSources) {
  let bestBitRate = 0;
  let bestVideoSource = "";
  for (var i = 0; i < videoSources.length; i++) {
    let video = videoSources[i];
    if (
      video.content_type &&
      video.content_type == "video/mp4" &&
      video.bitrate > bestBitRate
    ) {
      bestVideoSource = video.url;
      bestBitRate = video.bitrate;
    }
  }
  return extractUrl(bestVideoSource);
}

function extractMedia(tweetID, mediaInfo) {
  //   logger.debug(
  //     `Extract media: tweetID ${tweetID}, mediaInfo ${JSON.stringify(
  //       mediaInfo
  //     )}, type ${mediaInfo.type}`
  //   );
  const mediaID = uuidv4();
  var media;
  if (mediaInfo.type == "photo") {
    // logger.debug("Is image.");
    // saveMedia(tweetID, mediaID, mediaInfo.media_url, "image");
    media = {
      mediaID: mediaID,
      mediaType: "image",
      url: extractUrl(mediaInfo.media_url),
      filePath: "",
    };
  } else if (mediaInfo.type == "video") {
    // logger.debug("Is video.");
    let bestVideoSource = findBestVideoSource(mediaInfo.video_info.variants);
    saveMedia(tweetID, mediaID, bestVideoSource, "video");
    saveMedia(tweetID, mediaID, mediaInfo.media_url, "preview");
    media = {
      mediaID: mediaID,
      mediaType: "video",
      url: bestVideoSource,
      filePath: "",
      previewUrl: extractUrl(mediaInfo.media_url),
      previewFilePath: "",
    };
  }
  logger.debug(`Media: ${JSON.stringify(media)}`);
  return media;
}

export default extractMedia;
