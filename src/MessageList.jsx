import React, { Component } from "react";
import Message from "../src/Message.jsx";
class MessageList extends Component {
  handleRenderMessage = () => {
    const { messages } = this.props;
    return messages.map(message => {
      return (
        <div key={message.id}>
          <Message message={message} />
        </div>
      );
    });
  };

  render() {
    const { userCount } = this.props;
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <div className="usercount">
            {userCount} {userCount === 1 ? "User" : "Users"} Online
          </div>
        </nav>
        <main className="messages">{this.handleRenderMessage()}</main>
      </div>
    );
  }
}

export default MessageList;
