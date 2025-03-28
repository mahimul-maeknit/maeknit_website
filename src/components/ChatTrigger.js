import React from "react";
import "../styles/chat-trigger.css";

const ChatTrigger = ({ onClick }) => {
  return (
    <button
      className="chat-trigger"
      onClick={onClick}
      aria-label="Open Onboarding Form"
    >
      💬
    </button>
  );
};

export default ChatTrigger;
