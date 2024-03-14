import React, { Component } from 'react';

class Title extends Component {
  render() {
    const { owner } = this.props;
    return <div className="chatApp__convTitle">{owner}'s display</div>;
  }
}

export default Title;
