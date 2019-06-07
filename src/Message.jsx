import React, { Component } from "react";

class Message extends Component {
  checkImageURL = url => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  checkVideoURL = url => {
    return url.match(/youtube/) != null;
  };

  getQueryFromVideoURL = url => {
    console.log("this.getQueryFromVideoURL");
    const splitted = url.split("watch?v=");
    const query = splitted[splitted.length - 1].split("&");
    return query[0];
  };

  embedYoutubeVideo = url => {
    console.log("embed youtube video");
    return (
      <div
        className="video"
        style={{
          position: "relative",
          paddingBottom: "56.25%" /* 16:9 */,
          paddingTop: 25,
          height: 0,
          zIndex: -1
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
          src={`https://www.youtube.com/embed/${this.getQueryFromVideoURL(
            url
          )}`}
          frameBorder="0"
        />
      </div>
    );
  };

  checkURls = url => {
    const { message } = this.props;
    console.log(this.checkVideoURL(url));
    if (this.checkImageURL(url)) {
      return <img src={message.content} />;
    } else if (this.checkVideoURL(url)) {
      return this.embedYoutubeVideo(url);
    } else {
      return message.content;
    }
  };

  render() {
    const { message } = this.props;

    if (message.username === "__system__") {
      return <div className="message system">{message.content}</div>;
    }
    return (
      <div className="message">
        <span style={{ color: message.color }} className="message-username">
          {message.username}
        </span>
        <span className="message-content">
          {this.checkURls(message.content)}
        </span>
      </div>
    );
  }
}

export default Message;
