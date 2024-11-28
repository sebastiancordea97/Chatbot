import "./styles/App.scss";
import { useState } from "react";
import Chatbot from "./components/Chatbot/Chatbot";
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = (): void => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {!isChatOpen && (
        <div className="text-gray welcome-message">
          <h1>Hello! 👋 </h1>
          <h2>
            Welcome to the <span className="text-lseg">LSEG chatbot!</span> To
            start a conversation, click the button in the bottom-right corner.
          </h2>
        </div>
      )}

      <div className="chat-container">
        <div>{isChatOpen && <Chatbot />}</div>

        <button className="chat-toggle-icon" onClick={toggleChat}>
          {isChatOpen ? "X" : "💬"}
        </button>
      </div>
    </div>
  );
}

export default App;
