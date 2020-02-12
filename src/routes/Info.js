import React from "react";
// import youtube_logo from "../img/youtube_logo.png";
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
    console.log("pushed!");
    const { location } = this.props;
    if (location.state) {
      const {
        location: {
          state: { name, thumbnail }
        }
      } = this.props;
      return (
        <div className="info">
          <img className="info__img" src={thumbnail} alt={name} />
          <h1 className="info__name">{name}</h1>
          {/* <span className="info__description">{description}</span> */}
          {/* <a className="info__link" href={link}> */}
          {/* </a> */}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Info;
