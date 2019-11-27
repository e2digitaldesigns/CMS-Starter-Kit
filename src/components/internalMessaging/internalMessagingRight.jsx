import React from "react";
import InternalMessagingRightViewMessage from "./internalMessagingRightViewMessage";
import InternalMessagingRightCompose from "./internalMessagingRightCompose";
import InternalMessagingRightStarter from "./internalMessagingRightStarter";

const InternalMessagingRight = ({ state, getMessageSubject }) => {
  return (
    <React.Fragment>
      <div className="information-pane">{}</div>

      {state.viewing !== true && state.composing !== true && (
        <div className="internal-messaging-right internal-messaging-right-start">
          <InternalMessagingRightStarter state={state} />
        </div>
      )}

      {state.viewing === true && (
        <div className="internal-messaging-right internal-messaging-right-view">
          <InternalMessagingRightViewMessage
            state={state}
            getMessageSubject={getMessageSubject}
          />
        </div>
      )}

      {state.composing === true && (
        <div className="internal-messaging-right internal-messaging-right-compose">
          <InternalMessagingRightCompose state={state} />
        </div>
      )}
    </React.Fragment>
  );
};

export default InternalMessagingRight;
