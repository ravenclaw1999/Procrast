import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  NavLink
} from 'react-router-dom'
import axios from 'axios'
import './App.css';
import firebase, { db, auth} from './services/firebase'
import {
  Navbar,
  Nav,
} from 'react-bootstrap'

export default class App extends React.Component {
  state = {
    user: null,
    myProjects: null
  }
  
  .mapStateKeys = () => {
    Object.keys(this.state).map( key => this.state[key])
  }
  
  signInUser = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then((result) => {
    const user = result.user;
    console.log(user.uid)
    db.collection('users')
      .doc(user.uid)
      .set({
        loggedIn: true,
        name: user.displayName
      })
    }).catch(function(error) {
        console.log(error)
    })
  }
  
  componentDidMount() {
    console.log("This works")
    this.getLoggedUsers()
    const getUserData = (id) => this.getProjectsFromFirebase(id)
    auth.onAuthStateChanged((user) => {
      if (user) {
            console.log(user.uid)
            this.setState ({
              user: {
                photoURL: user.photoURL,
                email: user.email,
                displayName: user.displayName,
                uid: user.uid,
               }
            })
            getUserData(user.uid)
      } else {
        this.setState({user: null})
      }
    })
  }
  
  getLoggedUsers = () => {
    db.collection('users')
      .where('loggedIn', '==', true)
      .get()
      .then ( snapshot => {
        const loggedInUsers = []
        snapshot.forEach( doc => {
          const data = doc.data()
          loggedInUsers.push(data)
        })
        this.setState ({loggedInUsers: loggedInUsers})
      })
      .catch (err => console.log(err))
  }
  
  signOutUser = () => {
    auth.signOut()
  }
  
  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    // const time = event.target.time
    // const date = event.target.date
    // const deadline = event.target.deadline
    // const description = event.target.description
    this.setState({[name] : value})
  }
  
  getProjectsFromFirebase = (uid) => {
    console.log('uid')
    console.log(uid)
    db.collection('projects')
      .where('id', '==', uid)
      .get()
      .then( snapshot => {
        console.log(snapshot)
        const myProjects = []
        snapshot.forEach (project => {
          const data = project.data()
          myProjects.push(data)
          
        })
          this.setState({myProjects:myProjects}, console.log(myProjects))
      })
      .catch( error => console.log(error))
  }  
  
  render() {
    return (
      <div className="App">
        <Router>
        <main>
          <FullNavbar signout={this.signOutUser} user={this.state.user} signin={this.signInUser}/>
          <Route exact path="/" component={ () => <Home user={this.state.user} />} />
         {/* <Route path="/login" component={() => <Login user={this.state.user} signin={this.signInUser}  />} /> */}
          <Route path="/welcome" component={() => <WelcomePage user={this.state.user} projects={this.state.myProjects} getProjects={this.getProjectsFromFirebase} />} />
        </main>
        </Router>
      </div>
    )
  }
}

class WelcomePage extends React.Component {
  state = {
    myProjects: null
  }
  
  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    // const time = event.target.time
    // const date = event.target.date
    // const deadline = event.target.deadline
    // const description = event.target.description
    this.setState({[name] : value})
  }  
  
  saveProjectInFirebase = () => {
    db.collection('projects')
      .add({
        name: this.state.name,
        time: this.state.time,
        date: new Date(this.state.date),
        deadline: new Date(this.state.deadline),
        description: this.state.description,
        id: this.props.user.uid
      })
      .then( res => {
        this.setState({})
        this.props.getProjects(this.props.user.uid)
        axios.post('https://us-central1-upperline-app.cloudfunctions.net/sendProcrast', {
          email: this.props.user.email,
          displayName: this.props.user.displayName,
          message: 
          `
          Hello!
          `
        })
      })
      .catch( err => console.log(err))
  }
  
  
  // getProjectsFromFirebase = (uid) => {
  //   db.collection('projects')
  //     .where('id', '==', uid)
  //     .get()
  //     .then( snapshot => {
  //       const myProjects = []
  //       snapshot.forEach (project => {
  //         const data = project.data
  //         myProjects.push(data)
          
  //       })
  //         this.setState({myProjects:myProjects})
  //     })
  //     .catch( error => console.log(error))
  // }
  
  // static getDerivedStateFromProps(props, state)  {
  //   if (props.user && props.user.uid) {
  //     this.getProjectsFromFirebase(props.user.uid)
  //   }
  // }


  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.user && this.props.user.uid) {
  //     this.getProjectsFromFirebase(this.props.user.uid)
  //   }
  // }
  
  render(){
    const { props } = this
    if (!props.user) return <Redirect to="/" />

    return (
        <div className="welcomePage">
            <h1 className="welcomePageTitle"><br />Welcome, {props.user && props.user.displayName}!</h1><br />
            <strong><h2> Are you ready to conquer your procrastination monster?</h2><br />
            <h3>If you are, scroll down to add a new project or goal. You got this!</h3><br />
            <h3>If you are not, watch the following video to get some inspiration.</h3><br />
            <iframe width="560" height="315" src="https://www.youtube.com/embed/arj7oStGLkU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <br /><br /><br />
            <h3 className="myProjects myProjectsTitle">My Projects</h3>
            {
              this.props.projects && this.props.projects.map( project => {
                return (
                  <div>
                    <h2>Project Name: {project.name}</h2><br />
                    <p>Time for Project: {project.time} days</p><br />
                    <p>Date: {true && project.date.toDate().toString()}</p><br />
                    <p>Deadline: {true && project.deadline.toDate().toString()}</p><br />
                    <p>Description of Project: {project.description}</p>
                  </div>
                )
              })
            }
            <p className="descriptionTwo"><br /> <br /> <br />
              Insert in info about a new project or goal, and we will notify you the maximum procrastination
              time you have on your hand through email. So check your emails for alerts! Even though we would all like to be conquerors of our procrastination monster all the time,
              we are human at the end of the day, and we will need help along the way to defeat our own internal monsters.
            </p>
            <p className="input"><br />Name: <input name="name" onChange={this.handleChange} value={this.state.name} type="text"/></p>
            <p className="input"><br />Time (Days): <input name="time" onChange={this.handleChange} value={this.state.time} type="number"/></p>
            <p className="input"><br />Date: <input name="date" onChange={this.handleChange} value={this.state.date} type="date"/></p>
            <p className="input"><br />Deadline: <input name="deadline" onChange={this.handleChange} value={this.state.deadline} type="date"/></p>
            <p className="input"><br />Description: <input name="description" onChange={this.handleChange} value={this.state.description} type="text"/></p>
            <button onClick={this.saveProjectInFirebase} className="addButton">Add Project</button><br /><br />
            </strong>
        </div>      
    )
  }
}

function FullNavbar(props) {
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

function Home(props) {
  if (props.user) return <Redirect to="/welcome" />
  
  return (
      <div className="homePage">
        <br /><br />
        <h1 className="homePageTitle">Procrast</h1>
        <h2 className="slogan">Meh. I will finish it later.</h2><br />
        <p className="description">Although we don't want to admit it, we all procrastinate. Procrastination is something that hunts us all. But 
        life's too short to procrastinate. 
        Are you afraid that your procrastination monster is dominating your life? Well, don't worry. This is the app for you.</p>
      </div>
    )
}
