import React from 'react';
import {
    Navbar,
    Nav,
} from 'react-bootstrap';

export default function FullNavbar(props) {
    return (
      <Navbar bg="light" expand="lg">
       <img className="img" src="public/site_logo.png" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
        </Navbar.Collapse>
          <div>
            {
              props.user &&
              <button onClick={props.signout} className="loginButton">
                Logout
              </button>
            }
            {
            !props.user &&
            <button onClick={props.signin} className="loginButton">
               Login
            </button>
            }
        </div>
      </Navbar>
    )  
  }
