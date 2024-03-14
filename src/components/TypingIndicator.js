import React, { Component } from 'react';

class TypingIndicator extends Component {
  render() {
    const { owner, isTyping } = this.props;
    let typersDisplay = '';
    let countTypers = 0;

    for (let key in isTyping) {
      if (key !== owner && isTyping[key]) {
        typersDisplay += ', ' + key;
        countTypers++;
      }
    }

    typersDisplay = typersDisplay.substr(1);
    typersDisplay += countTypers > 1 ? ' are ' : ' is ';

    return countTypers > 0 ? (
      <div className="chatApp__convTyping">
        {typersDisplay} writing
        <span className="chatApp__convTypingDot"></span>
      </div>
    ) : (
      <div className="chatApp__convTyping"></div>
    );
  }
}

export default TypingIndicator;
