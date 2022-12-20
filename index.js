import express from "express";
import cors from "cors";
import config from "config";

import data from "./test_data.json" assert { type: "json" };

import UserService from "./src/database/service/user_service.js";
import "./src/database/index.js";

const app = express();
var corsOptions = {
  origin: `${config.get("cors.address")}`,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

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
async function run() {
  let tweetsToAdd = [];
  let userSet = new Set();
  for (var i = 0; i < data.data.length; i++) {
    var ele = data.data[i];
    userSet.add(ele.user.id_str);
    var tweet = {
      _id: ele.id_str,
      text: ele.text,
      author: ele.user.id_str,
      createAt: ele.created_at,
      updateAt: Date.now(),
      metrics: {
        retweetCount: ele.retweet_count,
        favoriteCount: ele.favorite_count,
      },
    };
    if (ele.extended_entities && ele.extended_entities.media) {
      tweet.media = ele.extended_entities.media.map((media) =>
        extractMedia(media)
      );
    }
    tweetsToAdd.push(tweet);
  }
  let existingUsers = await UserService.findUsersByIds([...userSet]);
  let nonexistingUsers = [...userSet].filter((idx) => !existingUsers.has(idx));
  console.log(nonexistingUsers);

  assert(1 == 0);
}
run();
// async function insert(data) {
//   try {
//     const res = await Tweet.createMany(data);
//     console.log(res);
//   } catch (e) {
//     console.log(e.message);
//   }
// }

// app.use(cors(corsOptions));
// app.get("/", (req, res) => {
//   res.send({
//     data: [
//       {
//         username: "Images",
//         text: "Splatfest!!!",
//         media: [
//           {
//             type: "image",
//             url: "https://pbs.twimg.com/media/FkGrxP6XgAAxTbm?format=jpg&name=large",
//           },
//           {
//             type: "image",
//             url: "https://pbs.twimg.com/media/FkF6encUEAEAIv9?format=jpg&name=medium",
//           },
//           {
//             type: "image",
//             url: "https://pbs.twimg.com/media/FkGrxP6XgAAxTbm?format=jpg&name=large",
//           },
//           {
//             type: "image",
//             url: "https://pbs.twimg.com/media/FkGrxP6XgAAxTbm?format=jpg&name=large",
//           },
//           {
//             type: "image",
//             url: "https://pbs.twimg.com/media/FkF6encUEAEAIv9?format=jpg&name=medium",
//           },
//           {
//             type: "image",
//             url: "https://pbs.twimg.com/media/FkF6encUEAEAIv9?format=jpg&name=medium",
//           },
//           {
//             type: "image",
//             url: "https://pbs.twimg.com/media/FkF6encUEAEAIv9?format=jpg&name=medium",
//           },
//         ],
//       },
//       {
//         username: "Videos",
//         text: "SplatVideos!",
//         media: [
//           {
//             type: "video",
//             url: "https://video.twimg.com/ext_tw_video/1603434302842474496/pu/vid/720x720/e7lohdtaTAYKSv6E.mp4?tag=12",
//           },
//           {
//             type: "video",
//             url: "https://video.twimg.com/ext_tw_video/1601401390932561920/pu/vid/1280x720/Uejun5GhmkKXc91L.mp4?tag=12",
//           },
//         ],
//       },
//     ],
//     meta: {
//       result_count: 97,
//       next_token: "7140dibdnow9c7btw48277tlokummugckx0u0syuj5id5",
//     },
//   });
// });

// const port = config.get("server.port");
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
