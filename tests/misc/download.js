// import { saveMedia } from "../../src/twitter/media.js";
import Downloader from "nodejs-file-downloader";
import config from "config";
import fs from "fs";
import uuid from "react-uuid";
async function saveMedia(mediaURL) {
  const directory = config.get("storage.directory");
  const downloader = new Downloader({
    url: mediaURL,
    directory: directory,
  });
  try {
    const { filePath, downloadStatus } = await downloader.download(); //Downloader.download() resolves with some useful properties.

    console.log("All done");
  } catch (error) {
    console.log("Download failed", error);
  }
}

saveMedia(
  "https://www.google.com/logos/doodles/2022/seasonal-holidays-2022-6753651837109831.4-s.png"
);
