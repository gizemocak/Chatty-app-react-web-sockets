import React, { Component } from "react";

class Message extends Component {
  render() {
    const { message } = this.props;

    if (message.username === "__system__") {
      return <div className="message system">{message.content}</div>;
    }
    if (message.color) {
      console.log("colooooor", message.color);
    }
    return (
      <div className="message">
        <span style={{ color: message.color }} className="message-username">
          {message.username}
        </span>
        <span className="message-content">{message.content}</span>
      </div>
    );
  }
}

export default Message;
