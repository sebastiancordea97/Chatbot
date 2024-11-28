import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import exchanges from "./routes/exchanges";
import serverConstants from "./constants";
import logger from "./services/loggerService";

dotenv.config();

const app: Application = express();

const port = process.env.PORT || serverConstants.defaultConfig.port;
const host = process.env.HOST || serverConstants.defaultConfig.host;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send(serverConstants.serverHealthCheckMessage);
});

app.use("/exchanges", exchanges);

app.listen(port, () => {
  logger.info(serverConstants.serverHealthCheckMessage);
  console.log(`Server is running on http://${host}:${port}`);
});
