import Downloader from "nodejs-file-downloader";
import fs from "fs";
import config from "config";

async function saveMedia(mediaURL) {
  const directory = config.get("storage.directory");
  const downloader = new Downloader({
    url: mediaURL,
    directory: directory,
  });
  try {
    const { filePath } = await downloader.download();
    console.log("Download Completed at", filePath);
    return filePath;
  } catch (error) {
    // console.log("Download failed", error);
  }
  return "";
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

async function extractMedia(mediaInfo) {
  if (mediaInfo.type == "photo") {
    return {
      media_type: "image",
      url: mediaInfo.media_url,
      file_path: await saveMedia(mediaInfo.media_url),
    };
  } else if (mediaInfo.type == "video") {
    let bestVideoSource = findBestVideoSource(mediaInfo.video_info.variants);

    return {
      media_type: "video",
      url: bestVideoSource,
      filePath: await saveMedia(bestVideoSource),
      preview: mediaInfo.media_url,
      preview_file_path: await saveMedia(mediaInfo.media_url),
    };
  }
}

export default extractMedia;
