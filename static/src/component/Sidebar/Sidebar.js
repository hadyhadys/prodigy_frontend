/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
// javascript plugin used to create scrollbars on windows

import logo from "../Sidebar/logo-white.svg";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a
            href="https://www.creative-tim.com?ref=nudr-sidebar"
            className="simple-text logo-normal"
            target="_blank"
            style={{fontSize:"20px", fontWeight:"bold"}}
          >
            Detik Apps Taging
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <ul className="nav">
            <li>
              <a className="nav-link" href=""><i className="now-ui-icons business_bulb-63"></i><p style={{fontSize:"15px", fontWeight:"bold"}}>Progress</p></a>
            </li>
            <li>
              <a className="nav-link" href=""><i className="now-ui-icons"></i><p style={{fontSize:"15px", color:"#9A9A9A", fontWeight:"bold"}}>This Session</p></a>
            </li>
            <li>
              <a className="nav-link" href=""><i className="now-ui-icons"></i><p style={{fontSize:"15px", color:"#9A9A9A", fontWeight:"bold"}}>Accept</p></a>
            </li>
            <li>
              <a className="nav-link" href=""><i className="now-ui-icons"></i><p style={{fontSize:"15px", color:"#9A9A9A", fontWeight:"bold"}}>Reject</p></a>
            </li>
            <li>
              <a className="nav-link" href=""><i className="now-ui-icons"></i><p style={{fontSize:"15px", color:"#9A9A9A", fontWeight:"bold"}}>Ignore</p></a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
