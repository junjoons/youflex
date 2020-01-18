import React from "react";

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
        <div>
          <h1>{name}</h1>
          <span>{description}</span>
          <a href={link}>
            <img
              className="channel_img"
              src="https://image.flaticon.com/icons/svg/1384/1384060.svg"
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
