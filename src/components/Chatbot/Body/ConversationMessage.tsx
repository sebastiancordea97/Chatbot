import chatbotImageLseg from "../../../assets/chatbot-lseg.png";
import { Message } from "../../../types/chatbot";
import { Sender } from "../../../enums/chatbot";

const ConversationMessage = (props: { message: Message }) => {
  return props.message.sender === Sender.bot ? (
    // bot message
    <div className="bot-conversation-container">
      <img
        className="bot-conversation-image"
        src={chatbotImageLseg}
        alt="Chatbot"
        width={15}
        height={15}
      />
      {props.message.isValid ? (
        <span className="bot-initial-message text-gray">
          {props.message.isTyping
            ? props.message.isTypingMessage
            : props.message.content}
        </span>
      ) : (
        <div className="bot-conversation-message">
          <span style={{ color: "red" }}>{props.message.content}</span>
        </div>
      )}
    </div>
  ) : (
    // user message
    <div className="user-conversation-container">
      <div className="user-conversation-message">
        <span className="text-gray">{props.message.content}</span>
      </div>
    </div>
  );
};

export default ConversationMessage;
