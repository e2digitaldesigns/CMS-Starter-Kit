import React from "react";

const ConsoleLoginForm = ({ ...props }) => {
  const { account, handleConsoleLogIn, handleTextChange } = props;

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div>
            spock@email.com
            <br />
            jameskirk@email.com
            <br />
            data@email.com
            <br />
            borgqueen@email.com
            <br />
            scottie@email.com
          </div>
          <div className="col-sm-4">
            <h1>Login</h1>
            <form onSubmit={handleConsoleLogIn}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  value={account.email}
                  type="email"
                  className="form-control"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={handleTextChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  value={account.password}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={handleTextChange}
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
};

export default ConsoleLoginForm;
