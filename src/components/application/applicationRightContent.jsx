import React from "react";
import ApplicationRightContentChat from "./applicationRightContentChat";
import ApplicationRightContentCalculator from "./applicationRightContentCalculator";
import ApplicationRightContentToDoListItems from "./applicationRightContentToDoListItems";
import ApplicationRightContentSettings from "./applicationRightContentSettings";
import ApplicationRightContentNotifications from "./applicationRightContentNotifications";

const tabLinks = (e, section) => {
  const tab = document.querySelector(`.tab-header-` + section);
  if (tab.classList.contains("active")) return;

  const tabs = document.querySelectorAll("ul.right-content-section-menu li");
  const currentContent = document.querySelector(".tab-content.active");
  const newContent = document.querySelector(`.tab-content-` + section);

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  tab.classList.add("active");
  currentContent.classList.remove("active");
  currentContent.classList.remove("tab-content-in");
  currentContent.classList.add("tab-content-out");

  newContent.classList.add("active");
  newContent.classList.add("tab-content-in");
  newContent.classList.remove("tab-content-out");
};

const ApplicationRightContent = props => {
  return (
    <React.Fragment>
      <div className="right-content-section">
        <ul className="right-content-section-menu">
          <li
            className="tab-header tab-header-calculator active"
            onClick={e => tabLinks(e, "calculator")}
          >
            <i className="fa fa-calculator"></i>
          </li>

          <li
            className="tab-header tab-header-chat"
            onClick={e => tabLinks(e, "chat")}
          >
            <i className="fa fa-comments"></i>
          </li>

          <li
            className="tab-header tab-header-to-do"
            onClick={e => tabLinks(e, "to-do")}
          >
            <i className="fa fa-list-alt"></i>
          </li>

          <li
            className="tab-header tab-header-settings"
            onClick={e => tabLinks(e, "settings")}
          >
            <i className="fa fa-cogs"></i>
          </li>

          <li
            className="tab-header tab-header-notifications"
            onClick={e => tabLinks(e, "notifications")}
          >
            <i className="fa fa-bell"></i>
          </li>
        </ul>

        <div className="tab-content tab-content-calculator active">
          <ApplicationRightContentCalculator />
        </div>

        <div className="tab-content tab-content-chat">
          <ApplicationRightContentChat
            chatAvailable={
              props.staff.applicationRightContent.settings.chatAvailable
            }
          />
        </div>

        <div className="tab-content tab-content-to-do">
          <ApplicationRightContentToDoListItems />
        </div>

        <div className="tab-content tab-content-settings">
          <ApplicationRightContentSettings
            staffSettings={props.staff.applicationRightContent.settings}
            rightSettingsChange={props.handleSettingsChange}
          />
        </div>

        <div className="tab-content tab-content-notifications">
          <ApplicationRightContentNotifications childId={props.childId} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ApplicationRightContent;
