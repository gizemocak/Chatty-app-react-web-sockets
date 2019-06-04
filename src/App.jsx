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
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }

  handleNewMessage = input => {
    const newMessage = {
      username: this.state.currentUser.name,
      content: input,
      id: this.state.messages.length + 1
    };
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    this.setState({ messages: newMessages });
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
