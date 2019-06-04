import React, { Component } from "react";
import Message from "../src/Message.jsx";
class MessageList extends Component {
  handleRenderMessage = () => {
    const { messages } = this.props;
    return messages.map(message => {
      return (
        <li key={message.id}>
          <Message message={message} />
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <main className="messages">
          <ul>{this.handleRenderMessage()}</ul>
        </main>
      </div>
    );
  }
}

export default MessageList;
