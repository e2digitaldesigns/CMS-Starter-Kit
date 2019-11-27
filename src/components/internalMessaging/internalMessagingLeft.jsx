import React from "react";
//import { Scrollbars } from "react-custom-scrollbars";

const getMessageClass = props => {
  let className;

  className =
    props.form_seen === "1"
      ? className + " message-list-item  seen "
      : " message-list-item ";
  return (className =
    props.selected === "1" ? className + " selected " : className);
};

const InternalMessagingLeft = ({
  state,
  getMessageSubject,
  handleCheckBoxSelect,
  handleMessageView,
  handleSeenToggle,
  handleTrashMessage
}) => {
  return (
    <React.Fragment>
      <ul id="internal-messaging-list">
        {state.messages.map(m => (
          <li key={m.table_id} className={getMessageClass(m)}>
            <div className="checkbox-holder pull-left">
              <input
                type="checkbox"
                checked={m.isSelected === true ? "checked" : ""}
                onChange={() => handleCheckBoxSelect(m)}
              />
            </div>

            <div
              className="list-information-holder"
              onClick={() => handleMessageView(m)}
            >
              <div className="list-information-holder" />

              <div className="list-information-holder">
                <span className="message-from">
                  (from) {m.form_array.name}{" "}
                </span>
                <span className="message-date pull-right">Today, 12:30 am</span>
                <div className="clearfix" />
                <span className="message-subject pull-left">
                  (subject) {getMessageSubject(m, "preview")}
                </span>
                <span className="message-preview-icons pull-right">
                  {m.form_array.attachments.length > 0 && (
                    <span className="message-list-attachments pull-right">
                      <i className="fa fa-paperclip" />
                    </span>
                  )}

                  <span className="message-list-hover-options pull-right">
                    <i
                      className="fa fa-envelope-o"
                      onClick={e => handleSeenToggle(e, m)}
                    />{" "}
                    <i
                      className="fa fa-trash-o"
                      onClick={e => handleTrashMessage(e, m)}
                    />{" "}
                  </span>
                </span>{" "}
                <span className="message-list-preview">
                  <br />
                  {m.form_type === "quote"
                    ? m.form_array.specifications.substring(0, 20)
                    : m.form_array.message.substring(0, 20)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default InternalMessagingLeft;

// https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd
