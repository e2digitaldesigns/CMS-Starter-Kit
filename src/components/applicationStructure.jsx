import React, { Component } from "react";
import ApplicationHeader from "./applicationHeader";
import ApplicationRouter from "./applicationRouter";
import ApplicationLeftNav from "./applicationLeftNav";
import ApplicationRightContent from "./application/applicationRightContent";
import ApplicationBottomChyron from "./applicationBottomChyron";

import jwtDecode from "jwt-decode";
import http from "../services/httpServices";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import socketServices from "../services/socketServices/socketServices";
import { notificationMaping } from "./utils/globalUtilities";

class ApplicationStructure extends Component {
  constructor(props) {
    super(props);
    let { result: token } = jwtDecode(localStorage.getItem("token"));

    this.state = {
      childId: token.child_id,
      loggedIn: "0",
      staff: {
        staff_id: token.staff_id,
        staff_name: token.name,
        applicationRightContent: {
          settings: {
            chatAvailable: 0,
            internalMessaging: {
              contactRequest: 0,
              quoteRequest: 0,
              printFiles: 0
            },
            notifications: {
              enableNotifications: 0,
              enableNotificationsSound: 0,
              customerLogin: 0,
              designOrderNote: 0,
              designOrderApproval: 0,
              internalMessaging: 0,
              newOrder: 0,
              newUser: 0,
              printFiles: 0,
              quoteRequest: 0,
              shoppingCart: 0,
              staffLogin: 0,
              supplierUpdates: 0
            }
          }
        },
        permissions: {}
      },
      alertNumbers: {
        quoteRequests: 3,
        designOrderNote: 51,
        messages: 2
      }
    };

    socketServices.subscribeNotificationServices((err, data) => {
      const nSettings = this.state.staff.applicationRightContent.settings
        .notifications;

      if (
        data.child_id === this.state.childId &&
        nSettings.enableNotifications === 1 &&
        nSettings[notificationMaping()[data.type]] === 1
      ) {
        toast.info(data.description);
      }
    });
  }

  async componentDidMount() {
    //RIGHT CONTENT SETTINGS
    try {
      const { data } = await http.get("staffSettings/");
      const state = { ...this.state };

      const applicationRightContent = {
        ...state.staff.applicationRightContent
      };
      applicationRightContent.settings.chatAvailable = data.chat_available
        ? data.chat_available
        : 0;

      for (let key in data.internal_messaging_settings) {
        applicationRightContent.settings.internalMessaging[key] =
          data.internal_messaging_settings[key];
      }

      for (let key in data.notification_settings) {
        applicationRightContent.settings.notifications[key] =
          data.notification_settings[key];
      }

      this.setState(state);
    } catch (err) {
      console.log(err);
      toast("No Notification settings have been selected.");
    }
  }

  componentWillUnmount() {
    socketServices.unSubscribeNotificationServices();
  }

  handleSettingsChange = async e => {
    const originalApplicationRightContent = {
      ...this.state.staff.applicationRightContent
    };
    const applicationRightContent = {
      ...this.state.staff.applicationRightContent
    };
    let value;

    if (e.currentTarget.name === "chatAvailable") {
      value = applicationRightContent.settings.chatAvailable === 1 ? 0 : 1;
      applicationRightContent.settings.chatAvailable = value;

      const data = {
        data_type: "chat-beacon",
        child_id: this.state.child_id,
        staff_id: this.state.staff.staff_id,
        status: value
      };

      //Send Message
      socketServices.sendChatData(data);
    } else {
      value =
        applicationRightContent.settings[e.currentTarget.className][
          e.currentTarget.name
        ] === 1
          ? 0
          : 1;
      applicationRightContent.settings[e.currentTarget.className][
        e.currentTarget.name
      ] = value;
    }

    this.setState({ applicationRightContent });

    const options = {
      chat_available: this.state.staff.applicationRightContent.settings
        .chatAvailable,
      internal_messaging_settings: this.state.staff.applicationRightContent
        .settings.internalMessaging,
      notification_settings: this.state.staff.applicationRightContent.settings
        .notifications
    };

    try {
      await http.put("staffSettings/", {
        options
      });
    } catch {
      this.setState({ staff: originalApplicationRightContent });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ApplicationHeader
          handleConsoleLogOut={this.props.handleConsoleLogOut}
          alertNumbers={this.state.alertNumbers}
          staff={this.state.staff}
        />

        <div className="wrapper toggle-right-menu-hide">
          <ApplicationLeftNav />
          <ApplicationRouter />

          <ApplicationRightContent
            {...this.state}
            handleSettingsChange={this.handleSettingsChange}
          />

          <ApplicationBottomChyron />
        </div>
      </React.Fragment>
    );
  }
}

export default ApplicationStructure;
