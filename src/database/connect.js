import mongoose from "mongoose";
import config from "config";

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
    console.log("Mongoose connected.");
  })
  .catch((e) => {
    console.log("Mongoose connection error.");
    console.error(e);
  });

const connection = mongoose.connection;
export default connection;
