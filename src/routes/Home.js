import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import youtube from "../api/youtube";

class Home extends React.Component {
  state = {
    isLoading: true,
    snippetData: [],
    raw_snippetData: []
  };

  getSnippetData = async term => {
    const response = await youtube.get("channels", {
      params: {
        part: "snippet",
        maxResults: 1,
        key: "AIzaSyCHi-dsz2j6aoMSm2Sb9qr459qnz_9-S2g",
        id: term
      }
    });
    return response;
  };

  renderSnippetData = async term => {
    const response = await this.getSnippetData(term);
    console.log(response);
    this.setState({
      snippetData: this.state.snippetData.concat([
        [
          {
            name: response.data.items[0].snippet.title,
            id: response.data.items[0].id,
            description: response.data.items[0].snippet.description,
            thumbnail: response.data.items[0].snippet.thumbnails.default.url,
            high_thumbnail: response.data.items[0].snippet.thumbnails.high.url
          }
        ]
      ]),
      raw_snippetData: this.state.raw_snippetData.concat([response])
    });
    console.log(this.state);
  };

  componentDidMount() {
    const channelData = require("../data/data.json");
    const arrayLength = channelData.length - 1;
    channelData.map(async (channel, index) => {
      await this.renderSnippetData(channel.channel__id);
      console.log(index, arrayLength);
      if (index === arrayLength) {
        this.setState({ isLoading: false });
        console.log(this.state);
      }
      return null;
    });
  }
  render() {
    const { isLoading, snippetData, raw_snippetData } = this.state;

    if (isLoading === false) {
      return (
        <div className="container">
          <div className="channels">
            {snippetData.map((data, index) => {
              console.log(data);
              const id = data[0].id;
              const title = data[0].name;
              const description = data[0].description;
              const thumbnail = data[0].thumbnail;
              const high_thumbnail = data[0].high_thumbnail;
              // console.log(id, title, description, thumbnail, high_thumbnail);
              return (
                <Link
                  to={{
                    pathname: `channel:${id}`,
                    state: {
                      id,
                      name: title,
                      thumbnail: high_thumbnail,
                      description
                    }
                  }}
                  key={id}
                >
                  <div className="channel">
                    <img className="channel__img" src={thumbnail} alt={title} />
                    <li className="channel__name">{title}</li>
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
