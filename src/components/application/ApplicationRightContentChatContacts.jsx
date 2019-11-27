import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import ApplicationRightContentChatItems from "./applicationRightContentChatItems";

const ApplicationRightContentChatContacts = ({ ...props }) => {
  const {
    contacts,
    staff_id,
    handleOpenChat,
    contactFilter,
    handleContactFilter
  } = props;

  return (
    <React.Fragment>
      <div className="right-content-header">Chat Contacts </div>

      <div className="right-nav-pill-content right-nav-pill-content-chat-contacts">
        <Scrollbars
          autoHide
          style={{
            autoHeight: true
          }}
        >
          <ul className="chat-contact-list">
            {contacts.find(c => c.online === 1) && (
              <li className="chat-contact-header">Online Contacts</li>
            )}

            {contacts
              .filter(o => o.online === 1)
              .map(c => (
                <ApplicationRightContentChatItems
                  key={c.staff_id}
                  c={c}
                  staff_id={staff_id}
                  handleOpenChat={handleOpenChat}
                />
              ))}

            {contacts.find(c => c.online === 0) && (
              <li className="chat-contact-header">Offline Contacts</li>
            )}

            {contacts
              .filter(o => o.online !== 1)
              .map(c => (
                <ApplicationRightContentChatItems
                  key={c.staff_id}
                  c={c}
                  staff_id={staff_id}
                  handleOpenChat={handleOpenChat}
                />
              ))}
          </ul>
        </Scrollbars>
      </div>

      <div className="chat-contacts-search-holder">
        <input
          type="text"
          className="chat-contact-search"
          placeholder="Search..."
          value={contactFilter}
          onChange={handleContactFilter}
        />
      </div>
    </React.Fragment>
  );
};

export default ApplicationRightContentChatContacts;
