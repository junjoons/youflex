import React from "react";

class Home extends React.Component {
  render() {
    let channelData = require("./data.json");
    return (
      <div className="container">
        {channelData.map(channel => (
          <li>{channel.name}</li>
        ))}
      </div>
    );
  }
}

export default Home;
