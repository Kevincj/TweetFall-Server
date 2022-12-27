import Downloader from "nodejs-file-downloader";
import { v4 as uuidv4 } from "uuid";
import Tweet from "../database/model/tweet.js";

import config from "config";
import logger from "../logging.js";

function saveMedia(tweetID, mediaID, mediaURL, mediaType) {
  if (mediaType == "preview") saveFile(tweetID, mediaID, mediaURL, "preview");
  else saveFile(tweetID, mediaID, mediaURL, "filePath");
}

function saveFile(tweetID, mediaID, mediaURL, key) {
  //   const field = `media.$.${key}`;
  const directory = config.get("storage.directory");
  const extension = mediaURL.split("?")[0].split(".").pop();
  const fileName = `${tweetID}-${mediaID}.${extension}`;
  const downloader = new Downloader({
    url: mediaURL,
    directory: directory,
    fileName: fileName,
  });
  downloader
    .download()
    .then(() => {
      logger.debug(`Downloaded: ${mediaURL}`);
      Tweet.updateOne(
        { _id: tweetID, "media.mediaID": mediaID },
        {
          $set: { [`media.$.${key}`]: fileName },
        }
      );
    })
    .catch(() => logger.error(`Failed to download:  ${mediaURL}`));
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
  return bestVideoSource;
}

function extractMedia(tweetID, mediaInfo) {
  const mediaID = uuidv4();
  if (mediaInfo.type == "photo") {
    saveMedia(tweetID, mediaID, mediaInfo.media_url, "image");
    return {
      mediaID: mediaID,
      media_type: "image",
      url: mediaInfo.media_url,
      file_path: "",
    };
  } else if (mediaInfo.type == "video") {
    let bestVideoSource = findBestVideoSource(mediaInfo.video_info.variants);
    saveMedia(tweetID, mediaID, bestVideoSource, "video");
    saveMedia(tweetID, mediaID, mediaInfo.media_url, "preview");
    return {
      mediaID: mediaID,
      mediaType: "video",
      url: bestVideoSource,
      filePath: "",
      preview: mediaInfo.media_url,
      preview_file_path: "",
    };
  }
}

export default extractMedia;
