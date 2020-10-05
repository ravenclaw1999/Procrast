import React from 'react';
import {
    Navbar,
    Nav,
} from 'react-bootstrap';

export default function FullNavbar(props) {
    return (
      <Navbar bg="light" expand="lg">
       <img className="img" src="https://www.freelogodesign.org/file/app/client/thumb/69b4dfc3-aae5-4ae9-add2-ae9eb07640a4_200x200.png?1601872696321" />
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
