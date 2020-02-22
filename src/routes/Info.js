import React from "react";
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
          state: { name, thumbnail, description, id }
        }
      } = this.props;
      return (
        <div className="info_container">
          <div className="info">
            {/* <img src={banner} alt={name} /> */}
            <img className="info__img" src={thumbnail} alt={name} />
            <div className="info__info">
              <span className="info__description">{description}</span>
              <h1 className="info__name">{name}</h1>
            </div>
            {/* <a className="info__link" href={link}> */}
            {/* </a> */}
          </div>
          <div className="video_container">
            {/* <iframe
              id="ytplayer"
              type="text/html"
              width="640"
              height="360"
              src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
              frameborder="0"
            ></iframe> */}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Info;
