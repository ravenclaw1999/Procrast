import React from 'react';
import {
    Navbar,
    Nav,
} from 'react-bootstrap';

export default function FullNavbar(props) {
    return (
      <Navbar bg="light" expand="lg">
       <img className="img" src="https://thumbs.dreamstime.com/b/productivity-increase-black-icon-vector-sign-isolated-background-productivity-increase-concept-symbol-illustration-productivity-133183535.jpg" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
        </Navbar.Collapse>
          <div>
            {
              props.user &&
              <button onClick={props.signout} className="loginButton">
                SignOut
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
