import React, { Component } from "react";
import Message from "../src/Message.jsx";
import { GithubPicker } from "react-color";

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

  //scroll to the bottom when entering the window and when new messages come in
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidUpdate() {
    console.log("componentDidUpdate");
    this.scrollToBottom();
  }

  handleColorChange = e => {
    console.log("color change event", e.hex);
    this.props.colorChange(e.hex);
  };

  render() {
    const { userCount } = this.props;
    const colorPicker = [
      "#B80000",
      "#DB3E00",
      "#FCCB00",
      "#008B02",
      "#006B76",
      "#1273DE",
      "#004DCF",
      "#5300EB"
    ];
    return (
      <div>
        <div>
          <GithubPicker
            colors={colorPicker}
            onChange={this.handleColorChange}
          />
        </div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <div className="usercount">
            {userCount} {userCount === 1 ? "User" : "Users"} Online
          </div>
        </nav>
        <main className="messages">{this.handleRenderMessage()}</main>
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

export default MessageList;
