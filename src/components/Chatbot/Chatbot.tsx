import { useState, useEffect } from "react";
import "../../styles/Chatbot.scss";

import { ChatHandlers, ChatState, Message } from "../../types/chatbot";
import { MenuItem, Sender } from "../../enums/chatbot";

import ChatHeader from "../Chatbot/Header/ChatHeader";
import ChatFooter from "./Footer/ChatFooter";
import ChatBody from "./Body/ChatBody";

import httpService from "../../services/httpService";
import Exchange from "../../models/exchange";

import chatbotConstants from "../../constants/chatbot";
import chatbotUtils from "../../utils/chatbot";
import { AxiosResponse } from "axios";

const Chatbot = (): JSX.Element => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [startConversation, setStartConversation] = useState<boolean>(false);
  const [isConversationLimitReached, setIsConversationLimitReached] =
    useState<boolean>(false);
  const [selectedStockName, setSelectedStockName] = useState<string>("");
  const [selectedExchangeName, setSelectedExchangeName] = useState<string>("");
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem>(
    MenuItem.exchanges
  );
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [displayedMessage, setDisplayedMessage] = useState<string>("");

  const addNextMessage = (message: Message): void => {
    setConversation((prevConversation) => [...prevConversation, message]);
  };

  const handleGoBack = (nextMenuItem: MenuItem) => (): void => {
    addNextMessage({
      sender: Sender.user,
      content: `Back to ${nextMenuItem}`,
      isValid: true,
    });

    setActiveMenuItem(nextMenuItem);
  };

  const handleTyping = (messageToType: string): void => {
    setTimeout(() => {
      setIsTyping(false);
      let index = 0;
      const inertvalId = setInterval(() => {
        if (index < messageToType.length) {
          setDisplayedMessage(messageToType.slice(0, index + 1));
          index++;
        } else {
          clearInterval(inertvalId);
          setStartConversation(true);
        }
      }, chatbotConstants.typingIntervalDelay);
    }, chatbotConstants.startTypingDelay);
  };

  const clearChatHistory = (): void => {
    setConversation([]);
    setIsConversationLimitReached(false);
    setActiveMenuItem(MenuItem.exchanges);
    localStorage.removeItem("conversation");
  };

  useEffect((): void => {
    httpService
      .get("/exchanges")
      .then((response: AxiosResponse) => {
        chatbotUtils.isResponseValid(response)
          ? setExchanges(response.data)
          : setExchanges([]);
      })
      .catch((error) => {
        setExchanges([]);
        console.error(error);
      });
  }, []);

  useEffect((): void => {
    const savedConversation = localStorage.getItem("conversation");
    if (savedConversation) {
      const parsedConversation = JSON.parse(savedConversation);
      if (Array.isArray(parsedConversation)) {
        setConversation(parsedConversation);
      }
      console.log(conversation);
      handleTyping(chatbotConstants.availableConversation);
    } else {
      handleTyping(chatbotConstants.initialMessage);
    }
  }, []);

  useEffect((): void => {
    if (conversation.length > 0) {
      localStorage.setItem("conversation", JSON.stringify(conversation));
    }
    if (conversation.length >= chatbotConstants.conversationLimit) {
      setIsConversationLimitReached(true);
    }
  }, [conversation]);

  const chatStateProp: ChatState = {
    conversation,
    exchanges,
    activeMenuItem,
    selectedExchangeName,
    selectedStockName,
    isTyping,
    displayedMessage,
    startConversation,
    isConversationLimitReached,
  };

  const chatHandlersProp: ChatHandlers = {
    addNextMessage,
    setActiveMenuItem,
    handleGoBack,
    setSelectedStockName,
    setSelectedExchangeName,
    clearChatHistory,
  };

  return (
    <div className="chat">
      <ChatHeader />
      <ChatBody
        chatStateProp={chatStateProp}
        chatHandlersProp={chatHandlersProp}
      />
      <ChatFooter
        chatStateProp={chatStateProp}
        chatHandlersProp={chatHandlersProp}
      />
    </div>
  );
};

export default Chatbot;
