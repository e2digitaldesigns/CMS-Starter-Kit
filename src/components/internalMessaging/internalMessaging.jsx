import React, { Component } from "react";
import { PageTemplateHeader } from "../utils/pageTemplate";
import InternalMessagingLeft from "./internalMessagingLeft";
import InternalMessagingRight from "./internalMessagingRight";
import InternalMessagingTopRight from "./interanlMessagingTopRight";
import { getMessages } from "./../../services/messages";

class internalMessaging extends Component {
  componentDidMount() {}

  state = {
    labels: [
      {
        id: 1,
        label: "Client",
        color: "primary"
      },
      {
        id: 2,
        label: "Send to Print",
        color: "secondary"
      },
      {
        id: 3,
        label: "Needs Help",
        color: "warning"
      }
    ],

    composing: false,
    currentMailBox: "",
    viewing: false,
    currentMessage: [],
    messages: getMessages()
  };

  handleMessageCompose = () => {
    const composing = true;
    const viewing = false;
    const currentMessage = [];
    const messages = [...this.state.messages];

    messages.forEach(function(message) {
      message.isSelected = false;
    });

    this.setState({ composing, viewing, messages, currentMessage });
  };

  handleMessageView = message => {
    const composing = false;
    const viewing = true;
    const currentMessage = message;
    const messages = [...this.state.messages];

    messages.forEach(function(message) {
      message.isSelected = false;
    });

    this.setState({ composing, viewing, messages, currentMessage });
  };

  handleCheckBoxSelect = message => {
    const isSelected = message.isSelected === true ? false : true;
    const messages = [...this.state.messages];
    const index = messages.indexOf(message);
    messages[index].isSelected = isSelected;

    if (messages.filter(m => m.isSelected === true).length > 1) {
      this.setState({
        composing: false,
        viewing: false,
        currentMessage: [],
        messages
      });
    } else {
      this.setState({ messages });
    }
  };

  getMessageSubject = (props, length) => {
    if (props.form_type === "quote") {
      return "Quote Request | " + props.form_array.site;
    } else if (props.form_type === "contact") {
      return "Contact Request | " + props.form_array.site;
    } else {
      if (length === "preview") {
        return props.form_array.subject.substring(0, 20);
      } else {
        return props.form_array.subject;
      }
    }
  };

  handleSeenToggle = (e, message) => {
    e.stopPropagation();
    console.log(96, "toggle", message);
  };

  handleTrashMessage = (e, message) => {
    e.stopPropagation();
    console.log(102, "trash", message);
  };

  render() {
    return (
      <React.Fragment>
        <PageTemplateHeader displayName="Internal Messaging" />

        <div className="main-content-div-holder internal-messaging-div-holder">
          <div className="card internal-messaging-card">
            <div className="card-body internal-messaging-card-body">
              <div className="row">
                <div className="internal-messaging-card-body-left col-5">
                  <div className="internal-messaging-top-left">
                    Select All | refresh | trash | options
                  </div>

                  <InternalMessagingLeft
                    state={this.state}
                    getMessageSubject={this.getMessageSubject}
                    handleCheckBoxSelect={this.handleCheckBoxSelect}
                    handleMessageView={this.handleMessageView}
                    handleSeenToggle={this.handleSeenToggle}
                    handleTrashMessage={this.handleTrashMessage}
                  />
                </div>

                <div className="internal-messaging-card-body-right col-7">
                  <InternalMessagingTopRight
                    handleMessageCompose={this.handleMessageCompose}
                  />

                  <InternalMessagingRight
                    state={this.state}
                    getMessageSubject={this.getMessageSubject}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <PageTemplateFooter /> */}
      </React.Fragment>
    );
  }
}

export default internalMessaging;
