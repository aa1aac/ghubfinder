import React, { Fragment, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./pages/About";
import GithubState from "./context/github/githubState";

import "./App.css";

// 5.4

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  // }
  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Get a single user data from the server
  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  // get users repo
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                path="/"
                exact
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />

              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    user={user}
                    loading={loading}
                    getUserRepos={getUserRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
      </div>
    </GithubState>
  );
};

export default App;
