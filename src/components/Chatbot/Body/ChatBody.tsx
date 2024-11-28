import { useEffect, useRef } from "react";
import { MenuItem, Sender } from "../../../enums/chatbot";
import chatbotConstants from "../../../constants/chatbot";
import chatbotUtils from "../../../utils/chatbot";

import ExchangesMenu from "./ExchangesMenu";
import StocksMenu from "./StocksMenu";
import StockPriceMenu from "./StockPriceMenu";
import ConversationMessage from "./ConversationMessage";
import { ChatState, ChatHandlers } from "../../../types/chatbot";

const ChatBody = (props: {
  chatStateProp: ChatState;
  chatHandlersProp: ChatHandlers;
}) => {
  const {
    exchanges,
    selectedExchangeName,
    selectedStockName,
    startConversation,
    isTyping,
    displayedMessage,
    conversation,
    isConversationLimitReached,
    activeMenuItem,
  } = props.chatStateProp;
  const {
    addNextMessage,
    setActiveMenuItem,
    handleGoBack,
    setSelectedStockName,
    setSelectedExchangeName,
  } = props.chatHandlersProp;

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect((): void => {
    scrollToBottom();
  }, [conversation]);

  const handleOptionClick = (option: string) => (): void => {
    if (activeMenuItem === MenuItem.exchanges) {
      addNextMessage({
        sender: Sender.bot,
        content: option,
        isValid: true,
        fromMenu: MenuItem.exchanges,
      });
      addNextMessage({
        sender: Sender.user,
        content: option,
        isValid: true,
      });
      setSelectedExchangeName(option);
      setActiveMenuItem(MenuItem.stocks);
    } else if (activeMenuItem === MenuItem.stocks) {
      addNextMessage({
        sender: Sender.bot,
        content: option,
        isValid: true,
        fromMenu: MenuItem.stocks,
      });
      addNextMessage({
        sender: Sender.user,
        content: option,
        isValid: true,
      });
      setSelectedStockName(option);
      setActiveMenuItem(MenuItem.stockPrice);
    }
  };

  return (
    <div className="chat-body">
      {exchanges.length === 0 ? (
        // Show no exchanges message
        <ConversationMessage
          message={{
            sender: Sender.bot,
            content: chatbotConstants.noExchangesMessage,
            isValid: true,
          }}
        />
      ) : (
        <>
          {/* Show initial message */}
          <ConversationMessage
            message={{
              sender: Sender.bot,
              content: displayedMessage,
              isValid: true,
              isTyping: isTyping,
              isTypingMessage: chatbotConstants.isTypingMessage,
            }}
          />

          {/* Show conversation  */}
          {startConversation &&
            conversation.map((message, messageIndex) => (
              <div key={messageIndex}>
                {message.sender === Sender.bot ? (
                  // Show valid bot message
                  message.isValid ? (
                    (message.fromMenu === MenuItem.exchanges && (
                      <ExchangesMenu
                        exchanges={exchanges}
                        active={false}
                        message={message}
                        handleOptionClick={handleOptionClick}
                      />
                    )) ||
                    (message.fromMenu === MenuItem.stocks && (
                      <StocksMenu
                        stocks={chatbotUtils.getStocksByExchangeName(
                          exchanges,
                          selectedExchangeName
                        )}
                        active={false}
                        message={message}
                        handleGoBack={handleGoBack}
                        handleOptionClick={handleOptionClick}
                      />
                    )) ||
                    (message.fromMenu === MenuItem.stockPrice && (
                      <StockPriceMenu
                        stock={chatbotUtils.getSelectedStock(
                          exchanges,
                          selectedExchangeName,
                          selectedStockName
                        )}
                        active={false}
                        message={message}
                        handleGoBack={handleGoBack}
                      />
                    ))
                  ) : (
                    // Show invalid bot message
                    <ConversationMessage message={message} />
                  )
                ) : (
                  // Show user message
                  <ConversationMessage message={message} />
                )}
              </div>
            ))}

          {/* Scroll to bottom ref */}
          <div ref={messagesEndRef} />

          {/* Next Message  */}
          {startConversation &&
            (isConversationLimitReached ? (
              // Show conversation limit reached message
              <ConversationMessage
                message={{
                  sender: Sender.bot,
                  content: chatbotConstants.convsersationLimitReachedMessage,
                  isValid: true,
                }}
              />
            ) : (
              exchanges.length > 0 &&
              ((activeMenuItem === MenuItem.exchanges && (
                <ExchangesMenu
                  exchanges={exchanges}
                  handleOptionClick={handleOptionClick}
                  active={true}
                  message={null}
                />
              )) ||
                (activeMenuItem === MenuItem.stocks && (
                  <StocksMenu
                    stocks={chatbotUtils.getStocksByExchangeName(
                      exchanges,
                      selectedExchangeName
                    )}
                    active={true}
                    message={null}
                    handleGoBack={handleGoBack}
                    handleOptionClick={handleOptionClick}
                  />
                )) ||
                (activeMenuItem === MenuItem.stockPrice && (
                  <StockPriceMenu
                    stock={chatbotUtils.getSelectedStock(
                      exchanges,
                      selectedExchangeName,
                      selectedStockName
                    )}
                    active={true}
                    message={null}
                    handleGoBack={handleGoBack}
                  />
                )))
            ))}
        </>
      )}
    </div>
  );
};

export default ChatBody;
