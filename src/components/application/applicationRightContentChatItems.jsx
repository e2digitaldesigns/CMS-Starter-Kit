import React from "react";

const ApplicationRightContentChatItems = ({ c, _id, handleOpenChat }) => {
  return (
    <li className="chat-contact-item" onClick={() => handleOpenChat(c)}>
      <span className="letter-holder">{c.staff_name.charAt(0)}</span>

      <span className={c.online === 1 ? "status online " : "status offline "} />

      {typeof c.new_message_count === "number" && c.new_message_count > 0 && (
        <div className="new-chat-message-count">{c.new_message_count} new</div>
      )}

      <div className="user-data">
        <span className="name">
          <span
            className={c.new_message_count > 0 ? "message-name-unread" : ""}
          >
            {c.staff_name}
          </span>
          <span className="message">
            <br />
            {c.sender_id === _id && "you: "}
            {c.last_msg !== null && c.last_msg.substring(0, 22)}
          </span>
        </span>
      </div>
    </li>
  );
};

export default ApplicationRightContentChatItems;
