import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Login from "./components/bundles/Login";

ReactDOM.render(<Login />, document.getElementById("root"));
serviceWorker.unregister();
