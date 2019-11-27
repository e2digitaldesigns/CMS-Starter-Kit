import React from "react";

const InternalMessagingRightStarter = ({ state }) => {
  const isSelectedCount = state.messages.filter(m => m.isSelected === true)
    .length;

  return (
    <React.Fragment>
      <div>
        <i className="fa fa-envelope-o big-fa" aria-hidden="true" />
        <p>
          {isSelectedCount === 0 && "Select a Message to Read!"}

          {isSelectedCount > 1 && (
            <React.Fragment>
              <span>{isSelectedCount}</span> conversations selected
            </React.Fragment>
          )}
        </p>

        {isSelectedCount > 1 && (
          <table className="table" role="table">
            <tbody>
              <tr>
                <td className="text-right" width="40%">
                  <i className="fa fa-trash-o" />
                </td>
                <td>Delete</td>
              </tr>

              <tr>
                <td className="text-right">
                  <i className="fa fa-envelope-o" />
                </td>
                <td>Mark as Unread</td>
              </tr>

              <tr>
                <td className="text-right">
                  <i className="fa fa-envelope-open-o" />
                </td>
                <td>Mark as Read</td>
              </tr>

              <tr>
                <td className="text-right">
                  <i className="fa fa-folder-o" />
                </td>
                <td>Move to Inbox</td>
              </tr>

              <tr>
                <td className="text-right">
                  <i className="fa fa-ban" />
                </td>
                <td>Cancel</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

export default InternalMessagingRightStarter;
