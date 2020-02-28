import React from "react";
import "./Info.css";
import youtube from "../api/youtube";

class Info extends React.Component {
  state = {
    isLoading: true,
    searchData: [],
    raw_searchData: [],
    videoList: []
  };

  getSearchData = async term => {
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 4,
        key: "AIzaSyB1IbUaKMQHmhBjm-Nwo9kcGzRqyRZIhSU",
        q: term
      }
    });
    return response;
  };

  renderSearchData = async term => {
    const response = await this.getSearchData(term);
    this.setState({
      searchData: this.state.searchData.concat([
        [
          {
            // name: response.data.items[0].snippet.title,
            // id: response.data.items[0].id,
            // thumbnail: response.data.items[0].snippet.thumbnails.default.url,
            // high_thumbnail: response.data.items[0].snippet.thumbnails.high.url
          }
        ]
      ]),
      raw_searchData: this.state.raw_searchData.concat([response])
    });
  };

  getRenderSearchData = async () => {
    const {
      location: {
        state: { id }
      }
    } = this.props;
    await this.renderSearchData(id);
    const response = this.state.raw_searchData;
    // console.log(this.state.raw_searchData);
    await this.finalRenderSearchData(response);
  };

  finalRenderSearchData = async response => {
    console.log(response);
    const data = response[0].data.items;
    data.map(data => {
      if (data.id.videoId !== undefined) {
        this.setState({
          videoList: this.state.videoList.concat(data.id.videoId)
        });
        return null;
      }
    });
    console.log(this.state.videoList);
  };

  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    } else {
      this.getRenderSearchData();
    }
  }
  render() {
    console.log("pushed!");
    const { location } = this.props;
    if (location.state) {
      const {
        location: {
          state: { name, thumbnail, description }
        }
      } = this.props;
      const { videoList } = this.state;
      // console.log(raw_searchData);
      return (
        <div className="info__container">
          <div className="info">
            <img className="info__img" src={thumbnail} alt={name} />
            <div className="info__info">
              <span className="info__description">{description}</span>
              <h1 className="info__name">{name}</h1>
            </div>
          </div>
          <div className="video_container">
            {videoList.map(data => {
              return (
                <embed
                  // id="ytplayer"
                  // type="text/html"
                  className="video"
                  width="640"
                  height="360"
                  src={`https://www.youtube.com/v/${data}`}
                  frameborder="0"
                ></embed>
              );
            })}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Info;
