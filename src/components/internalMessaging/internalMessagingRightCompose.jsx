import React from "react";

const InternalMessagingRightCompose = ({ state }) => {
  return (
    <React.Fragment>
      <form>
        <div className="form-group row">
          <label htmlFor="to" className="col-sm-2 col-form-label">
            To
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="to"
              className="form-control form-control-sm"
              placeholder=""
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="subject" className="col-sm-2 col-form-label">
            Subject
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="subject"
              className="form-control form-control-sm"
              placeholder="Subject..."
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="subject" className="col-sm-2 col-form-label">
            Subject
          </label>
          <div className="col-sm-10">
            <textarea className="form-control" rows="3" />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default InternalMessagingRightCompose;
