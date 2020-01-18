import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
  render() {
    let channelData = require("../data/data.json");
    return (
      <div className="container">
        <div className="channels">
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
              <div className="channelName">
                <li className="channelName__name">{channel.name}</li>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
