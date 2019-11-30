import React from "react";
import { Link } from "react-router-dom";

const handleLeftMenuToggle = () => {
  document.querySelector(".wrapper").classList.toggle("toggle-left-menu-hide");
  console.log("left menu toggle");
};

const handleRightSectionToggle = () => {
  document.querySelector(".wrapper").classList.toggle("toggle-right-menu-hide");
  console.log("right section toggle");
};

const handleFullScreenToggle = () => {
  const elem = document.documentElement;
  const btn = document.querySelector(".full-screen-button");

  if (btn.classList.contains("fa-expand")) {
    btn.classList.remove("fa-expand");
    btn.classList.add("fa-compress");

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else if (btn.classList.contains("fa-compress")) {
    btn.classList.add("fa-expand");
    btn.classList.remove("fa-compress");

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};

const ApplicationHeader = ({ handleConsoleLogOut, alertNumbers, staff }) => {
  return (
    <React.Fragment>
      <nav className="nav-bar">
        <ul className="left-nav">
          <li className="display-m left-toggle" onClick={handleLeftMenuToggle}>
            <i className="fa fa-bars" />
          </li>
          <li className=" display-m branding" onClick={handleConsoleLogOut}>
            CMS Starter Kit
          </li>
          <li>
            <Link to="view-orders">
              <i className="fa fa-tags" />
              <span>View Orders</span>
            </Link>
          </li>
          <li>
            <Link to="new-order">
              <i className="fa fa-plus-circle" />
              <span>New Order</span>
            </Link>
          </li>
          <li>
            <Link to="/console/client-management/client-new">
              <i className="fa fa-user" />
              <span>New Client</span>
            </Link>
          </li>
          <li className="loader">
            <i className="fa fa-spinner" />
          </li>
        </ul>

        <nav className="right-nav">
          <ul>
            <li onClick={handleFullScreenToggle}>
              <i className="full-screen-button fa fa-expand" />
              <span className="tool-tip">Toggle FullScreen</span>
            </li>
            <li>
              <i className="fa fa-money" />
              {alertNumbers.quoteRequests > 0 && (
                <span className="notification-number">
                  {alertNumbers.quoteRequests}
                </span>
              )}
              <span className="tool-tip">Quote Request</span>
            </li>
            <li>
              <i className="fa fa-envelope-o" />
              {alertNumbers.messages > 0 && (
                <span className="notification-number">
                  {alertNumbers.messages}
                </span>
              )}
              <span className="tool-tip">Messages</span>
            </li>
            <li>
              <i className="fa fa-desktop" />
              {alertNumbers.designOrderNote > 0 && (
                <span className="notification-number">
                  {alertNumbers.designOrderNote}
                </span>
              )}
              <span className="tool-tip">Design Notes</span>
            </li>
            <li className="display-m staff-options">
              {staff.staff_name}
              <ul>
                <li>
                  <i className="fa fa-user" />
                  <span>My Profile</span>
                </li>
                <li>
                  <i className="fa fa-power-off" />
                  <Link to="/console/console-logout">Log Out</Link>
                </li>
              </ul>
            </li>

            <li className="display-m " onClick={handleRightSectionToggle}>
              <i className="fa fa-bars" />
            </li>
          </ul>
        </nav>
      </nav>
    </React.Fragment>
  );
};

export default ApplicationHeader;
