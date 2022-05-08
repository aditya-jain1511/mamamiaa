import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import {Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink,} from "reactstrap";

function Logo() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
  };

  return (
    <div className='col-12'>
      <Navbar expand="md" light className="nav-bar">
        <div className="logoNav">
          <GiKnifeFork />
          <Link to={"/home"} className="logo">
            MaMaMia
          </Link>
        </div>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isNavOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <Link className='nav-link' to="/contact">Contact</Link>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/aditya-jain1511" target="_blank" rel="noopener noreferrer">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Logo;
