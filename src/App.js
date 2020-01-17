import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./Home";
import Info from "./Info";

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/channel:id" component={Info} />
    </HashRouter>
  );
}

export default App;
