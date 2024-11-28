import { useState } from "react";
import disabledSendImage from "../../../assets/send-disabled.png";
import enabledSendImage from "../../../assets/send-enabled.png";
import { MenuItem, Sender } from "../../../enums/chatbot";
import { ChatHandlers, ChatState } from "../../../types/chatbot";
import chatbotConstants from "../../../constants/chatbot";
import chatbotUtils from "../../../utils/chatbot";

const ChatFooter = (props: {
  chatStateProp: ChatState;
  chatHandlersProp: ChatHandlers;
}) => {
  const {
    exchanges,
    selectedExchangeName,
    startConversation,
    isConversationLimitReached,
    activeMenuItem,
  } = props.chatStateProp;
  const {
    addNextMessage,
    setActiveMenuItem,
    handleGoBack,
    setSelectedStockName,
    setSelectedExchangeName,
    clearChatHistory,
  } = props.chatHandlersProp;

  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);

  const sanitizeInputValue = (value: string): string => {
    if (!value) {
      return "";
    }

    value = value.replace(/[<>]/g, "");
    value = value.replace(/[^a-zA-Z0-9,.\s]/g, "");

    return value;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;

    value = sanitizeInputValue(value);

    if (value.length > 0) {
      let matchedSuggestions: string[] = [];
      if (activeMenuItem === MenuItem.exchanges) {
        matchedSuggestions = chatbotUtils.getExchangesSuggestions(
          exchanges,
          value
        );
      } else if (activeMenuItem === MenuItem.stocks) {
        matchedSuggestions = chatbotUtils.getStocksSuggestions(
          exchanges,
          selectedExchangeName,
          value
        )
        if (value.toLowerCase().startsWith("b")) {
          matchedSuggestions = [...matchedSuggestions, "Back to exchanges"];
        }
      } else if (activeMenuItem === MenuItem.stockPrice) {
        if (value.toLowerCase().startsWith("b")) {
          matchedSuggestions = ["Back to stocks", "Back to exchanges"];
        }
      }

      setFilteredSuggestions(matchedSuggestions);
      setActiveSuggestionIndex(-1);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    if (value.length <= chatbotConstants.maxInputLength) {
      setInputValue(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    switch (event.key) {
      case "ArrowDown":
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case "ArrowUp":
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
        break;
      case "Tab":
      case "ArrowRight":
        if (activeSuggestionIndex >= 0) {
          setInputValue(filteredSuggestions[activeSuggestionIndex]);
          setShowSuggestions(false);
        }
        break;
      case "Enter":
        if (inputValue.length > 0) {
          handleSend();
        }
        break;
      default:
        return;
    }
  };

  const addExchangeMenuMessage = (value: string): void => {
    addNextMessage({
      sender: Sender.bot,
      content: value,
      isValid: true,
      fromMenu: MenuItem.exchanges,
    });
    addNextMessage({
      sender: Sender.user,
      content: value,
      isValid: true,
    });

    if (exchanges.some((exchange) => exchange.stockExchange === value)) {
      setSelectedExchangeName(value);
      setActiveMenuItem(MenuItem.stocks);
    } else {
      addNextMessage({
        sender: Sender.bot,
        content: chatbotConstants.invalidInputMessage,
        isValid: false,
      });
    }
  };

  const addStockMenuMessage = (value: string): void => {
    if (value === "Back to exchanges") {
      handleGoBack(MenuItem.exchanges)();
      return;
    }

    addNextMessage({
      sender: Sender.bot,
      content: value,
      isValid: true,
      fromMenu: MenuItem.stocks,
    });

    addNextMessage({
      sender: Sender.user,
      content: value,
      isValid: true,
    });

    if (
      chatbotUtils
        .getStocksByExchangeName(exchanges, selectedExchangeName)
        ?.some((stock) => stock.stockName === value)
    ) {
      setSelectedStockName(value);
      setActiveMenuItem(MenuItem.stockPrice);
    } else {
      addNextMessage({
        sender: Sender.bot,
        content: chatbotConstants.invalidInputMessage,
        isValid: false,
      });
    }
  };

  const addStockPriceMenuMessage = (value: string): void => {
    if (value === "Back to stocks") {
      handleGoBack(MenuItem.stocks)();
      return;
    }
    if (value === "Back to exchanges") {
      handleGoBack(MenuItem.exchanges)();
      return;
    }

    addNextMessage({
      sender: Sender.user,
      content: value,
      isValid: true,
    });

    addNextMessage({
      sender: Sender.bot,
      content: chatbotConstants.invalidInputMessage,
      isValid: false,
    });
  };

  const handleSend = (): void => {
    let value = sanitizeInputValue(inputValue);

    switch (activeMenuItem) {
      case MenuItem.exchanges:
        addExchangeMenuMessage(value);
        break;
      case MenuItem.stocks:
        addStockMenuMessage(value);
        break;
      case MenuItem.stockPrice:
        addStockPriceMenuMessage(value);
        break;
      default:
        break;
    }

    setInputValue("");
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  const isSendEnabled = (): boolean => {
    return (
      inputValue.length > 0 && startConversation && !isConversationLimitReached
    );
  };

  const isInputEnabled = (): boolean => {
    return (
      startConversation && !isConversationLimitReached && exchanges.length > 0
    );
  };

  return (
    <div>
      <div className="chat-footer">
        <input
          className="search-input"
          type="text"
          placeholder="Please pick an option"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={!isInputEnabled()}
        />
        <button
          className="footer-button"
          onClick={handleSend}
          disabled={!isSendEnabled()}
        >
          <img
            src={isSendEnabled() ? enabledSendImage : disabledSendImage}
            width={15}
            height={15}
            alt=""
          />
        </button>
        <button
          className="footer-button clear-button"
          onClick={clearChatHistory}
        >
          {"🗑️"}
        </button>
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`suggestion ${
                index === activeSuggestionIndex ? "active" : ""
              }`}
              onMouseDown={() => {
                setInputValue(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatFooter;
