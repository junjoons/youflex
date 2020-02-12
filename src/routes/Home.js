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
    // const channelData = require("../data/data.json");
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
    // console.log(term);
    await this.getData(term.channel__id).then(response =>
      this.setState({
        data: this.state.data.concat([
          [
            {
              name: response.data.items[0].snippet.title,
              id: response.data.items[0].id,
              thumbnail: response.data.items[0].snippet.thumbnails.default.url
            }
          ]
        ]),
        raw_data: this.state.raw_data.concat([response])
      })
    );

    // const channel__thumbnail =
    //   response.data.items[0].snippet.thumbnails.default.url;
    // const channel__name = response.data.items[0].snippet.title;
    // const { data } = this.state;

    // this.setState({ data: data.concat([[channel__name, channel__thumbnail]]) });

    // if (data.length === channelData.length - 1) {
    //   this.setState({ isLoading: false });
    // }

    // return await this.getData(term.channel__id);
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
    // const channelData = require("../data/data.json");
    const { isLoading, data, raw_data } = this.state;
    if (isLoading === false) {
      return (
        <div className="container">
          <div className="channels">
            {data.map((data, index) => {
              // console.log(data);
              console.log(raw_data[index]);
              console.log(raw_data[index].data.items[0].snippet.title);
              const {
                data: { items }
              } = raw_data[index];
              const id = items[0].id;
              const title = items[0].snippet.title;
              const description = items[0].snippet.description;
              const thumbnail = items[0].snippet.thumbnails.default.url;
              return (
                <Link
                  to={{
                    pathname: `channel:${data[0].id}`,
                    state: {
                      name: data[0].name,
                      thumbnail: data[0].thumbnail
                      // description: channel.description
                    }
                  }}
                  key={data[0].id}
                >
                  <div className="channelName">
                    <img src={data[0].thumbnail} alt={data[0].name} />
                    <li className="channelName__name">{data[0].name}</li>
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
