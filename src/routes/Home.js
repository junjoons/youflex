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
    // console.log(channel__name, channel__thumbnail);
    const { data } = this.state;
    this.setState({ data: data.concat([[channel__name, channel__thumbnail]]) });
    // console.log(this.state);
    const channelData = require("../data/data.json");
    if (data.length === channelData.length - 1) {
      this.setState({ isLoading: false });
    }
    console.log(this.state);
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
            {channelData.map((channel, index) => {
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
                      // console.log("data", data);
                      if (data[0] === channel.name) {
                        console.log(data[1]);
                        return <img src={data[1]} alt={data[0]} />;
                      } else {
                        return null;
                      }
                    })}
                    {/* <img src={this.state.data[index]} alt={channel.name} /> */}
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
