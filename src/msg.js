import React, { Component } from 'react';
import './chat.css'; // Include your CSS file

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isTyping: {},
    };
  }

  sendMessage = (sender, senderAvatar, message) => {
    setTimeout(() => {
      const messageFormat = this.detectURL(message);
      const newMessageItem = {
        id: this.state.messages.length + 1,
        sender,
        senderAvatar,
        message: messageFormat,
      };
      this.setState({ messages: [...this.state.messages, newMessageItem] });
      this.resetTyping(sender);
    }, 400);
  };

  typing = (writer) => {
    if (!this.state.isTyping[writer]) {
      const stateTyping = { ...this.state.isTyping };
      stateTyping[writer] = true;
      this.setState({ isTyping: stateTyping });
    }
  };

  resetTyping = (writer) => {
    const stateTyping = { ...this.state.isTyping };
    stateTyping[writer] = false;
    this.setState({ isTyping: stateTyping });
  };

  detectURL = (message) => {
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, (urlMatch) => {
      return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
    });
  };

  render() {
    const users = {
      Shun: { name: 'Shun', avatar: 'https://i.pravatar.cc/150?img=32' },
      Gabe: { name: 'Gabe', avatar: 'https://i.pravatar.cc/150?img=56' },
    };

    return (
      <div className="chatApp__room">
        {Object.keys(users).map((key) => (
          <ChatBox
            key={key}
            owner={users[key].name}
            ownerAvatar={users[key].avatar}
            sendMessage={this.sendMessage}
            typing={this.typing}
            resetTyping={this.resetTyping}
            messages={this.state.messages}
            isTyping={this.state.isTyping}
          />
        ))}
      </div>
    );
  }
}

class ChatBox extends Component {
  render() {
    // Your ChatBox component logic
    return <div className="chatBox">ChatBox Component</div>;
  }
}

class Title extends Component {
  render() {
    // Your Title component logic
    return <div className="title">Title Component</div>;
  }
}

class InputMessage extends Component {
  render() {
    // Your InputMessage component logic
    return <div className="inputMessage">InputMessage Component</div>;
  }
}

class TypingIndicator extends Component {
  render() {
    // Your TypingIndicator component logic
    return <div className="typingIndicator">TypingIndicator Component</div>;
  }
}

class MessageList extends Component {
  render() {
    // Your MessageList component logic
    return <div className="messageList">MessageList Component</div>;
  }
}

class MessageItem extends Component {
  render() {
    // Your MessageItem component logic
    return <div className="messageItem">MessageItem Component</div>;
  }
}


export default ChatApp;
