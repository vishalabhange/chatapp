import React, { Component } from 'react';
import MessageItem from './MessageItem';

class MessageList extends Component {
  render() {
    const { owner, messages } = this.props;

    return (
      <div className="chatApp__convTimeline">
        {messages.slice(0).reverse().map((messageItem) => (
          <MessageItem
            key={messageItem.id}
            owner={owner}
            sender={messageItem.sender}
            senderAvatar={messageItem.senderAvatar}
            message={messageItem.message}
          />
        ))}
      </div>
    );
  }
}

export default MessageList;
