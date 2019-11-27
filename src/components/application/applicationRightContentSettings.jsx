import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { RightSettingsRadio } from "../utils/formUtilites";

const ApplicationRightContentSettings = ({
  staffSettings,
  rightSettingsChange
}) => {
  return (
    <React.Fragment>
      <div className="right-content-header">Settings</div>

      <div className="right-nav-pill-content right-nav-pill-content-settings">
        <Scrollbars
          autoHide
          style={{
            autoHeight: true
          }}
        >
          <h4>Staff Chat </h4>
          <ul className="setting-list">
            <li>
              <RightSettingsRadio
                sType="internalMessaging"
                name="chatAvailable"
                label="Available / Online"
                checked={staffSettings.chatAvailable}
                onChange={rightSettingsChange}
              />
            </li>
          </ul>

          <h4>Internal Messaging</h4>
          <ul className="setting-list">
            <li>
              <RightSettingsRadio
                sType="internalMessaging"
                name="contactRequest"
                label="Contact Request"
                checked={staffSettings.internalMessaging.contactRequest}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="internalMessaging"
                name="printFiles"
                label="New Print Files"
                checked={staffSettings.internalMessaging.printFiles}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="internalMessaging"
                name="quoteRequest"
                label="Quote Request"
                checked={staffSettings.internalMessaging.quoteRequest}
                onChange={rightSettingsChange}
              />
            </li>
          </ul>

          <h4>Notifications</h4>
          <ul className="setting-list">
            <li>
              <RightSettingsRadio
                sType="notifications"
                name="enableNotifications"
                label="Enable Notifications"
                checked={staffSettings.notifications.enableNotifications}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="enableNotificationsSound"
                label="Enable Notifications Sound"
                checked={staffSettings.notifications.enableNotificationsSound}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="customerLogin"
                label="Customer Login"
                checked={staffSettings.notifications.customerLogin}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="designOrderNote"
                label="Design Order Notes"
                checked={staffSettings.notifications.designOrderNote}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="designOrderApproval"
                label="Design Order Approval"
                checked={staffSettings.notifications.designOrderApproval}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="internalMessaging"
                label="Internal Messaging"
                checked={staffSettings.notifications.internalMessaging}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="newOrder"
                label="New Order"
                checked={staffSettings.notifications.newOrder}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="newUser"
                label="New User"
                checked={staffSettings.notifications.newUser}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="printFiles"
                label="New Print Files"
                checked={staffSettings.notifications.printFiles}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="quoteRequest"
                label="Price/Quote Request"
                checked={staffSettings.notifications.quoteRequest}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="shoppingCart"
                label="Shopping Cart"
                checked={staffSettings.notifications.shoppingCart}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="staffLogin"
                label="Staff Login"
                checked={staffSettings.notifications.staffLogin}
                onChange={rightSettingsChange}
              />
            </li>

            <li>
              <RightSettingsRadio
                sType="notifications"
                name="supplierUpdates"
                label="Supplier Updates"
                checked={staffSettings.notifications.supplierUpdates}
                onChange={rightSettingsChange}
              />
            </li>
          </ul>
        </Scrollbars>
      </div>
    </React.Fragment>
  );
};

export default ApplicationRightContentSettings;
