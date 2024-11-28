import chatbotImageLight from "../../../assets/chatbot-light.png";

const ChatHeader = () => {
  return (
    <div className="chat-header background-lseg">
      <img src={chatbotImageLight} alt="Chatbot" width={30} height={30} />
      <span className="text-white">LSEG chatbot</span>
    </div>
  );
};

export default ChatHeader;