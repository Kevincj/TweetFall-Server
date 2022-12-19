const express = require('express')
var cors = require('cors')
const config = require('config');
const {MongoClient} = require('mongodb');

const app = express()


var corsOptions = {

  origin: `${config.get('cors.address')}`,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.get('/', (req, res) => {
  res.send({
    "data": [
        {
            "username": "Images",
            "text": "Splatfest!!!",
            "media": [
				{
					"type": "image",
					"url": "https://pbs.twimg.com/media/FkGrxP6XgAAxTbm?format=jpg&name=large"
				},
				{
					"type": "image",
					"url": "https://pbs.twimg.com/media/FkF6encUEAEAIv9?format=jpg&name=medium"
				},
				{
					"type": "image",
					"url": "https://pbs.twimg.com/media/FkGrxP6XgAAxTbm?format=jpg&name=large"
				},
				{
					"type": "image",
					"url": "https://pbs.twimg.com/media/FkGrxP6XgAAxTbm?format=jpg&name=large"
				},
				{
					"type": "image",
					"url": "https://pbs.twimg.com/media/FkF6encUEAEAIv9?format=jpg&name=medium"
				},
				{
					"type": "image",
					"url": "https://pbs.twimg.com/media/FkF6encUEAEAIv9?format=jpg&name=medium"
				},
				{
					"type": "image",
					"url": "https://pbs.twimg.com/media/FkF6encUEAEAIv9?format=jpg&name=medium"
				}
            ]
        },
        {
            "username": "Videos",
            "text": "SplatVideos!",
            "media": [
				{
					"type": "video",
					"url": "https://video.twimg.com/ext_tw_video/1603434302842474496/pu/vid/720x720/e7lohdtaTAYKSv6E.mp4?tag=12"
				},
				{
					"type": "video",
					"url": "https://video.twimg.com/ext_tw_video/1601401390932561920/pu/vid/1280x720/Uejun5GhmkKXc91L.mp4?tag=12"
				}
            ]
        }
    ],
    "meta": {
        "result_count": 97,
        "next_token": "7140dibdnow9c7btw48277tlokummugckx0u0syuj5id5"
    }
})
})

const port = config.get('server.port')
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
