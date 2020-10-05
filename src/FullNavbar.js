import React from 'react';
import {
    Navbar,
    Nav,
} from 'react-bootstrap';

export default function FullNavbar(props) {
    return (
      <Navbar bg="light" expand="lg">
       <img className="img" src="https://www.freelogodesign.org/file/app/client/thumb/4848dab3-769b-487d-82ab-38c922ce78c4_200x200.png?1601861043792" />
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
