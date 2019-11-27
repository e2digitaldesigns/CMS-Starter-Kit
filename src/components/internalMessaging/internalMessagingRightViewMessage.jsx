import React from "react";

const InternalMessagingRightViewMessage = ({ state, getMessageSubject }) => {
  console.log(state.currentMessage);

  return (
    <React.Fragment>
      <div className="pull-right">
        <span>Today, 19:30</span>
        <span>
          <div
            className="btn-group"
            role="group"
            aria-label="Button group with nested dropdown"
          >
            <button type="button" className="btn btn-secondary">
              <i className="fa fa-trash" />
            </button>

            <div className="btn-group btn-group-sm" role="group">
              <button
                id="btnGroupDrop1"
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-chevron-down" />
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="btnGroupDrop1"
              >
                {/* <a className="dropdown-item">Dropdown link</a>
                <a className="dropdown-item">Dropdown link</a> 
                
                
                  <a href="#">&lt;jerome_sallee@website.com&gt;</a> 
                    .dropdown-toggle:after { content: none }

                */}
              </div>
            </div>
          </div>
        </span>
      </div>

      <div className="media">
        <div className="media-body">
          <span className="d-block">
            <h5>{state.currentMessage.form_array.name}</h5>
          </span>{" "}
          <span>
            &lt;
            {state.currentMessage.form_type === "inner"
              ? state.currentMessage.form_array.name
              : state.currentMessage.form_array.email}
            &gt; to me
          </span>
        </div>
      </div>

      <h4>{getMessageSubject(state.currentMessage, "preview")}</h4>
      <hr />
      <span className="message-body">
        {state.currentMessage.form_array.message}
      </span>

      <span className="message-body">
        <hr />
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </span>
    </React.Fragment>
  );
};

export default InternalMessagingRightViewMessage;
