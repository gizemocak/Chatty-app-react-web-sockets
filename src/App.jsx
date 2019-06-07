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
    // this.connection.onopen = function(e) {
    //   console.log("Opened connection ");
    // };
    // Listen to onmessage event
    this.connection.onmessage = event => {
      const returnedData = JSON.parse(event.data);

      switch (returnedData.type) {
        // handle incoming message from the server
        case "incomingMessage":
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

        // handle incoming notification from the server
        case "incomingNotification":
          const newNotification = {
            username: "__system__",
            content: returnedData.content,
            id: returnedData.id
          };
          this.setState({
            messages: this.state.messages.concat([newNotification])
          });
          break;

        //handle user count
        case "usercount":
          this.setState({ userCount: returnedData.users });
          break;

        //hanlde username color
        case "usercolor":
          this.setState({ userColor: returnedData.color });
          break;
        default:
          // show an error in the console if the message type is unknown.
          throw new Error("Unknown event type " + returnedData.type);
      }
    };
  }

  sendDataToServer = data => {
    // Send the msg object to the server as a JSON-formatted string.
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

  handleUserColorChange = usercolor => {
    this.setState({ userColor: usercolor });
  };

  render() {
    return (
      <div>
        <MessageList
          currentUser={this.state.currentUser.name}
          messages={this.state.messages}
          userCount={this.state.userCount}
          colorChange={this.handleUserColorChange}
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
