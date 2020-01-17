import React from "react";

class Info extends React.component {
  render() {
    const { location } = this.props;
    console.log(location);
    return (
      <div>
        <h1>this.is.info!!!</h1>
      </div>
    );
  }
}

export default Info;
