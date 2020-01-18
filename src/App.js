import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Info from "./routes/Info";
import "./App.css";
import youflix_logo from "./img/youflix_logo.png";

function App() {
  return (
    <div clssName="app__component">
      <div className="youflixLogo">
        <img
          src={youflix_logo}
          alt="YouFlix Logo"
          className="youflixLogo__logo"
        />
      </div>
      <HashRouter>
        <Route path="/" exact={true} component={Home} />
        <Route path="/channel:id" component={Info} />
      </HashRouter>
    </div>
  );
}

export default App;
