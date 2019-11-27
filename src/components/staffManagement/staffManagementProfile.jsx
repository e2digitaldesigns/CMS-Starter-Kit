import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PageTemplateHeader } from "../utils/pageTemplate";
import http from "../../services/httpServices";

class StaffManagementProfile extends Component {
  state = {
    staffInformation: {
      _id: "",
      status: "",
      name: "",
      email: ""
    }
  };

  async componentDidMount() {
    try {
      const { data: staffInformation } = await http.get(
        "/staffManagement/" + this.props.match.params.id
      );

      this.setState({ staffInformation });
    } catch (ex) {
      toast.warning("Staff information not able to load..");
    }
  }

  render() {
    const { _id, status, name, email } = this.state.staffInformation;

    return (
      <React.Fragment>
        <PageTemplateHeader displayName="Staff Management" />

        <div className="client-profile-holder">
          <div className="card m-3">
            <div className="card-header">
              <span className="pull-left">{name}</span>
              <Link to={`/console/staff-management/staff-profile-edit/${_id}`}>
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

export default StaffManagementProfile;
