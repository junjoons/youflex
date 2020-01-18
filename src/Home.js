import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    let channelData = require("./data.json");
    return (
      <div className="container">
        {channelData.map(channel => (
          <Link
            to={{
              pathname: `channel:${channel.id}`,
              state: {
                name: channel.name,
                link: channel.channelLink,
                description: channel.description
              }
            }}
            key={channel.id}
          >
            <li className="channelName">{channel.name}</li>
          </Link>
        ))}
      </div>
    );
  }
}

export default Home;
