import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import TimeAgo from "react-timeago";

const ApplicationRightContentChatOpen = ({ ...props }) => {
  const {
    staff_id,
    currentUser,
    chatMessages,
    handleOpenContacts,
    newChatMessage,
    handleNewMessageChange,
    onEnterPress
  } = props;
  return (
    <React.Fragment>
      <div className="right-content-header">
        <i className="fa fa-chevron-circle-left" onClick={handleOpenContacts} />{" "}
        {currentUser.staff_name}
      </div>

      <div className="right-nav-pill-content right-nav-pill-content-chat-open">
        <Scrollbars
          autoHide
          style={{
            autoHeight: true
          }}
        >
          <ul className="chat-message-list">
            {chatMessages.map(m => (
              <li
                key={m._id}
                className={staff_id === m.sender_id ? "self" : "friend"}
              >
                {m.message}

                <div className="msg-time">
                  <TimeAgo date={m.time_stamp} />
                </div>
              </li>
            ))}
          </ul>
        </Scrollbars>

        <div className="chat-message-sender-holder">
          <form>
            <textarea
              value={newChatMessage.message}
              onChange={handleNewMessageChange}
              onKeyDown={onEnterPress}
              className="chat-message-new"
              placeholder="Message..."
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ApplicationRightContentChatOpen;
