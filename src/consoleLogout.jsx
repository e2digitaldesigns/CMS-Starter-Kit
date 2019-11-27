import React, { Component } from "react";

class ConsoleLogout extends Component {
  constructor(props) {
    super(props);

    this.props.history.push("/console/dashboard");
  }

  render() {
    return <React.Fragment>dfsdfasfsadfs</React.Fragment>;
  }
}

export default ConsoleLogout;

// const handleLogout = () => {
//     console.log("log out");
//     localStorage.removeItem("token");
//     // window.location.replace("/console-login");
//   };
