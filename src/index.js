import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./scss/styles.scss";
import "./js/contentTemplate.js";
import * as serviceWorker from "./serviceWorker";
import ApplicationStarter from "./components/applicationStarter";

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <ApplicationStarter />
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

console.log("rest", process.env.REACT_APP_REST_API);
console.log("push", process.env.REACT_APP_PUSH_NOTIFICATION_SERVICE);
