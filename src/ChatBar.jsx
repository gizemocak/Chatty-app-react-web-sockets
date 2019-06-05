import React, { Component } from "react";

class ChatBar extends Component {
  handleKeyDown = e => {
    let input = e.target.value;
    if (e.keyCode === 13) {
      this.props.handleNewMessage(input);
      input = "";
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
      </form>
    );
  }
}

export default ChatBar;
