import React from "react";

const InternalMessagingTopRight = ({ handleMessageCompose }) => {
  return (
    <React.Fragment>
      <div className="internal-messaging-top-right">
        <nav className="nav">
          <span className="nav-link active">Inbox</span>
          <span className="nav-link">Quote Request</span>
          <span className="nav-link">Conact Request</span>
          <span className="nav-link">Sent</span>
          <span className="nav-link">Trash</span>
          <span
            className="btn btn-sm btn-primary nav-link  mr-auto"
            onClick={handleMessageCompose}
          >
            Compose
          </span>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default InternalMessagingTopRight;
