import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

class ApplicationRightContentCalculator extends Component {
  state = {
    screen: ""
  };

  operatorCheck = (screen, num, operators) => {
    if (!operators.includes(screen[screen.length - 1]) && screen.length !== 0) {
      return true;
    }
  };

  handleNumPadPress = num => {
    let screen = String(this.state.screen);
    let operators = ["/", "*", "-", "+", "-"];

    switch (num) {
      case "C":
        screen = "";
        break;

      case "/":
      case "X":
      case "-":
      case "+":
        if (this.operatorCheck(screen, num, operators)) {
          const op = num === "X" ? "*" : num;
          screen = screen + op;
        }
        break;

      case "<":
        screen = screen.substr(0, screen.length - 1);
        break;

      case "=":
        if (operators.includes(screen[screen.length - 1])) {
          screen = screen.substr(0, screen.length - 1);
        }

        if (screen.length >= 3) {
          screen = eval(screen);
        }
        break;

      default:
        screen = screen + num;
    }

    this.setState({ screen });
  };

  handleNumPadClass = num => {
    let classer = " calculator-button ";

    if (num === "=") {
      classer = classer + " equal ";
    }

    if (num === "0") {
      classer = classer + " zero ";
    }
    return classer;
  };

  render() {
    const numberPad = [
      "C",
      "<",
      "/",
      "X",
      "7",
      "8",
      "9",
      "-",
      "4",
      "5",
      "6",
      "+",
      "1",
      "2",
      "3",
      "=",
      "0",
      "."
    ];

    return (
      <React.Fragment>
        <div className="right-content-header">Calculator</div>

        <div className="right-nav-pill-content right-nav-pill-content-calculator">
          <Scrollbars
            autoHide
            style={{
              autoHeight: true
            }}
          >
            <div className="calculator-number-pad">
              <span className="calculator-view">{this.state.screen}</span>

              {numberPad.map(n => (
                <button
                  key={n}
                  className={this.handleNumPadClass(n)}
                  onClick={() => this.handleNumPadPress(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </Scrollbars>
        </div>
      </React.Fragment>
    );
  }
}

export default ApplicationRightContentCalculator;
