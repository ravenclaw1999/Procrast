import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { db } from "./services/firebase";

class WelcomePage extends Component {
  state = {
    myProjects: null
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

  saveProjectInFirebase = () => {
    db.collection("projects")
      .add({
        name: this.state.name,
        time: this.state.time,
        date: new Date(this.state.date),
        deadline: new Date(this.state.deadline),
        description: this.state.description,
        id: this.props.user.uid
      })
      .then(res => {
        this.setState({});
        this.props.getProjects(this.props.user.uid);
        axios.post(
          "https://us-central1-upperline-app.cloudfunctions.net/sendProcrast",
          {
            email: this.props.user.email,
            displayName: this.props.user.displayName,
            message: `
            Hello!
            `
          }
        );
      })
      .catch(err => console.log(err));
  };

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

  render() {
    const { props } = this;
    if (!props.user) return <Redirect to="/" />;

    return (
      <div className="welcomePage">
        <h1 className="welcomePageTitle">
          <br />
          Welcome, {props.user && props.user.displayName}!
        </h1>
        <br />
        <strong>
          <h2> Are you ready to conquer your procrastination monster?</h2>
          <br />
          <h3>
            If you are, scroll down to add a new project or goal. You got this!
          </h3>
          <br />
          <h3>
            If you are not, watch the following video to get some inspiration.
          </h3>
          <br />
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/arj7oStGLkU"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <br />
          <br />
          <br />
          <h3 className="myProjects myProjectsTitle">My Projects</h3>
          {this.props.projects &&
            this.props.projects.map(project => {
              return (
                <div>
                  <h2>Project Name: {project.name}</h2>
                  <br />
                  <p>Time for Project: {project.time} days</p>
                  <br />
                  <p>Date: {true && project.date.toDate().toString()}</p>
                  <br />
                  <p>
                    Deadline: {true && project.deadline.toDate().toString()}
                  </p>
                  <br />
                  <p>Description of Project: {project.description}</p>
                </div>
              );
            })}
          <p className="descriptionTwo">
            <br /> <br /> <br />
            Insert in info about a new project or goal, and we will notify you
            the maximum procrastination time you have on your hand through
            email. So check your emails for alerts! Even though we would all
            like to be conquerors of our procrastination monster all the time,
            we are human at the end of the day, and we will need help along the
            way to defeat our own internal monsters.
          </p>
          <p className="input">
            <br />
            Name:{" "}
            <input
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
            />
          </p>
          <p className="input">
            <br />
            Time (Days):{" "}
            <input
              name="time"
              onChange={this.handleChange}
              value={this.state.time}
              type="number"
            />
          </p>
          <p className="input">
            <br />
            Date:{" "}
            <input
              name="date"
              onChange={this.handleChange}
              value={this.state.date}
              type="date"
            />
          </p>
          <p className="input">
            <br />
            Deadline:{" "}
            <input
              name="deadline"
              onChange={this.handleChange}
              value={this.state.deadline}
              type="date"
            />
          </p>
          <p className="input">
            <br />
            Description:{" "}
            <input
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
              type="text"
            />
          </p>
          <button onClick={this.saveProjectInFirebase} className="addButton">
            Add Project
          </button>
          <br />
          <br />
        </strong>
      </div>
    );
  }
}

export default WelcomePage;
