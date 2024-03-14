import React, { Component } from "react";
import ChatBox from "./components/ChatBox";
import "./chat.css";

const ChatApp = () => {
  const messagesData = [
    // Your initial messages data here
  ];

  const isTypingData = {
    // Your initial isTyping data here
  };

  const sendMessage = (sender, senderAvatar, message) => {
    // Your sendMessage logic here
  };

  const typing = (writer) => {
    // Your typing logic here
  };

  const resetTyping = (writer) => {
    // Your resetTyping logic here
  };

  const users = {
    Shun: { name: "Shun", avatar: "https://i.pravatar.cc/150?img=32" },
    Gabe: { name: "Gabe", avatar: "https://i.pravatar.cc/150?img=56" },
  };

  return (
    <div className="chatApp__room">
      {Object.keys(users).map((key) => (
        <ChatBox
          key={key}
          owner={users[key].name}
          ownerAvatar="https://i.pravatar.cc/150?img=32" // Replace with your actual owner avatar data
          messages={messagesData}
          isTyping={isTypingData}
          sendMessage={sendMessage}
          typing={typing}
          resetTyping={resetTyping}
        />
      ))}
    </div>
  );
};

export default ChatApp;
