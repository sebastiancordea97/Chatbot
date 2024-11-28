import chatbotImageLseg from "../../../assets/chatbot-lseg.png";
import { MenuItem } from "../../../enums/chatbot";
import Stock from "../../../models/stocks";
import { Message } from "../../../types/chatbot";

const StockPriceMenu = (props: {
  stock: Stock;
  active: boolean;
  message: Message | null;
  handleGoBack: (nextMenuItem: MenuItem) => () => void;
}): JSX.Element => {
  return (
    <div className="bot-conversation-container">
      <img
        className="bot-conversation-image"
        src={chatbotImageLseg}
        alt="Chatbot"
        width={15}
        height={15}
      />
      <div className="bot-conversation-message">
        <span className="text-gray">
          {props.active
            ? <>Stock price of <b>{props.stock.stockName}</b> is <b>${props.stock.price}</b>.</>
            : props.message?.content}
        </span>
        {props.active && (
          <ul>
            <li
              className="text-gray list-item"
              onClick={props.handleGoBack(
                MenuItem.stocks
              )}
            >
              Back to stocks
            </li>
            <li
              className="text-gray list-item"
              onClick={props.handleGoBack(
                MenuItem.exchanges
              )}
            >
              Back to exchanges
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default StockPriceMenu;
