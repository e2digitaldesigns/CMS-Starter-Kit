import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import TimeAgo from "react-timeago";
import { toast } from "react-toastify";
import http from "../../services/httpServices";
import socketServices from "../../services/socketServices/socketServices";

const notificationIconMap = {
  "contact-request": "fa fa-home",
  "customer-login": "fa fa-sign-in",
  "design-order-approval": "fa fa-thumbs-up",
  "design-order-note": "fa fa-edit",
  "invoice-payment": "fa fa-money",
  "new-user": "fa fa-user",
  "new-order": "fa fa-cart-plus",
  "quote-request": "fa fa-home",
  "shopping-cart": "fa fa-shopping-cart",
  "staff-login": "fa fa-users"
};

class ApplicationRightContentNotifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    };

    socketServices.subscribeNotificationServices((err, data) => {
      if (data.child_id === props.childId) {
        const state = { ...this.state };
        state.notifications.unshift(data);
        this.setState(state);
      }
    });
  }

  async componentDidMount() {
    try {
      const { data: notifications } = await http.get("notifications/");
      this.setState({ notifications });
    } catch (ex) {
      toast("No Notifications have been loaded.");
    }
  }

  componentWillUnmount() {
    socketServices.unSubscribeNotificationServices();
  }

  render() {
    return (
      <React.Fragment>
        <div className="right-content-header">Notifications</div>

        <div className="right-nav-pill-content right-nav-pill-content-notifications">
          <Scrollbars
            autoHide
            style={{
              autoHeight: true
            }}
          >
            <ul>
              {this.state.notifications.map(n => (
                <li key={n._id} onClick={this.handleClick}>
                  <div className="icon">
                    <span className={notificationIconMap[n.type]} />
                  </div>
                  <div className="info">
                    <div className="title">{n.title}</div>
                    <div className="desc">{n.description}</div>
                    <div className="date time">
                      <time className="show-time" title="07 13, 2018">
                        <TimeAgo date={n.timestamp} />
                      </time>
                    </div>
                  </div>
                  <div className="clearfix" />
                </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
      </React.Fragment>
    );
  }
}

export default ApplicationRightContentNotifications;
