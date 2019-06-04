import React, { Component } from "react";
import ChatBar from "../src/ChatBar.jsx";
import MessageList from "../src/MessageList.jsx";
// import "../styles/home.scss";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Bob" },
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    };
  }

  componentDidMount() {
    // this is an "echo" websocket service for testing pusposes
    this.connection = new WebSocket("ws://localhost:3001");
    // listen to onmessage event
    this.connection.onmessage = evt => {
      console.log("meep", evt);
      // add the new message to state
      //   this.setState({
      //   messages : this.state.messages.concat([ evt.data ])
      // })
    };
  }

  handleNewMessage = input => {
    const newMessage = {
      username: this.state.currentUser.name,
      content: input
      //id: this.state.messages.length + 1
    };
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    // this.setState({ messages: newMessages });
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

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          handleNewMessage={this.handleNewMessage}
        />
      </div>
    );
  }
}
export default App;
