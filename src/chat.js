import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./chat.css"; // Include your CSS file

/* ========== */
/* Title component */
class Title extends Component {
  render() {
    return (
      <div className={"chatApp__convTitle"}>{this.props.owner}'s display</div>
    );
  }
}
/* end Title component */
/* ========== */

/* ========== */
/* InputMessage component - used to type the message */
class InputMessage extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
  }

  handleSendMessage(event) {
    event.preventDefault();
    if (this.messageInput.value.length > 0) {
      this.props.sendMessageLoading(
        this.ownerInput.value,
        this.ownerAvatarInput.value,
        this.messageInput.value
      );
      this.messageInput.value = "";
    }
  }

  handleTyping(event) {
    if (this.messageInput.value.length > 0) {
      this.props.typing(this.ownerInput.value);
    } else {
      this.props.resetTyping(this.ownerInput.value);
    }
  }

  render() {
    const loadingClass = this.props.isLoading
      ? "chatApp__convButton--loading"
      : "";
    const sendButtonIcon = <i className={"material-icons"}>send</i>;

    return (
      <form onSubmit={this.handleSendMessage}>
        <input
          type="hidden"
          ref={(owner) => (this.ownerInput = owner)}
          value={this.props.owner}
        />
        <input
          type="hidden"
          ref={(ownerAvatar) => (this.ownerAvatarInput = ownerAvatar)}
          value={this.props.ownerAvatar}
        />
        <input
          type="text"
          ref={(message) => (this.messageInput = message)}
          className={"chatApp__convInput"}
          placeholder="Text message"
          onKeyDown={this.handleTyping}
          onKeyUp={this.handleTyping}
          tabIndex="0"
        />
        <div
          className={"chatApp__convButton " + loadingClass}
          onClick={this.handleSendMessage}
        >
          {sendButtonIcon}
        </div>
      </form>
    );
  }
}
/* end InputMessage component */
/* ========== */

/* ========== */
/* TypingIndicator component */
class TypingIndicator extends Component {
  render() {
    let typersDisplay = "";
    let countTypers = 0;

    for (let key in this.props.isTyping) {
      if (key !== this.props.owner && this.props.isTyping[key]) {
        typersDisplay += ", " + key;
        countTypers++;
      }
    }

    typersDisplay = typersDisplay.substr(1);
    typersDisplay += countTypers > 1 ? " are " : " is ";

    if (countTypers > 0) {
      return (
        <div className={"chatApp__convTyping"}>
          {typersDisplay} writing
          <span className={"chatApp__convTypingDot"}></span>
        </div>
      );
    }

    return <div className={"chatApp__convTyping"}></div>;
  }
}
/* end TypingIndicator component */
/* ========== */

/* ========== */
/* MessageList component - contains all messages */
class MessageList extends Component {
  render() {
    return (
      <div className={"chatApp__convTimeline"}>
        {this.props.messages
          .slice(0)
          .reverse()
          .map((messageItem) => (
            <MessageItem
              key={messageItem.id}
              owner={this.props.owner}
              sender={messageItem.sender}
              senderAvatar={messageItem.senderAvatar}
              message={messageItem.message}
            />
          ))}
      </div>
    );
  }
}
/* end MessageList component */
/* ========== */

/* ========== */
/* MessageItem component - composed of a message and the sender's avatar */
class MessageItem extends Component {
  render() {
    let messagePosition =
      this.props.owner === this.props.sender
        ? "chatApp__convMessageItem--right"
        : "chatApp__convMessageItem--left";

    return (
      <div
        className={"chatApp__convMessageItem " + messagePosition + " clearfix"}
      >
        <img
          src={this.props.senderAvatar}
          alt={this.props.sender}
          className="chatApp__convMessageAvatar"
        />
        <div
          className="chatApp__convMessageValue"
          dangerouslySetInnerHTML={{ __html: this.props.message }}
        ></div>
      </div>
    );
  }
}
/* end MessageItem component */
/* ========== */

/* ========== */
/* ChatBox component - composed of Title, MessageList, TypingIndicator, InputMessage */
class ChatBox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
    };
    this.sendMessageLoading = this.sendMessageLoading.bind(this);
  }

  sendMessageLoading(sender, senderAvatar, message) {
    this.setState({ isLoading: true });
    this.props.sendMessage(sender, senderAvatar, message);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 400);
  }

  render() {
    return (
      <div className={"chatApp__conv"}>
        <Title owner={this.props.owner} />
        <MessageList owner={this.props.owner} messages={this.props.messages} />
        <div className={"chatApp__convSendMessage clearfix"}>
          <TypingIndicator
            owner={this.props.owner}
            isTyping={this.props.isTyping}
          />
          <InputMessage
            isLoading={this.state.isLoading}
            owner={this.props.owner}
            ownerAvatar={this.props.ownerAvatar}
            sendMessage={this.props.sendMessage}
            sendMessageLoading={this.sendMessageLoading}
            typing={this.props.typing}
            resetTyping={this.props.resetTyping}
          />
        </div>
      </div>
    );
  }
}
/* end ChatBox component */
/* ========== */

/* ========== */
/* ChatRoom component - composed of multiple ChatBoxes */
class ChatRoom extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [
        {
          id: 1,
          sender: "Shun",
          senderAvatar: "https://i.pravatar.cc/150?img=32",
          message: "Hello 👋",
        },
        {
          id: 2,
          sender: "Gabe",
          senderAvatar: "https://i.pravatar.cc/150?img=56",
          message: "Hey!",
        },
        {
          id: 3,
          sender: "Gabe",
          senderAvatar: "https://i.pravatar.cc/150?img=56",
          message: "How are you?",
        },
        {
          id: 4,
          sender: "Shun",
          senderAvatar: "https://i.pravatar.cc/150?img=32",
          message: "Great! It's been a while... 🙃",
        },
        {
          id: 5,
          sender: "Gabe",
          senderAvatar: "https://i.pravatar.cc/150?img=56",
          message: "Indeed.... We're gonna have to fix that. 🌮🍻",
        },
      ],
      isTyping: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.typing = this.typing.bind(this);
    this.resetTyping = this.resetTyping.bind(this);
  }

  sendMessage(sender, senderAvatar, message) {
    setTimeout(() => {
      let messageFormat = this.detectURL(message);
      let newMessageItem = {
        id: this.state.messages.length + 1,
        sender: sender,
        senderAvatar: senderAvatar,
        message: messageFormat,
      };
      this.setState({ messages: [...this.state.messages, newMessageItem] });
      this.resetTyping(sender);
    }, 400);
  }

  typing(writer) {
    if (!this.state.isTyping[writer]) {
      let stateTyping = this.state.isTyping;
      stateTyping[writer] = true;
      this.setState({ isTyping: stateTyping });
    }
  }

  resetTyping(writer) {
    let stateTyping = this.state.isTyping;
    stateTyping[writer] = false;
    this.setState({ isTyping: stateTyping });
  }

  detectURL(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (urlMatch) {
      return '<a href="' + urlMatch + '">' + urlMatch + "</a>";
    });
  }

  render() {
    const users = {
      Shun: { name: "Shun", avatar: "https://i.pravatar.cc/150?img=32" },
      Gabe: { name: "Gabe", avatar: "https://i.pravatar.cc/150?img=56" },
    };

    const chatBoxes = Object.keys(users).map((key) => (
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
    ));

    return <div className={"chatApp__room"}>{chatBoxes}</div>;
  }
}
/* end ChatRoom component */
/* ========== */

/* render the chatroom */
ReactDOM.render(<ChatRoom />, document.getElementById("chatApp"));
