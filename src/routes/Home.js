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

  getData = id => {
    const channelData = require("../data/data.json");
    channelData.map((channel, index) => {
      function _promise() {
        return new Promise(function(resolve, reject) {
          const response = youtube.get("channels", {
            params: {
              part: "snippet",
              maxResults: 1,
              key: "AIzaSyBMlsbAuI4UsGFE24TDNwb5aE7byOo2KCw",
              id: channel.channel__id
            }
          });
          if (response) {
            resolve(response);
            console.log("API number " + index + " pre-pre-fetched!");
          } else {
            reject(
              Error("failed on fetching API data. was api quota exeeded?")
            );
          }
        });
      }
      _promise(true)
        .then(
          response => {
            console.log("API number " + index + " pre-fetched!");
            this.setState({
              snippetData: this.state.snippetData.concat([
                [
                  {
                    name: response.data.items[0].snippet.title,
                    id: response.data.items[0].id,
                    description: response.data.items[0].snippet.description,
                    thumbnail:
                      response.data.items[0].snippet.thumbnails.default.url,
                    high_thumbnail:
                      response.data.items[0].snippet.thumbnails.high.url
                  }
                ]
              ]),
              raw_snippetData: this.state.raw_snippetData.concat([response])
            });
            console.log("API number " + index + " fetched!");
          },
          function(error) {
            console.log(error);
          }
        )
        .then(() => {
          if (channelData.length - 1 === index) {
            this.setState({ isLoading: false });
            console.log("Loading Finished!");
          }
        });
    });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    const { isLoading, snippetData, raw_snippetData } = this.state;

    if (isLoading === false) {
      return (
        <div className="container">
          <div className="channels">
            {snippetData.map((data, index) => {
              const id = data[0].id;
              const title = data[0].name;
              const description = data[0].description;
              const thumbnail = data[0].thumbnail;
              const high_thumbnail = data[0].high_thumbnail;

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
