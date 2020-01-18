import React from "react";
import youtube_logo from "../img/youtube_logo.png";
import "./Info.css";

class Info extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
    console.log(location.state);
  }
  render() {
    const { location } = this.props;
    if (location.state) {
      const {
        location: {
          state: { name, description, link }
        }
      } = this.props;
      return (
        <div className="info">
          <h1 className="info__name">{name}</h1>
          <span className="info__description">{description}</span>
          <a className="info__link" href={link}>
            <img
              className="info__img"
              src={youtube_logo}
              alt="Link to Creator's Channel"
            />
          </a>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Info;
