import React from "react";
import ApplicationRightContentHeaderItem from "./applicationRightContentHeaderItem";
import ApplicationRightContentChat from "./applicationRightContentChat";
import ApplicationRightContentCalculator from "./applicationRightContentCalculator";
import ApplicationRightContentToDoListItems from "./applicationRightContentToDoListItems";
import ApplicationRightContentSettings from "./applicationRightContentSettings";
import ApplicationRightContentNotifications from "./applicationRightContentNotifications";

const ApplicationRightContent = props => {
  const { staff, childId, handleSettingsChange } = props;

  return (
    <React.Fragment>
      <div className="right-content-section">
        <ul className="right-content-section-menu">
          <ApplicationRightContentHeaderItem section="calculator" />
          <ApplicationRightContentHeaderItem section="chat" />
          <ApplicationRightContentHeaderItem section="todo" />
          <ApplicationRightContentHeaderItem section="settings" />
          <ApplicationRightContentHeaderItem
            section="notifications"
            status="active"
          />
        </ul>

        <div className="tab-content tab-content-calculator">
          <ApplicationRightContentCalculator />
        </div>

        <div className="tab-content tab-content-chat">
          <ApplicationRightContentChat
            chatAvailable={staff.applicationRightContent.settings.chatAvailable}
          />
        </div>

        <div className="tab-content tab-content-to-do">
          <ApplicationRightContentToDoListItems />
        </div>

        <div className="tab-content tab-content-settings">
          <ApplicationRightContentSettings
            staffSettings={staff.applicationRightContent.settings}
            rightSettingsChange={handleSettingsChange}
          />
        </div>

        <div className="tab-content tab-content-notifications active">
          <ApplicationRightContentNotifications childId={childId} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ApplicationRightContent;
