import chatbotImageLseg from "../../../assets/chatbot-lseg.png";
import { Message } from "../../../types/chatbot";
import { MenuItem } from "../../../enums/chatbot";
import Stock from "../../../models/stocks";

const StocksMenu = (props: {
  stocks: Stock[];
  active: boolean;
  message: Message | null;
  handleGoBack(nextMenuItem: MenuItem, stock?: Stock): () => void;
  handleOptionClick: (exchange: string) => () => void;
}) => {
  return (
    <div className="bot-conversation-container">
      <img
        className="bot-conversation-image "
        src={chatbotImageLseg}
        alt="Chatbot"
        width={15}
        height={15}
      />
      <div className="bot-conversation-message">
        <span className="text-gray">Please select a Stock.</span>
        <ul>
          {props.active ? (
            <>
              {props.stocks.map((stock) => (
                <li
                  className="text-gray list-item"
                  key={stock.stockName}
                  onClick={props.handleOptionClick(stock.stockName)}
                >
                  {stock.stockName}
                </li>
              ))}
              <li
                className="text-gray list-item"
                onClick={props.handleGoBack(MenuItem.exchanges)}
              >
                Back to exchanges
              </li>
            </>
          ) : (
            <>
              {props.stocks.length === 0 ? (
                <span className="text-gray list-item-disabled selected-option">{props.message?.content}</span>
              ) : (
                props.stocks.map((stock) => (
                  <li
                    className={`text-gray list-item-disabled ${
                      stock.stockName === props.message?.content
                        ? "selected-option"
                        : ""
                    }`}
                    key={stock.stockName}
                  >
                    {stock.stockName}
                  </li>
                ))
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StocksMenu;
