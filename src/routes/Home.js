import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import youtube from "../api/youtube";

class Home extends React.Component {
  state = {
    isLoading: true,
    snippetData: [],
    brandingSettingsData: [],
    searchData: [],
    raw_snippetData: [],
    raw_brandingSettingsData: [],
    raw_searchData: []
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

  getBrandingSettingsData = async term => {
    const response = await youtube.get("channels", {
      params: {
        part: "brandingSettings",
        maxResults: 1,
        key: "AIzaSyCHi-dsz2j6aoMSm2Sb9qr459qnz_9-S2g",
        id: term
      }
    });
    console.log(response);
    return response;
  };

  getSearchData = async term => {
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 1,
        key: "AIzaSyCHi-dsz2j6aoMSm2Sb9qr459qnz_9-S2g",
        q: term
      }
    });
    return response;
  };

  renderSnippetData = async term => {
    await this.getSnippetData(term.channel__id).then(response =>
      this.setState({
        snippetData: this.state.snippetData.concat([
          [
            {
              name: response.data.items[0].snippet.title,
              id: response.data.items[0].id,
              thumbnail: response.data.items[0].snippet.thumbnails.default.url,
              high_thumbnail: response.data.items[0].snippet.thumbnails.high.url
            }
          ]
        ]),
        raw_data: this.state.raw_snippetData.concat([response])
      })
    );
  };

  renderBrandingSettingsData = async term => {
    await this.getBrandingSettingsData(term.channel__id).then(response =>
      this.setState({
        brandingSettingsData: this.state.brandingSettingsData.concat([
          [
            {
              name: response.data.items[0].brandingSettings.channel.title,
              id: response.data.items[0].id,
              banner:
                response.data.items[0].brandingSettings.image.bannerImageUrl
            }
          ]
        ]),
        raw_data: this.state.raw_brandingSettingsData.concat([response])
      })
    );
  };

  renderSearchData = async term => {
    await this.getSearchData(term.channel__id).then(response =>
      this.setState({
        searchData: this.state.searchData.concat([
          [
            {
              name: response.data.items[0].snippet.title,
              id: response.data.items[0].id,
              thumbnail: response.data.items[0].snippet.thumbnails.default.url,
              high_thumbnail: response.data.items[0].snippet.thumbnails.high.url
            }
          ]
        ]),
        raw_data: this.state.raw_searchData.concat([response])
      })
    );
  };

  componentDidMount() {
    const channelData = require("../data/data.json");
    const arrayLength = channelData.length - 1;
    channelData.map((channel, index) => {
      this.renderBrandingSettingsData(channel);
      if (index === arrayLength) {
        this.setState({ isLoading: false });
      }
      return null;
    });
  }
  render() {
    const {
      isLoading,
      snippetData,
      brandingSettingsData,
      searchData,
      raw_data
    } = this.state;
    console.log(snippetData);

    if (isLoading === false) {
      return (
        <div className="container">
          <div className="channels">
            {snippetData.map(index => {
              console.log(index, raw_data[index]);
              // const {
              //   data: { items }
              // } = raw_data[index];
              // const id = items[0].id;
              // const title = items[0].snippet.title;
              // const description = items[0].snippet.description;
              // const thumbnail = items[0].snippet.thumbnails.default.url;
              // const high_thumbnail = items[0].snippet.thumbnails.high.url;
              const id = snippetData[index].id;
              const title = snippetData[index].title;
              const description = snippetData[index].description;
              const thumbnail = snippetData[index].thumbnail;
              const high_thumbnail = snippetData[index].high_thumbnail;
              console.log(id, title, description, thumbnail, high_thumbnail);
              return (
                <Link
                  to={{
                    pathname: `channel:${id}`,
                    state: {
                      id: id,
                      name: title,
                      thumbnail: high_thumbnail,
                      description: description
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
