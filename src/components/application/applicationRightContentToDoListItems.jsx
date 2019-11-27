import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import http from "../../services/httpServices";

class ApplicationRightContentToDoListItems extends Component {
  state = {
    toDoListItems: [],
    toDoListMessage: ""
  };

  async componentDidMount() {
    const { data: toDoListItems } = await http.get("/adminToDoList");
    this.setState({ toDoListItems });
  }

  handleToDoListMessageUpdate = e => {
    this.setState({ toDoListMessage: e.currentTarget.value });
  };

  schema = {
    toDoListItems: Joi.array(),
    toDoListMessage: Joi.string()
      .required()
      .label("To Do List Item")
  };

  validate = () => {
    const { error } = Joi.validate(this.state, this.schema);
    return error;
  };

  handleToDoListNew = async e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();

      const error = this.validate();
      if (error !== null) {
        toast.info(error.details[0].message);
        return;
      }

      let { toDoListItems, toDoListMessage } = this.state;

      try {
        const { data: result } = await http.post("/adminToDoList", {
          item: toDoListMessage
        });

        const newItem = {
          _id: result._id,
          item: toDoListMessage,
          checked: "0"
        };

        toDoListItems = [...toDoListItems, newItem];
        this.setState({ toDoListItems, toDoListMessage: "" });

        const scrollDiv = document.querySelector(
          ".right-nav-pill-content-to-do-list > div > div"
        );

        scrollDiv.scrollTo({
          left: 0,
          top: scrollDiv.scrollHeight,
          behavior: "smooth"
        });
      } catch (ex) {
        toast.warning("Error: The To Do List service is not responding");
      }
    }
  };

  handleToDoListStatus = async item => {
    const toDoListItems = [...this.state.toDoListItems];
    const index = toDoListItems.indexOf(item);
    const _id = toDoListItems[index]._id;
    const checked = toDoListItems[index].checked === true ? false : true;
    toDoListItems[index].checked = checked;

    try {
      await http.put("/adminToDoList/" + _id, { checked });
      this.setState({ toDoListItems });
    } catch {
      toast.error("Error: Unable to change To Do List item...");
    }
  };

  handleToDoListDelete = async id => {
    let toDoListItems = [...this.state.toDoListItems];
    toDoListItems = toDoListItems.filter(m => m._id !== id);

    try {
      await http.delete("/adminToDoList/" + id);
      this.setState({ toDoListItems });
    } catch {
      toast.error("Error: Unable to remove To Do List item...");
    }
  };

  render() {
    const { toDoListItems, toDoListMessage } = this.state;
    const toDoComplete = toDoListItems.filter(t => t.checked === true);

    return (
      <React.Fragment>
        <div className="right-content-header">
          To Do List
          <span className="pull-right">
            {toDoComplete.length} / {toDoListItems.length}
          </span>
        </div>

        <div className="right-nav-pill-content right-nav-pill-content-to-do-list">
          <Scrollbars
            autoHide
            style={{
              autoHeight: true
            }}
          >
            <div className="to-do-list">
              <ul>
                {toDoListItems.map(toDoListItem => (
                  <li
                    key={toDoListItem._id}
                    className={toDoListItem.checked === true ? "checked" : ""}
                  >
                    <div
                      className="right-to-do-list-message"
                      onClick={() => this.handleToDoListStatus(toDoListItem)}
                    >
                      {toDoListItem.item}
                    </div>
                    <div
                      className="todo-close"
                      onClick={() =>
                        this.handleToDoListDelete(toDoListItem._id)
                      }
                    >
                      <i className="fa fa-trash" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Scrollbars>
        </div>

        <div className="to-do-list-message-form-holder">
          <form>
            <textarea
              value={toDoListMessage}
              onChange={this.handleToDoListMessageUpdate}
              onKeyDown={this.handleToDoListNew}
              placeholder="Message..."
              autoComplete="off"
            />

            <button className="">Add New To Do List Item</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ApplicationRightContentToDoListItems;
