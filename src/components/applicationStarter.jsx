import React, { Component } from "react";
import http from "../services/httpServices";
import { Route, Redirect, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AppNotFound from "./appNotFound";
import ConsoleLoginForm from "./authorize/consoleLoginForm";
import ApplicationStructure from "./applicationStructure";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ApplicationStarter extends Component {
  constructor(props) {
    super(props);

    let loggedIn;

    try {
      jwtDecode(localStorage.getItem("token"));
      loggedIn = true;
    } catch {
      loggedIn = false;
    }

    this.state = {
      loggedIn,
      account: {
        email: "spock@email.com",
        password: "332310"
      }
    };
  }

  handleTextChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  handleConsoleLogIn = async e => {
    e.preventDefault();
    const { account } = this.state;
    let options = {
      email: account.email,
      password: account.password
    };

    try {
      const { data } = await http.post("auth", options);

      if (data !== null && data.errorCode === "") {
        localStorage.setItem("token", data.token);
        this.setState({ loggedIn: true });
      }
    } catch (err) {}
  };

  handleConsoleLogOut = () => {
    console.log(60, "log out");
    localStorage.removeItem("token");
    this.setState({ loggedIn: false });
  };

  render() {
    const { loggedIn } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />

        <Switch>
          <Route
            path="/console"
            render={props => {
              if (loggedIn === true) {
                return (
                  <ApplicationStructure
                    handleConsoleLogOut={this.handleConsoleLogOut}
                  />
                );
              }
              return <Redirect to="/console-login" />;
            }}
          />

          <Route
            path="/console-login"
            exact
            render={props => {
              if (loggedIn === true) {
                return <Redirect to="/console/dashboard" />;
              }
              return (
                <ConsoleLoginForm
                  account={this.state.account}
                  handleConsoleLogIn={this.handleConsoleLogIn}
                  handleTextChange={this.handleTextChange}
                />
              );
            }}
          />

          <Route path="/not-found" component={AppNotFound} />

          <Redirect
            from="/"
            exact
            to={loggedIn ? "/console/dashboard" : "/console-login"}
          />

          <Redirect to="/not-found" />
        </Switch>

        {/* <Switch>
          <Route
            path="/console"
            render={props => {
              if (loggedIn === true) {
                console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                return <ApplicationStructure />;
              }
              return <Redirect to="/console-login" />;
            }}
          />

          <Route path="/not-found" component={AppNotFound} />

          <Route
            path="/console-login"
            exact
            render={props => {
              if (loggedIn === true) {
                return <Redirect to="/console/dashboard" />;
              }
              return (
                <ConsoleLoginForm
                  account={this.state.account}
                  handleConsoleLogIn={this.handleConsoleLogIn}
                  handleTextChange={this.handleTextChange}
                />
              );
            }}
          />

          <Redirect
            from="/"
            exact
            to={loggedIn ? "/console/dashboard" : "/console-login"}
          />

          <Redirect to="/not-found" />
        </Switch> */}
      </React.Fragment>
    );
  }
}

export default ApplicationStarter;

// <Route path="/console-login" component={ConsoleLoginForm} />
