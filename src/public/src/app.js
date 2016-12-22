import React from "react";
import ReactDom from "react-dom";
import Login from "./scenes/Connect/Login";
import Register from "./scenes/Connect/Register";
import Home from "./scenes/Home";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import crypto from "crypto";

import config from "../../config.js";
import "./styles/css/main.css";

class App extends React.Component {
  constructor() {
    super();
    this.setStorage = this.setStorage.bind(this);
    this.get = this.get.bind(this);
    this.setStorage();
  }

  setStorage() {
    crypto.pbkdf2(config.guestPassword, config.secret, 100, 512, 'sha512', (err, key) => {
      this.get(`/authenticate?username=guest&password=${key.toString('hex')}`, (value) => {
        sessionStorage.setItem("token", value);
      });
    })
  }

  get(url, callback) {
    fetch(url, {method:'POST'}).then((res) => {
      res.json().then((obj) => {
        callback(obj.token);
      })
    })
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home}></Route>
        <Route path="login" component={Login}></Route>
        <Route path="register" component={Register}></Route>
      </Router>
    );
  }
}

const app = document.getElementById('root');
ReactDom.render(<App/>, app);
