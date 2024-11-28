import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";
import serverConstants from "../constants";

dotenv.config();

enum LogLevel {
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
}

const fileName = process.env.LOGGER_FILE || serverConstants.defaultConfig.loggerFile;

const logFilePath = path.resolve(__dirname, `../${fileName}`);

function log(level: LogLevel, message: string): void {
  const timestamp = new Date().toISOString();
  const logMessage = `On ${timestamp} the [${level}] level message is: ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (error) => {
    if (error) {
      console.error(`${logMessage} Failed to log to ${fileName}`);
    }
  });
}

const logger = {
  error: (message: string) => log(LogLevel.ERROR, message),
  warning: (message: string) => log(LogLevel.WARNING, message),
  info: (message: string) => log(LogLevel.INFO, message),
};

export default logger;
