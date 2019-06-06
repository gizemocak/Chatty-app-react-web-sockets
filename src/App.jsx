import React, { Component } from "react";
import ChatBar from "../src/ChatBar.jsx";
import MessageList from "../src/MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [],
      userCount: null,
      userColor: ""
    };
  }

  componentDidMount() {
    // Open a connection
    this.connection = new WebSocket("ws://localhost:3001");

    // When a connection is made
    this.connection.onopen = function(e) {
      console.log("Opened connection ");
    };

    // listen to onmessage event
    this.connection.onmessage = event => {
      const returnedData = JSON.parse(event.data);
      // // add the new message to state

      console.log(event.data);

      switch (returnedData.type) {
        case "incomingMessage":
          // handle incoming message
          const newMessage = {
            username: returnedData.username,
            content: returnedData.content,
            id: returnedData.id,
            color: returnedData.color
          };
          this.setState({
            messages: this.state.messages.concat([newMessage])
          });
          break;

        case "incomingNotification":
          // handle incoming notification
          console.log("notification received");
          const newNotification = {
            username: "__system__",
            content: returnedData.content,
            id: returnedData.id
          };
          this.setState({
            messages: this.state.messages.concat([newNotification])
          });
          break;

        case "usercount":
          //handle user count
          console.log("userCount", returnedData);
          this.setState({ userCount: returnedData.users });
          break;

        case "usercolor":
          console.log("userColor", returnedData);
          this.setState({ userColor: returnedData.color });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + returnedData.type);
      }
    };
  }

  sendDataToServer = data => {
    // Send the msg object as a JSON-formatted string.
    this.connection.send(JSON.stringify(data));
  };

  handleNewMessage = input => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: input,
      color: this.state.userColor
    };
    this.sendDataToServer(newMessage);
  };

  updateUserName = currentUser => {
    const oldUserName = this.state.currentUser;
    const newUserName = {
      type: "postNotification",
      content: `${oldUserName.name} has changed their name to ${currentUser}`
    };
    this.setState({ currentUser: { name: currentUser } });
    this.sendDataToServer(newUserName);
  };

  render() {
    return (
      <div>
        <MessageList
          currentUser={this.state.currentUser.name}
          //userColor={this.state.userColor}
          messages={this.state.messages}
          userCount={this.state.userCount}
        />
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
