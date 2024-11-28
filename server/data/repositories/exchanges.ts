import Exchange from "../../models/exchange";
import serverConstants from "../../constants";
import data from "../data.json";
import logger from "../../services/loggerService";

const getExchanges = (): Exchange[] | [] => {
  try {
    return (data as Exchange[]) || [];
  } catch (error: Error | any) {
    logger.error(
      error?.message ||
        `${serverConstants.errorMessages.dataGetFail} ${getExchanges.name} repository`
    );
    return [];
  }
};

const exchangesRepository = {
  getExchanges,
};

export default exchangesRepository;
