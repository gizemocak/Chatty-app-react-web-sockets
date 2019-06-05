import React, { Component } from "react";

class ChatBar extends Component {
  // getUserInput = e => {
  //   e.preventDefault();
  //   let elm = e.target.elements;
  //   let input = elm.input.value;
  //   this.props.handleNewMessage(input);
  // };

  handleKeyDown = event => {
    let input = event.target.value;
    if (event.keyCode === 13) {
      this.props.handleNewMessage(input);
      input = "";
    }
  };

  render() {
    const { currentUser } = this.props;
    return (
      <form className="chatbar">
        <input
          className="chatbar-username"
          placeholder={currentUser}
          // name={currentUser}
        />
        <input
          type="text"
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          // name="input"
          onKeyUp={this.handleKeyDown}
        />
        {/* <button style={{ display: "none" }} type="submit" /> */}
      </form>
    );
  }
}

export default ChatBar;
