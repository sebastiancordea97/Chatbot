import { AxiosResponse } from "axios";
import Exchange from "../models/exchange";
import Stock from "../models/stocks";

const getStocksByExchangeName = (
  exchanges: Exchange[],
  selectedExchangeName: string
): Stock[] => {
  return (
    exchanges.find(
      (exchange) => exchange.stockExchange === selectedExchangeName
    )?.topStocks || []
  );
};

const getSelectedStock = (
  exchanges: Exchange[],
  selectedExchangeName: string,
  selectedStockName: string
): Stock => {
  return (
    getStocksByExchangeName(exchanges, selectedExchangeName)?.find(
      (stock) => stock.stockName === selectedStockName
    ) || { code: "", stockName: "", price: 0 }
  );
};

const getExchangesSuggestions = (
  exchanges: Exchange[],
  value: string
): string[] => {
  return exchanges
    .filter((exchange) => {
      return exchange.stockExchange
        .toLowerCase()
        .startsWith(value.toLowerCase());
    })
    .map((exchange) => exchange.stockExchange);
};

const getStocksSuggestions = (
  exchanges: Exchange[],
  selectedExchangeName: string,
  value: string
) => {
  return getStocksByExchangeName(exchanges, selectedExchangeName)
    ?.filter((stock) => {
      return stock.stockName.toLowerCase().startsWith(value.toLowerCase());
    })
    .map((stock) => stock.stockName);
};

const isResponseValid = (response: AxiosResponse): boolean => {
  if (
    response.data &&
    Array.isArray(response.data) &&
    response.data.length > 0
  ) {
    return true;
  }

  return false;
};

const chatbotUtils = {
  getStocksByExchangeName,
  getSelectedStock,
  getExchangesSuggestions,
  getStocksSuggestions,
  isResponseValid,
};

export default chatbotUtils;
