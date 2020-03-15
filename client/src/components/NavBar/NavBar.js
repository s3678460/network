import React, { Component } from "react";
import logo from './rmit-university-logo.png'
import "./NavBar.css"
import {Link} from 'react-router-dom';
export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/">
          <a className="navbar-brand">
            <img
              src={logo}
              width={100}
              height={70}
              className="d-inline-block align-top"
              alt=""
            />
          </a>{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/">
                <a className="nav-link" id="dl">
                  Port Selections
                </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/getports">
                <a className="nav-link" id="dl">
                  Selected Ports
                </a>
                </Link>
              </li>


              
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
