import React, { Component } from "react";
import Joi from "@hapi/joi";
import { toast } from "react-toastify";
import http from "../../services/httpServices";
import { PageTemplateHeader } from "./../utils/pageTemplate";

class ClientManagementNew extends Component {
  state = {
    granted: false,
    staffInformation: {
      name: "",
      email: "@email.com",
      password: "1234Abc!"
    }
  };

  onInputChange = e => {
    e.preventDefault();
    const staffInformation = { ...this.state.staffInformation };
    staffInformation[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ staffInformation });
  };

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
      ...this.state.staffInformation
    });

    if (error) {
      let name = error.details[0].path[0];
      let m = name + " help";
      toast.warning(m);
      return;
    }

    try {
      const { data } = await http.post(
        "/staffManagement",
        this.state.staffInformation
      );

      if (data._id) {
        this.props.history.push(
          "/console/staff-management/staff-profile/" + data._id
        );
      }
    } catch {}
  };

  render() {
    const ci = { ...this.state.staffInformation };

    return (
      <React.Fragment>
        <PageTemplateHeader displayName="Staff Management" />

        <div className="card m-3">
          <div className="card-header">
            <h5>Create New Staff Account</h5>
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
