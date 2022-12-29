import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
    )
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      options: { flags: "w" },
    }),
    new winston.transports.File({
      filename: "logs/general.log",
      options: { flags: "w" },
    }),
    new winston.transports.File({
      filename: "logs/debug.log",
      level: "debug",
      options: { flags: "w" },
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
