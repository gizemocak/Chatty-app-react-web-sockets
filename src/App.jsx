import React, { Component } from "react";
import ChatBar from "../src/ChatBar.jsx";
import MessageList from "../src/MessageList.jsx";
// import "../styles/home.scss";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Bob" },
      messages: []
    };
  }

  componentDidMount() {
    // Open a connection
    this.connection = new WebSocket("ws://localhost:3001");

    // When a connection is made
    this.connection.onopen = function() {
      console.log("Opened connection ");
    };

    // listen to onmessage event
    this.connection.onmessage = event => {
      const returnedData = JSON.parse(event.data);
      // add the new message to state
      const newMessage = {
        username: returnedData.data.username,
        content: returnedData.data.content,
        id: returnedData.id
      };
      this.setState({
        messages: this.state.messages.concat([newMessage])
      });
    };
  }

  handleNewMessage = input => {
    const newMessage = {
      username: this.state.currentUser.name,
      content: input
    };
    this.sendDataToServer(newMessage);
  };

  sendDataToServer = data => {
    var msg = {
      type: "message",
      data
    };

    // Send the msg object as a JSON-formatted string.
    this.connection.send(JSON.stringify(msg));
  };

  updateUserName = currentUser => {
    this.setState({ currentUser: { name: currentUser } });
  };

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          handleNewMessage={this.handleNewMessage}
          updateUserName={this.updateUserName}
        />
      </div>
    );
  }
}
export default App;
