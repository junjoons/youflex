import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Info from "./routes/Info";
import "./App.css";
import youflix_logo from "./img/youflix_logo.png";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="app__component">
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
        <SearchBar />
        <Route path="/" exact={true} component={Home} />
        <Route path="/channel:id" component={Info} />
      </HashRouter>
    </div>
  );
}

export default App;
