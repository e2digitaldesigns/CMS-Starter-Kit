import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

const ApplicationLeftNav = () => {
  const openToggle = (e, index, length) => {
    if (length < 1) return;
    e.preventDefault();
    const li = document.querySelectorAll(".left-sidebar-elements > li");
    for (let i = 0; i < li.length; i++) {
      if (i !== index) li[i].classList.remove("open");
    }

    li[index].classList.toggle("open");

    if (li[index].classList.contains("open")) {
      const scrollDiv = document.querySelector(
        ".left-menu-section > div > div"
      );

      setTimeout(() => {
        scrollDiv.scrollTo({
          top: li[index].offsetTop,
          behavior: "smooth"
        });
      }, 100);
    }
  };

  const listItems = [
    {
      icon: "fa fa-tachometer",
      display: "Dashboard",
      uri: "/dashboard",
      subs: []
    },
    {
      icon: "fa fa-user",
      display: "Client Management",
      uri: "/client-management",
      subs: [
        {
          display: "Client Listing",
          uri: "/client-management/client-listing"
        },
        {
          display: "New Client",
          uri: "/client-management/client-new"
        },
        {
          display: "Import Clients",
          uri: "/client-management/import"
        },
        {
          display: "Export Clients",
          uri: "/client-management/export"
        }
      ]
    },
    {
      icon: "fa fa-users",
      display: "Staff Management",
      uri: "/staff-management",
      subs: [
        {
          display: "Staff Listing",
          uri: "/staff-management/staff-listing"
        },
        {
          display: "New Staff Member",
          uri: "/staff-management/staff-new"
        }
      ]
    },
    {
      icon: "fa fa-comment",
      display: "Customer Chat",
      uri: "/customer-chat",
      subs: [
        {
          display: "Customer Chat",
          uri: "/customer-chat"
        },
        {
          display: "Customer Chat Settings",
          uri: "/customer-chat/settings"
        }
      ]
    }
  ];

  return (
    <div className="left-menu-section">
      <Scrollbars
        autoHide
        style={{
          autoHeight: true
        }}
      >
        <ul className="left-sidebar-elements">
          {listItems.map((listItem, index) => (
            <li
              key={index}
              className={
                "/" + window.location.href.split("/")[4] === listItem.uri
                  ? "open"
                  : ""
              }
            >
              <NavLink
                className={listItem.subs.length > 0 ? "parent" : ""}
                to={"/console" + listItem.uri}
                onClick={e => openToggle(e, index, listItem.subs.length)}
              >
                <i className={listItem.icon} />
                <span>{listItem.display}</span>
              </NavLink>
              {listItem.subs.length > 0 && (
                <ul>
                  {listItem.subs.map(sub => (
                    <li key={sub.uri}>
                      <Link to={"/console" + sub.uri}>{sub.display}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Scrollbars>
    </div>
  );
};

export default ApplicationLeftNav;
