import React, { Component } from "react";

class ChatBar extends Component {
  handleKeyDown = e => {
    let input = e.target.value;
    if (input && e.keyCode === 13) {
      this.props.handleNewMessage(input);
      document.querySelector("input.chatbar-message").value = "";
    }
  };

  handleChangeUserName = e => {
    if (e.keyCode === 13) {
      let input = e.target.value;
      this.props.updateUserName(input);
    }
  };

  render() {
    const { currentUser } = this.props;
    return (
      <form className="chatbar">
        <input
          className="chatbar-username"
          placeholder={currentUser}
          onKeyUp={this.handleChangeUserName}
        />
        <input
          type="text"
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.handleKeyDown}
        />
        <div className="error" />
      </form>
    );
  }
}

export default ChatBar;
