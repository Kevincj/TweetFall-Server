import "../../src/database/connect.js";
import Tweet from "../../src/database/model/tweet.js";
import logger from "../../src/logging.js";

let tweets = [
  {
    _id: "123",
    text: "test",
    author: "346",
    createAt: Date.now(),
    updateAt: Date.now(),
    metrics: {
      retweetCount: 1,
      favoriteCount: 2,
    },
    media: [
      {
        mediaID: "111",
        url: "12312.abc",
        filePath: "",
        mediaType: "video",
        preview: "1.jpg",
      },
      {
        mediaID: "222",
        url: "12343212.edf",
        filePath: "",
        mediaType: "video",
        preview: "2.jpg",
      },
    ],
  },
  {
    _id: "234",
    text: "test2",
    author: "4436",
    createAt: Date.now(),
    updateAt: Date.now(),
    metrics: {
      retweetCount: 3,
      favoriteCount: 2,
    },
    media: [
      {
        mediaID: "444",
        url: "34.abc",
        filePath: "",
        mediaType: "video",
        preview: "1.jpg",
      },
      {
        mediaID: "333",
        url: "512.edf",
        filePath: "",
        mediaType: "video",
        preview: "2.jpg",
      },
      {
        mediaID: "111",
        url: "2134.edf",
        filePath: "",
        mediaType: "video",
        preview: "2.jpg",
      },
    ],
  },
];

await Tweet.insertMany(tweets);

try {
  const media = await Tweet.findOne(
    { _id: "234", "media.mediaID": "333" },
    { "media.$": 1 }
  );
  console.log(media);
  media.media[0].filePath = "balabalal";
  await Tweet.updateOne(
    { _id: "234", "media.mediaID": "333" },
    {
      $set: { "media.$.filePath": "balabala" },
    }
  );
  console.log(
    await Tweet.findOne(
      { _id: "234", "media.mediaID": "333" },
      { "media.$": 1 }
    )
  );
} catch (err) {
  console.log(err);
} finally {
  await Tweet.deleteMany({ _id: { $in: ["234", "123"] } });
}
