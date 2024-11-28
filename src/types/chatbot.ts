import { MenuItem, Sender } from "../enums/chatbot";
import Exchange from "../models/exchange";
import Stock from "../models/stocks";

export type Message = {
    sender: Sender;
    content: string;
    isValid: boolean;
    fromMenu?: MenuItem | null;
    isTyping?: boolean;
    isTypingMessage?: string;
  };

export type ChatState = {
  exchanges: Exchange[];
  selectedExchangeName: string;
  selectedStockName: string;
  startConversation: boolean;
  isTyping: boolean;
  displayedMessage: string;
  conversation: Message[];
  isConversationLimitReached: boolean;
  activeMenuItem: MenuItem;
};

export type ChatHandlers = {
  addNextMessage: (message: Message) => void;
  setActiveMenuItem: (menuItem: MenuItem) => void;
  handleGoBack: (nextMenuItem: MenuItem, stock?: Stock) => () => void;
  setSelectedStockName: (stock: string) => void;
  setSelectedExchangeName: (exchange: string) => void;
  clearChatHistory: () => void;
}