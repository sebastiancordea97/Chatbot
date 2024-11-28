import Stock from "../../server/models/stocks";

export default interface Exchange {
    code: string;
    stockExchange: string;
    topStocks: Stock[];
}