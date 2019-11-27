import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PageTemplateHeader } from "./../utils/pageTemplate";
import http from "../../services/httpServices";

class ClientManagementProfile extends Component {
  state = {
    clientInformation: {
      _id: "",
      status: "",
      name: "",
      email: ""
    }
  };

  async componentDidMount() {
    try {
      const { data: clientInformation } = await http.get(
        "/users/" + this.props.match.params.id
      );

      this.setState({ clientInformation });
    } catch (ex) {
      toast.warning("Client Listing not able to load..");
    }
  }

  render() {
    const { _id, status, name, email } = this.state.clientInformation;

    return (
      <React.Fragment>
        <PageTemplateHeader displayName="Client Management" />

        <div className="client-profile-holder">
          <div className="card m-3">
            <div className="card-header">
              <span className="pull-left">{name}</span>
              <Link
                to={`/console/client-management/client-profile-edit/${_id}`}
              >
                <span className="pull-right btn btn-sm btn-primary">Edit</span>
              </Link>
            </div>
            <div className="card-body">
              {/* <div className="card-title">Account</div> */}
              <p className="card-text">
                Status: {status ? "Active" : "In-active"}
              </p>
              <p className="card-text">Name: {name}</p>
              <p className="card-text">Email: {email}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ClientManagementProfile;
