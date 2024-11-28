import chatbotImageLseg from "../../../assets/chatbot-lseg.png";
import Exchange from "../../../models/exchange";
import { Message } from "../../../types/chatbot";

const ExchangesMenu = (props: {
  exchanges: Exchange[];
  active: boolean;
  message: Message | null;
  handleOptionClick: (exchange: string) => () => void;
}): JSX.Element => {
  return (
    <div className="bot-conversation-container">
      <img
        className="bot-conversation-image "
        src={chatbotImageLseg}
        alt="Chatbot"
        width={15}
        height={15}
      />

      {props.exchanges.length > 0 && (
        <div className="bot-conversation-message">
          <span className="text-gray">Please select a Stock Exchange.</span>
          <ul>
            {props.active
              ? props.exchanges.map((exchange) => (
                  <li
                    className="text-gray list-item"
                    key={exchange.stockExchange}
                    onClick={props.handleOptionClick(exchange.stockExchange)}
                  >
                    {exchange.stockExchange}
                  </li>
                ))
              : props.exchanges.map((exchange) => (
                  <li
                    className={`text-gray list-item-disabled ${
                      exchange.stockExchange === props.message?.content
                        ? "selected-option"
                        : ""
                    }`}
                    key={exchange.stockExchange}
                  >
                    {exchange.stockExchange}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExchangesMenu;
