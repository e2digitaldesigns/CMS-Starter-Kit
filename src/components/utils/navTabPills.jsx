import React from "react";

const NavTabPillListItem = ({ active, link, icon }) => {
  return (
    <li className="nav-item">
      <a
        className={active === "1" ? "nav-link active" : "nav-link"}
        id={link + "_id"}
        data-toggle="pill"
        href={"#" + link}
        role="tab"
        aria-controls={link}
        aria-selected={active === "1" ? "true" : "false"}
      >
        <span className={" fa " + icon} />
      </a>
    </li>
  );
};

export { NavTabPillListItem };
