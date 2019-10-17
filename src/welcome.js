// import React from 'react'
// import {
//   BrowserRouter as Router,
//   Route,
//   Redirect,
//   NavLink
// } from 'react-router-dom'
// import firebase, { db, auth} from './services/firebase'
// import {
//   Navbar,
//   Nav,
// } from 'react-bootstrap'
// import App from './App'

// export default class Welcome extends React.Component {
//     state = {
//         user: null
//     }
    
//     signOutUser = () => {
//         auth.signOut()
//     }

//     render () {
//         const { props } = this
//         return (
//             <div>
//                 <Router>
//                     <main>
//                         <FullNavbar signout={this.signOutUser}  />
//                         <Route exact path="/" component={welcomePage}/>
//                         <Route path="/Home" component={props.Home}/>
//                     </main>
//                 </Router>
//             </div>
//         )
//     }
//   }
  
//  function FullNavbar(props) {
//   return (
//     <Navbar bg="light" expand="lg">
//      <img className="img" src="https://thumbs.dreamstime.com/b/productivity-increase-black-icon-vector-sign-isolated-background-productivity-increase-concept-symbol-illustration-productivity-133183535.jpg" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//         </Nav>
//       </Navbar.Collapse>
//         <div>
//           {
//             props.user &&
//             <button>
//               Home
//             </button>
//           }
//           {
//             <div>
//             <button onClick={props.signout}>
//               Projects
//             </button>
//             <button onClick={props.signout}>
//               Sign Out
//             </button>
//             </div>
//           }
//       </div>
//     </Navbar>
//   )  
// }

// function welcomePage(props) {
//     return (
//         <div>
//             <h1>Welcome {this.state.user}!</h1>
//         </div>
//     )
// }

