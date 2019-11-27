import React from "react";

const InternalMessagingLeft = ({ state }) => {
  return (
    <React.Fragment>
      {/* <div className="mail-box-name">
        <span className="text-md">Inbox</span>
        <span className="badge badge-primary pull-right mt-1 mr-2">5</span>
      </div> */}

      <button className="btn btn-primary btn-block btn-sm">Compose</button>

      <div className="mail-box-holder">
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <i className="fa fa-inbox" /> Inbox
            </span>
            <span className="badge badge-primary badge-pill">14</span>
          </li>

          <li className="list-group-item">
            <i className="fa fa-paper-plane" /> Sent
          </li>

          <li className="list-group-item">
            <i className="fa fa-pencil-square" /> Draft
          </li>

          <li className="list-group-item">
            <i className="fa fa-trash" /> Trash
          </li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>

      <div className="label-holder">
        <ul>
          {state.labels.map(l => (
            <li key={l.id}>
              <span className={"btn btn-sm btn-" + l.color}>{l.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="input-group input-group-sm mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="New label"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-plus text-muted" />
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InternalMessagingLeft;
