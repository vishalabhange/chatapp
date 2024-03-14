import React, { Component } from 'react';

class InputMessage extends Component {
  constructor(props) {
    super(props);
    this.messageInput = React.createRef();
  }

  handleSendMessage = (event) => {
    event.preventDefault();
    if (this.messageInput.current.value.length > 0) {
      this.props.sendMessageLoading(
        this.ownerInput.value,
        this.ownerAvatarInput.value,
        this.messageInput.current.value
      );
      this.messageInput.current.value = '';
    }
  };

  handleTyping = () => {
    if (this.messageInput.current.value.length > 0) {
      this.props.typing(this.ownerInput.value);
    } else {
      this.props.resetTyping(this.ownerInput.value);
    }
  };

  render() {
    const { isLoading, owner, ownerAvatar } = this.props;
    const loadingClass = isLoading ? 'chatApp__convButton--loading' : '';
    const sendButtonIcon = <i className="material-icons">send</i>;

    return (
      <form onSubmit={this.handleSendMessage}>
        <input type="hidden" ref={(owner) => (this.ownerInput = owner)} value={owner} />
        <input
          type="hidden"
          ref={(ownerAvatar) => (this.ownerAvatarInput = ownerAvatar)}
          value={ownerAvatar}
        />
        <input
          type="text"
          ref={this.messageInput}
          className="chatApp__convInput"
          placeholder="Text message"
          onKeyDown={this.handleTyping}
          onKeyUp={this.handleTyping}
          tabIndex="0"
        />
        <div className={`chatApp__convButton ${loadingClass}`} onClick={this.handleSendMessage}>
          {sendButtonIcon}
        </div>
      </form>
    );
  }
}

export default InputMessage;
