import mongoose from "mongoose";
import config from "config";
import logger from "../logging.js";

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb://${config.get("mongodb.host")}:${config.get(
      "mongodb.port"
    )}/${config.get("mongodb.databaseName")}`,
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
