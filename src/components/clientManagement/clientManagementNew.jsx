import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Joi from "@hapi/joi";
import { toast } from "react-toastify";
import http from "../../services/httpServices";
import { PageTemplateHeader } from "./../utils/pageTemplate";

class ClientManagementNew extends Component {
  state = {
    granted: false,
    clientInformation: {
      name: "",
      email: "@email.com",
      password: "1234Abc!"
    }
  };

  onInputChange = e => {
    e.preventDefault();
    const clientInformation = { ...this.state.clientInformation };
    clientInformation[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ clientInformation });
  };

  // ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$
  /*
  Password matching expression. Password must be at least 4 characters,
  no more than 8 characters, and must include at least one upper case letter,
  one lower case letter, and one numeric digit.
  */

  handleSubmit = async e => {
    e.preventDefault();

    const schema = Joi.object({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string().required(),
      password: Joi.string().pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[/?/!/#/$/%/])[a-zA-Z0-9/?/!/#/$/%/]{8,30}$/
      )
    });

    const { error } = schema.validate({
      ...this.state.clientInformation
    });

    if (error) {
      let name = error.details[0].path[0];
      let m = name + " help";
      toast.warning(m);
      return;
    }

    try {
      const { data } = await http.post("/users", this.state.clientInformation);
      console.log(data);
      if (data._id) {
        // window.location.assign(
        //   "/console/client-management/client-profile/" + data._id
        // );
        this.setState({ granted: true, _id: data._id });
      }
    } catch {}
  };

  render() {
    const ci = { ...this.state.clientInformation };

    if (this.state.granted === true) {
      return (
        <Redirect
          to={`/console/client-management/client-profile/${this.state._id}`}
        />
      );
    }

    return (
      <React.Fragment>
        <PageTemplateHeader displayName="Client Management" />

        <div className="card m-3">
          <div className="card-header">
            <h5>Create New Client Account</h5>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="Name">Name</label>
                <div>
                  <input
                    type="test"
                    className="form-control form-control-sm"
                    name="name"
                    placeholder="John Wick"
                    value={ci.name}
                    onChange={this.onInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    name="email"
                    value={ci.email}
                    placeholder="user@gmail.com"
                    onChange={this.onInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div>
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    name="password"
                    value={ci.password}
                    placeholder="Password"
                    onChange={this.onInputChange}
                  />
                </div>

                <small>
                  Your password must be 8-30 characters long, contain at least
                  one upper case letter, one lower case letter, one number and
                  one special character.
                  <br />
                  Special characters: !, #, $, %,
                </small>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-sm btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ClientManagementNew;
