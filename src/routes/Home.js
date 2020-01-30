import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import youtube from "../api/youtube";

class Home extends React.Component {
  state = {
    isLoading: true,
    data: []
  };

  getData = async term => {
    const channelData = require("../data/data.json");
    const response = await youtube.get("channels", {
      params: {
        part: "snippet",
        maxResults: 1,
        key: "AIzaSyCHi-dsz2j6aoMSm2Sb9qr459qnz_9-S2g",
        id: term
      }
    });

    const channel__thumbnail =
      response.data.items[0].snippet.thumbnails.default.url;
    const channel__name = response.data.items[0].snippet.title;
    const { data } = this.state;

    this.setState({ data: data.concat([[channel__name, channel__thumbnail]]) });

    if (data.length === channelData.length - 1) {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    const channelData = require("../data/data.json");
    channelData.map(channel => this.getData(channel.channel__id));
  }
  render() {
    const channelData = require("../data/data.json");
    const { isLoading, data } = this.state;
    if (isLoading === false) {
      return (
        <div className="container">
          <div className="channels">
            {channelData.map(channel => {
              return (
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
                    {data.map(data => {
                      if (data[0] === channel.name) {
                        console.log(data[1]);
                        return <img src={data[1]} alt={data[0]} />;
                      } else {
                        return null;
                      }
                    })}
                    <li className="channelName__name">{channel.name}</li>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <span>loading...</span>;
    }
  }
}

export default Home;
