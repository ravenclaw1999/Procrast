import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import firebase, { db, auth } from "./services/firebase";
import FullNavbar from "./FullNavbar";
import Home from "./Home";
import WelcomePage from "./WelcomePage";

export default class App extends React.Component {
  state = ({
    user: null,
    myProjects: null
  }.mapStateKeys = () => {
    Object.keys(this.state).map(key => this.state[key]);
  });

  signInUser = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        console.log(user.uid);
        db.collection("users")
          .doc(user.uid)
          .set({
            loggedIn: true,
            name: user.displayName
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    console.log("This works");
    this.getLoggedUsers();
    const getUserData = id => this.getProjectsFromFirebase(id);
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        this.setState({
          user: {
            photoURL: user.photoURL,
            email: user.email,
            displayName: user.displayName,
            uid: user.uid
          }
        });
        getUserData(user.uid);
      } else {
        this.setState({ user: null });
      }
    });
  }

  getLoggedUsers = () => {
    db.collection("users")
      .where("loggedIn", "==", true)
      .get()
      .then(snapshot => {
        const loggedInUsers = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          loggedInUsers.push(data);
        });
        this.setState({ loggedInUsers: loggedInUsers });
      })
      .catch(err => console.log(err));
  };

  signOutUser = () => {
    auth.signOut();
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    // const time = event.target.time
    // const date = event.target.date
    // const deadline = event.target.deadline
    // const description = event.target.description
    this.setState({ [name]: value });
  };

  getProjectsFromFirebase = uid => {
    console.log("uid");
    console.log(uid);
    db.collection("projects")
      .where("id", "==", uid)
      .get()
      .then(snapshot => {
        console.log(snapshot);
        const myProjects = [];
        snapshot.forEach(project => {
          const data = project.data();
          myProjects.push(data);
        });
        this.setState({ myProjects: myProjects }, console.log(myProjects));
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="App">
        <Router>
          <main>
            <FullNavbar
              signout={this.signOutUser}
              user={this.state.user}
              signin={this.signInUser}
            />
            <Route exact path="/" render={props => <Home {...props} />} />
            {/* <Route path="/login" component={() => <Login user={this.state.user} signin={this.signInUser}  />} /> */}
            <Route
              path="/welcome"
              component={() => (
                <WelcomePage
                  user={this.state.user}
                  projects={this.state.myProjects}
                  getProjects={this.getProjectsFromFirebase}
                />
              )}
            />
          </main>
        </Router>
      </div>
    );
  }
}
