import React, { Component } from "react";
import ChatBar from "../src/ChatBar.jsx";
import MessageList from "../src/MessageList.jsx";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: "Bob",
      messages: []
    };
  }
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
