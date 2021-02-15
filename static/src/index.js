import React from "react";
import ReactDOM from "react-dom";
import Widget from "./component/widget";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/now-ui-dashboard.scss?v1.4.0";
import "./assets/scss/radio_button.scss";
import "./assets/css/demo.css";

let Index = () => {
    return <Widget/>;
}

ReactDOM.render(
    <Index />,
    document.getElementById("root")
);

