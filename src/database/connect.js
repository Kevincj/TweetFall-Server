import mongoose from "mongoose";
import config from "config";
import logger from "../logging.js";

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb://${config.get("Mongodb.host")}:${config.get(
      "Mongodb.port"
    )}/${config.get("Mongodb.databaseName")}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    logger.info("Mongoose connected.");
  })
  .catch((e) => {
    logger.info("Mongoose connection error.");
    logger.error(e);
  });

const connection = mongoose.connection;
export default connection;
