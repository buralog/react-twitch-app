import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import "./Navbar.scss";

class MyNavbar extends React.Component {
  render() {
    return (
      <Navbar className="background-color">
        <Nav pullLeft>
          <NavItem>
            <Link className="nav-links" to="/">
              ReacTwitch
            </Link>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem>
            <Link className="nav-links" to="/featured-streams">
              Featured
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-links" to="/top-streams">
              Top Streams
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-links" to="/categories">
              Categories
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default MyNavbar;
