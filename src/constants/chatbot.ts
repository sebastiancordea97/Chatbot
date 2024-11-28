const chatbotConstants = Object.freeze({
  startTypingDelay: 1000,
  typingIntervalDelay: 20,
  maxInputLength: 100,
  conversationLimit: 50,
  isTypingMessage: "LSEG chatbot is typing....",
  initialMessage: "Hello! Welcome to LSEG. I'm here to help you.",
  availableConversation: "Welcome back! Let's continue our conversation.",
  invalidInputMessage:
    "Invalid input. Please select a valid option!",
  noExchangesMessage:
    "Sorry, there are no exchanges available. Please try again later or contact support.",
  convsersationLimitReachedMessage:
    "You have reached the maximum number of messages! Please clear your conversations to start a new one.",
});

export default chatbotConstants;
