import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import AppDashboard from "./dashboard/appDashboard";
import AppNotFound from "./appNotFound";
import ClientManagementListing from "./clientManagement/clientManagementListing";
import ClientManagementProfile from "./clientManagement/clientManagementProfile";
import ClientManagementProfileEdit from "./clientManagement/clientManagementProfileEdit";
import ClientManagementNew from "./clientManagement/clientManagementNew";
import internalMessaging from "./internalMessaging/internalMessaging";

import StaffManagementListing from "./staffManagement/staffManagementListing";

class applicationRouter extends Component {
  render() {
    return (
      <section className="main-content-holder">
        <Switch>
          <Route path="/console/dashboard" component={AppDashboard} />
          <Route
            exact
            path="/console/client-management/client-profile/:id"
            component={ClientManagementProfile}
          />

          <Route
            exact
            path="/console/client-management/client-profile-edit/:id"
            component={ClientManagementProfileEdit}
          />

          <Route
            exact
            path="/console/client-management/client-new"
            component={ClientManagementNew}
          />

          <Route
            exact
            path="/console/client-management/client-listing"
            component={ClientManagementListing}
          />

          <Route
            path="/console/internal-messaging"
            component={internalMessaging}
          />

          <Route
            exact
            path="/console/staff-management/staff-listing"
            component={StaffManagementListing}
          />

          <Route path="/console/not-found" component={AppNotFound} />
          <Redirect from="/console" exact to="/console/dashboard" />
          <Redirect from="/console/" exact to="/console/dashboard" />
          <Redirect to="/console/not-found" />
        </Switch>
      </section>
    );
  }
}

export default applicationRouter;
