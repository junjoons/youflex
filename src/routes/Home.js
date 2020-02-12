import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import youtube from "../api/youtube";

class Home extends React.Component {
  state = {
    isLoading: true,
    data: [],
    raw_data: []
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
    return response;
  };

  renderData = async term => {
    await this.getData(term.channel__id).then(response =>
      this.setState({
        data: this.state.data.concat([
          [
            {
              name: response.data.items[0].snippet.title,
              id: response.data.items[0].id,
              thumbnail: response.data.items[0].snippet.thumbnails.default.url,
              high_thumbnail: response.data.items[0].snippet.thumbnails.high.url
            }
          ]
        ]),
        raw_data: this.state.raw_data.concat([response])
      })
    );
  };

  componentDidMount() {
    const channelData = require("../data/data.json");
    const arrayLength = channelData.length - 1;
    channelData.map((channel, index) => {
      this.renderData(channel);
      if (index === arrayLength) {
        this.setState({ isLoading: false });
      }
      return null;
    });
  }
  render() {
    const { isLoading, data, raw_data } = this.state;
    if (isLoading === false) {
      return (
        <div className="container">
          <div className="channels">
            {data.map((data, index) => {
              console.log(index, raw_data[index]);
              const {
                data: { items }
              } = raw_data[index];
              const id = items[0].id;
              const title = items[0].snippet.title;
              const description = items[0].snippet.description;
              const thumbnail = items[0].snippet.thumbnails.default.url;
              const high_thumbnail = items[0].snippet.thumbnails.high.url;
              return (
                <Link
                  to={{
                    pathname: `channel:${data[0].id}`,
                    state: {
                      id: id,
                      name: title,
                      thumbnail: high_thumbnail,
                      description: description
                    }
                  }}
                  key={data[0].id}
                >
                  <div className="channel">
                    <img
                      className="channel__img"
                      src={data[0].thumbnail}
                      alt={data[0].name}
                    />
                    <li className="channel__name">{data[0].name}</li>
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
