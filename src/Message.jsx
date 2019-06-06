import React, { Component } from "react";

class Message extends Component {
  checkURL = url => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  render() {
    const { message } = this.props;
    const url = ["http", "png", "gif", "jpeg"];

    if (message.username === "__system__") {
      return <div className="message system">{message.content}</div>;
    }
    return (
      <div className="message">
        <span style={{ color: message.color }} className="message-username">
          {message.username}
        </span>
        {this.checkURL(message.content) ? (
          <span className="message-content">
            <img src={message.content} />
          </span>
        ) : (
          <span className="message-content">{message.content}</span>
        )}
      </div>
    );
  }
}

export default Message;
