import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import User from "./components/users/User";

import Alert from "./components/layout/Alert";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import GithubState from "./context/github/githubState";
import AlertState from "./context/alert/AlertState";

import "./App.css";


const App = () => {
  return (
    <GithubState>
      <AlertState>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route path="/" exact component={Home} />

                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </div>
      </AlertState>
    </GithubState>
  );
};

export default App;
