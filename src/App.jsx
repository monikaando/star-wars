import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React from "react";
import Home from "./components/Home";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
