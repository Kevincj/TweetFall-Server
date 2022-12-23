
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

function extractMedia(mediaInfo) {
  if (mediaInfo.type == "photo") {
    return {
      type: "image",
      url: mediaInfo.media_url,
    };
  } else if (mediaInfo.type == "video") {
    let bestVideoSource = findBestVideoSource(mediaInfo.video_info.variants);

    return {
      type: "video",
      url: bestVideoSource,
    };
  }
}

export default extractMedia;