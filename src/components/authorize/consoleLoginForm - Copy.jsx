import React, { Component } from "react";
import http from "../../services/httpServices";
import jwtDecode from "jwt-decode";

class ConsoleLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      account: {
        email: "spock@email.com",
        password: "332310"
      }
    };
  }

  componentDidMount() {}

  handleTextChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  handleEmailChange = email => {
    const account = { ...this.state.account };
    account.email = email;
    this.setState({ account });
  };

  handleLogin = async e => {
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
        window.location = "/console/dashboard";
      }
    } catch (err) {}
  };

  render() {
    const emails = [
      { email: "spock@email.com" },
      { email: "jameskirk@email.com" },
      { email: "data@email.com" },
      { email: "borgqueen@email.com" },
      { email: "scottie@email.com" }
    ];

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <h1>Login</h1>
              <form onSubmit={this.handleLogin}>
                <div style={{ padding: "10px", margin: "10px" }}>
                  {emails.map(e => (
                    <div
                      style={{
                        width: "200px",
                        cursor: "pointer",
                        padding: "5px"
                      }}
                      key={e.email}
                      onClick={() => this.handleEmailChange(e.email)}
                    >
                      {e.email}
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    value={this.state.account.email}
                    type="email"
                    className="form-control"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={this.handleTextChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    value={this.state.account.password}
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleTextChange}
                  />
                </div>

                <button type="submit" className="btn btn-sm btn-primary">
                  Submit
                </button>
              </form>
            </div>{" "}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConsoleLoginForm;
