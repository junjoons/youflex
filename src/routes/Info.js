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
        <div className="info">
          <img className="info__img" src={thumbnail} alt={name} />
          <div className="info__info">
            <span className="info__description">{description}</span>
            <h1 className="info__name">{name}</h1>
          </div>
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
