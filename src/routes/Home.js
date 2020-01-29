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
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 1,
        key: "AIzaSyB1IbUaKMQHmhBjm-Nwo9kcGzRqyRZIhSU",
        q: term
      }
    });
    // console.log(response.data);
    console.log(response.data.items[0].snippet.thumbnails.default.url);
    const picURL = response.data.items[0].snippet.thumbnails.default.url;
    const { data } = this.state;
    this.setState({ data: data.concat(picURL) });
    const channelData = require("../data/data.json");
    if (this.state.data.length === channelData.length) {
      this.setState({ isLoading: false });
    }
    // return response;
  };

  // renderData = () => {
  //   const channelData = require("../data/data.json");
  //   channelData.forEach((channel, index) => {
  //     //console.log(this.getData(channel.name));
  //     if (index === channelData.length - 1) {
  //       this.setState({ isLoading: false });
  //     }
  //   });
  // };
  componentDidMount() {
    const channelData = require("../data/data.json");
    channelData.map(channel => this.getData(channel.name));
    console.log("done!");
  }
  render() {
    const channelData = require("../data/data.json");
    const { isLoading } = this.state;
    // let { isLoading, data } = this.state;
    // **로딩이 완료되지 않았을떄 APIdata값을 받으려 하기 때문에 값이 제대로 나오지 않음. 고로 state에 isLoading 속성을 만들어 삼항 연산자로 구분하며 rendering하기
    // this.renderData();
    if (isLoading === false) {
      return (
        <div className="container">
          <div className="channels">
            {channelData.map((channel, index) => {
              //this.setState({ data: data.concat(this.getData(channel)) });
              //console.log(data, channelData.length);
              // this.getData(channel.name);
              // console.log(index)
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
                    <img src={this.state.data[index]} />
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
