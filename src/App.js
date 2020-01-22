import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Info from "./routes/Info";
import "./App.css";
import youflix_logo from "./img/youflix_logo.png";

function App() {
  return (
    <div clssName="app__component">
      <HashRouter>
        <div className="youflixLogo">
          <Link to="/">
            <img
              src={youflix_logo}
              alt="YouFlix Logo"
              className="youflixLogo__logo"
            />
          </Link>
        </div>
        <Route path="/" exact={true} component={Home} />
        <Route path="/channel:id" component={Info} />
      </HashRouter>
    </div>
  );
}

export default App;
