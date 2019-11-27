import React from "react";
import { Link } from "react-router-dom";

const PageTemplateHeader = ({
  displayName = "Change Me",
  buttonLink = "null",
  buttonText = "null"
}) => {
  return (
    <React.Fragment>
      <div className="page-header">
        <ul className="bread-crumb">
          <li>
            <i className="fa fa-home" />
            <Link to="/dashboard">Home</Link>
          </li>
          <li>{displayName}</li>
        </ul>

        <div className="page-header-info">
          <h3 className="content-title">{displayName}</h3>

          {buttonLink === "null" && (
            <span className="page-header-button">
              <button className="btn btn-sm btn-primary">{buttonText}</button>
            </span>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const PageTemplateFooter = () => {
  return (
    <React.Fragment>
      <div className="footer-tools">
        <span className="go-top">
          <i className="fa fa-chevron-up" /> Top
        </span>
      </div>
    </React.Fragment>
  );
};

export { PageTemplateHeader, PageTemplateFooter };
