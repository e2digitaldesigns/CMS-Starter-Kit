import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
// import Joi from "joi-browser";
import Joi from "joi";
import http from "../../services/httpServices";
import socketServices from "../../services/socketServices/socketServices";
import ApplicationRightContentChatContacts from "./ApplicationRightContentChatContacts";
import ApplicationRightContentChatOpen from "./ApplicationRightContentChatOpen";

class ApplicationRightContentChat extends Component {
  constructor(props) {
    super(props);

    let { result } = jwtDecode(localStorage.getItem("token"));
    // result = result[0];

    const state = {
      chatBeaconId: "",
      chatStatusResetId: "",
      child_id: result.child_id,
      // staff_id: result.staff_id,
      _id: result._id,
      chatOpen: false,
      currentUser: [],
      contactFilter: "",
      contactFilterResults: [],
      contacts: [],
      chatMessages: [],
      newChatMessage: { message: "" }
    };

    this.state = state;

    socketServices.subscribeChatServices((err, data) => {
      const contacts = [...this.state.contacts];

      if (data.data_type === "chat-message") {
        const index = contacts.findIndex(c => c._id === data.sender_id);

        if (data.receiver_id === this.state._id) {
          if (data.sender_id === this.state.currentUser._id) {
            const chatMessages = [...this.state.chatMessages, data];
            this.setState({ chatMessages });
            contacts[index].new_message_count = 0;
            this.handleSetChatMessagesSeen();
          } else {
            contacts[index].new_message_count++;
          }

          contacts[index].last_msg = data.message;
          contacts[index].sender_id = data.sender_id;

          const getContact = contacts[index];
          contacts.splice(index, 1);
          contacts.unshift(getContact);
          this.setState({ contacts });
        }
      }

      if (data.data_type === "chat-beacon" && data._id !== this.state._id) {
        const index = contacts.findIndex(c => c._id === data._id);
        if (index !== -1) {
          contacts[index].online = data.status;
          contacts[index].check = new Date();
          this.setState({ contacts });
        }
      }

      if (data.data_type === "chat-ping") {
        if (
          data.child_id === this.state.child_id &&
          data._id === this.state._id
        ) {
          this.chatBeacon();
        }
      }
    });
  }

  async componentDidMount() {
    try {
      const { data: contacts } = await http.get("staffChat");
      this.setState({ contacts });
    } catch (ex) {
      toast.warning("Chat not able to load..");
    }

    this.chatBeacon();
    this.chatPing();

    const chatBeaconId = setInterval(this.chatBeacon, 6000);
    const chatStatusResetId = setInterval(this.chatStatusReset, 4000);
    this.setState({ chatBeaconId, chatStatusResetId });
  }

  componentWillUnmount() {
    clearInterval(this.state.chatBeaconId);
    clearInterval(this.state.chatStatusResetId);
    socketServices.unSubscribeChatServices();
  }

  chatPing = () => {
    const contacts = [...this.state.contacts];

    for (let i = 0; i < contacts.length; i++) {
      const data = {
        data_type: "chat-ping",
        child_id: this.state.child_id,
        _id: contacts[i]._id
      };

      socketServices.sendChatData(data);
    }
  };

  chatStatusReset = () => {
    const contacts = [...this.state.contacts];
    let checkTime = 7500;

    for (let i = 0; i < contacts.length; i++) {
      if (
        new Date().valueOf() - new Date(contacts[i].check).valueOf() >
        checkTime
      ) {
        contacts[i].online = 0;
      }
    }

    this.setState({ contacts, checkNum: this.state.checkNum + 1 });
  };

  chatBeacon = () => {
    if (this.props.chatAvailable === 1) {
      const data = {
        data_type: "chat-beacon",
        child_id: this.state.child_id,
        _id: this.state._id,
        status: this.props.chatAvailable
      };

      socketServices.sendChatData(data);
    }
  };

  onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

      const schema = Joi.object().keys({
        message: Joi.string()
          .max(280)
          .required()
          .label("Chat Message")
      });

      const result = Joi.validate({ ...this.state.newChatMessage }, schema);

      if (result.error !== null) {
        toast.warning(result.error.details[0].message);
        return;
      }

      this.handleNewMessageSubmit();
    }
  };

  handleSetChatMessagesSeen = async () => {
    await http.put("staffChat/seen/" + this.state.currentUser._id);
  };

  handleNewMessageSubmit = async () => {
    const state = { ...this.state };

    try {
      const { data: chatMessageData } = await http.post("staffChat", {
        child_id: state.child_id,
        sender_id: state._id,
        receiver_id: state.currentUser._id,
        message: state.newChatMessage.message
      });

      //Display Message
      const chatMessages = [...state.chatMessages, chatMessageData];

      //Move User to Top
      const contacts = [...state.contacts];
      const currentUser = state.currentUser;
      const index = contacts.indexOf(currentUser);
      contacts.splice(index, 1);
      currentUser.last_msg = state.newChatMessage.message;
      currentUser.sender_id = state._id;
      currentUser.new_messages = [];
      contacts.unshift(currentUser);

      this.setState({
        contacts,
        chatMessages,
        newChatMessage: { message: "" }
      });

      //Scroll to Sent Message
      const scrollDiv = document.querySelector(
        ".right-nav-pill-content-chat-open > div > div"
      );

      scrollDiv.scrollTo({
        left: 0,
        top: scrollDiv.scrollHeight,
        behavior: "smooth"
      });
    } catch (ex) {
      toast.warning("Chat application has failed....");
    }
  };

  handOnlineStatusToggle = async () => {};

  handleChatWindows = window => {
    const chatMessageWindow = document.querySelector(
      ".tab-content-chat-messages-holder"
    );

    const chatContactWindow = document.querySelector(
      ".tab-content-chat-contact-holder"
    );

    if (window === "messages") {
      chatMessageWindow.classList.add("tab-content-chat-in");
      chatMessageWindow.classList.remove("tab-content-chat-out");

      chatContactWindow.classList.add("tab-content-chat-out");
      chatContactWindow.classList.remove("tab-content-chat-in");
    } else {
      chatContactWindow.classList.add("tab-content-chat-in");
      chatContactWindow.classList.remove("tab-content-chat-out");

      chatMessageWindow.classList.add("tab-content-chat-out");
      chatMessageWindow.classList.remove("tab-content-chat-in");
    }
  };

  handleOpenChat = async contact => {
    try {
      const contacts = [...this.state.contacts];
      const index = contacts.indexOf(contact);
      contacts[index].new_message_count = 0;
      const apiUrl = "staffChat/" + this.state._id + "/" + contact._id;
      const { data: chatMessages } = await http.get(apiUrl);
      this.setState({
        chatOpen: true,
        currentUser: contacts[index],
        chatMessages
      });
      this.handleChatWindows("messages");
    } catch {}
  };

  handleOpenContacts = () => {
    this.setState({ chatOpen: false, currentUser: "" });
    this.handleChatWindows("contacts");
  };

  handleContactFilter = ({ currentTarget }) => {
    const contactFilter = currentTarget.value;
    const contacts = [...this.state.contacts];

    const contactFilterResults = contacts.filter(c =>
      c.staff_name.toLowerCase().includes(contactFilter.toLowerCase())
    );

    this.setState({ contactFilter, contactFilterResults });
  };

  handleNewMessageChange = ({ currentTarget }) => {
    const newChatMessage = { ...this.state.newChatMessage };
    newChatMessage.message = currentTarget.value;
    this.setState({ newChatMessage });
  };

  render() {
    const {
      _id,
      contacts,
      contactFilter,
      contactFilterResults,
      chatMessages,
      newChatMessage,
      currentUser
    } = this.state;

    const filtered = contactFilter === "" ? contacts : contactFilterResults;

    return (
      <React.Fragment>
        <span className="tab-content-chat-messages-holder">
          <ApplicationRightContentChatOpen
            _id={_id}
            currentUser={currentUser}
            chatMessages={chatMessages}
            handleOpenContacts={this.handleOpenContacts}
            newChatMessage={newChatMessage}
            handleNewMessageChange={this.handleNewMessageChange}
            onEnterPress={this.onEnterPress}
          />
        </span>

        <span className="tab-content-chat-contact-holder">
          <ApplicationRightContentChatContacts
            _id={_id}
            contacts={filtered}
            handleOpenChat={this.handleOpenChat}
            contactFilter={contactFilter}
            handleContactFilter={this.handleContactFilter}
          />
        </span>
      </React.Fragment>
    );
  }
}

export default ApplicationRightContentChat;
