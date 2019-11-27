import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PageTemplateHeader } from "../utils/pageTemplate";
import Pagination from "../../common/pagination";
import { paginate } from "../utils/paginate";
import SearchFilter from "./../utils/searchFilter";
import http from "../../services/httpServices";

class ClientManagementListing extends Component {
  state = {
    currentPage: 1,
    pageSize: 25,
    userFilter: "",
    userListing: []
  };

  async componentDidMount() {
    try {
      const { data: userListing } = await http.get("users");
      this.setState({ userListing });
    } catch (ex) {
      toast.warning("User Listing not able to load..");
    }
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handlePageSizeChange = e => {
    this.setState({
      pageSize: parseInt(e.currentTarget.value),
      currentPage: 1
    });
  };

  handleFilterChange = e => {
    this.setState({
      userFilter: e.currentTarget.value.toLowerCase(),
      currentPage: 1
    });
  };

  handleResetPasswordLink = index => {
    console.log("handleResetPasswordLink");
  };

  handleStatusChange = async index => {
    const userListing = this.state.userListing;
    userListing[index].status =
      userListing[index].status === true ? false : true;

    try {
      const { data } = await http.put(
        "users/status/" + userListing[index]._id,
        {
          status: userListing[index].status
        }
      );
      console.log(data);
      this.setState({ userListing });
    } catch (ex) {
      toast.warning("User status error...");
    }
  };

  render() {
    const { userListing, pageSize, currentPage, userFilter } = this.state;
    const filtered = userFilter
      ? userListing.filter(
          c =>
            c.name.toLowerCase().includes(userFilter) ||
            c.email.toLowerCase().includes(userFilter)
        )
      : userListing;
    const count = filtered.length;
    const users = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <PageTemplateHeader displayName="User Management" />

        <div className="card m-3">
          <div className="card-header">
            <h4 className="pull-left">User Listing</h4>
            <div className="pull-right pill bg-primary">
              {users.length} / {userListing.length} Users
            </div>
          </div>
          <div className="card-body">
            <SearchFilter
              pageSize={pageSize}
              handleFilterChange={this.handleFilterChange}
              handlePageSizeChange={this.handlePageSizeChange}
            />
          </div>

          <table className="mx-3 mb-3 table table-striped table-bordered-light table-hover">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>
                  <input type="checkbox" />
                </th>
                <th>Company</th>
                <th>Status</th>
                <th className="hidden-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u._id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <h4 className="table-title mb-1">{u.name}</h4>
                    <p className="my-1">{u.email}</p>

                    <div className="table-options">
                      <Link
                        to={`/console/client-management/client-profile-edit/${u._id}`}
                      >
                        Edit
                      </Link>{" "}
                      |{" "}
                      <Link
                        to={`/console/client-management/client-profile/${u._id}`}
                      >
                        View
                      </Link>{" "}
                      |{" "}
                      <span
                        className="cursor"
                        onClick={() => this.handleResetPasswordLink(index)}
                      >
                        Reset Password
                      </span>{" "}
                      |{" "}
                      <span
                        className="cursor"
                        onClick={() => this.handleStatusChange(index)}
                      >
                        {u.status === true ? "Active" : "In-Active"}
                      </span>
                    </div>
                  </td>
                  <td>{u.status === true ? "Active" : "In-Active"}</td>
                  <td className="hidden-sm">{u.date.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ClientManagementListing;
