import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PageTemplateHeader } from "../utils/pageTemplate";
import Pagination from "../../common/pagination";
import { paginate } from "../utils/paginate";
import SearchFilter from "./../utils/searchFilter";
import http from "../../services/httpServices";

class StaffManagementListing extends Component {
  state = {
    currentPage: 1,
    pageSize: 25,
    filter: "",
    listing: []
  };

  async componentDidMount() {
    try {
      const { data: listing } = await http.get("staffManagement");
      this.setState({ listing });
    } catch (ex) {
      toast.warning("Client Listing not able to load..");
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
      filter: e.currentTarget.value.toLowerCase(),
      currentPage: 1
    });
  };

  render() {
    const { listing, pageSize, currentPage, filter } = this.state;
    const filtered = filter
      ? listing.filter(
          c =>
            c.name.toLowerCase().includes(filter) ||
            c.email.toLowerCase().includes(filter)
        )
      : listing;
    const count = filtered.length;
    const clients = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <PageTemplateHeader displayName="Staff Management" />

        <div className="card m-3">
          <div className="card-header">
            <h5 className="pull-left">Staff Listing</h5>
            <div className="pull-right pill bg-primary">
              {clients.length} / {listing.length} Staff Members
            </div>
          </div>
          <div className="card-body">
            <SearchFilter
              pageSize={pageSize}
              handleFilterChange={this.handleFilterChange}
              handlePageSizeChange={this.handlePageSizeChange}
            />

            <table className="mx-3 mb-3 table table-striped table-bordered-light table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((s, index) => (
                  <tr key={s._id}>
                    <td>
                      <h4 className="table-title mb-1">{s.name}</h4>
                      <p className="my-1">{s.email}</p>

                      <div className="table-options">
                        <Link
                          to={`/console/staff-management/staff-profile/${s.staff_id}`}
                        >
                          Edit
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
                          {s.status === true ? "Active" : "In-Active"}
                        </span>
                      </div>
                    </td>
                    <td>{s.status === true ? "Active" : "In-Active"}</td>
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
        </div>
      </React.Fragment>
    );
  }
}

export default StaffManagementListing;
