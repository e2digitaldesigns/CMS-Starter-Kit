import React, { Component } from "react";
import { toast } from "react-toastify";
import { PageTemplateHeader } from "./../utils/pageTemplate";
import http from "../../services/httpServices";

class ClientManagementProfile extends Component {
  state = {
    starterName: "",
    clientInformation: {
      _id: "",
      active: "",
      name: "",
      email: ""
    }
  };

  async componentDidMount() {
    try {
      const { data: clientInformation } = await http.get(
        "/users/" + this.props.match.params.id
      );

      this.setState({ starterName: clientInformation.name, clientInformation });
    } catch (ex) {
      toast.warning("Client Listing not able to load..");
    }
  }

  onInputChange = e => {
    e.preventDefault();
    const clientInformation = { ...this.state.clientInformation };
    clientInformation[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ clientInformation });
  };

  handleProfileFormSubmit = async e => {
    e.preventDefault();

    const ci = this.state.clientInformation;
    try {
      const { data } = await http.put("/users/" + ci._id, { ...ci });
      if (data.ok & (data.ok === 1)) {
        this.setState({ starterName: ci.name });
      } else {
        toast.warning("There was an error... Please try again later");
      }
    } catch (ex) {
      toast.warning("There was an error... Please try again later");
    }
  };

  render() {
    const { status, name, email } = this.state.clientInformation;

    return (
      <React.Fragment>
        <PageTemplateHeader displayName="Client Management" />

        <div className="client-profile-holder">
          <div className="card m-3">
            <div className="card-header">
              <span className="pull-left">{this.state.starterName}</span>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleProfileFormSubmit}>
                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <div>
                    <input
                      type="test"
                      className="form-control form-control-sm"
                      name="name"
                      placeholder="name..."
                      required
                      value={name}
                      onChange={this.onInputChange}
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
                      value={email}
                      placeholder="user@email.com"
                      onChange={this.onInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <div>
                    <select
                      className="form-control form-control-sm"
                      name="status"
                      value={status}
                      onChange={this.onInputChange}
                    >
                      <option value="true">Active</option>
                      <option value="false">In-Active</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-sm btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ClientManagementProfile;
