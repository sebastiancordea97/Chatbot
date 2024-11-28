import { Request, Response } from "express";
import exchangesRepository from "../data/repositories/exchanges";
import serverConstants from "../constants";
import Exchange from "../models/exchange";
import logger from "../services/loggerService";

const getExchanges = (req: Request, res: Response): void => {
  try {
    const data: Exchange[] = exchangesRepository.getExchanges();
    res.status(200).send(data);
  } catch (error: Error | any) {
    logger.error(
      error?.message ||
        `${serverConstants.errorMessages.dataGetFail} ${getExchanges.name} controller`
    );
    res.status(500).send([]);
  }
};

const exchangesController = {
  getExchanges,
};

export default exchangesController;
