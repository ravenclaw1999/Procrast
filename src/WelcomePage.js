import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { db } from "./services/firebase";
import ProjectForm from "./components/ProjectForm";

class WelcomePage extends Component {
  state = {
    myProjects: null,
  };

  saveProjectInFirebase = (project) => {
    db.collection("projects")
      .add({
        name: project.name,
        time: project.time,
        date: new Date(project.date),
        deadline: new Date(project.deadline),
        description: project.description,
        id: this.props.user.uid,
      })
      .then((res) => {
        this.setState({});
        this.props.getProjects(this.props.user.uid);
        axios.post(
          "https://us-central1-upperline-app.cloudfunctions.net/sendProcrast",
          {
            email: this.props.user.email,
            displayName: this.props.user.displayName,
            message: `
            Hello!
            `,
          }
        );
      })
      .catch((err) => console.log(err));
  };

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
            this.props.projects.map((project) => {
              return (
                <div className="welcomePage">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <div className="card" style={{ width: "18rem" }}>
                          <div className="card-body">
                            <h5 className="card-title">
                              Project Name: {project.name}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                              Time for Project: {project.time}
                            </h6>
                            <p className="card-text">
                              Date: {true && project.date.toDate().toString()}
                            </p>
                            <p className="card-text">
                              Deadline:{" "}
                              {true && project.deadline.toDate().toString()}
                            </p>
                            <p className="card-text">
                              Deadline: Description of Project:{" "}
                              {project.description}
                            </p>
                            <a href="#" className="card-link">
                              Edit
                            </a>
                            <a href="#" className="card-link">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <p className="descriptionTwo container">
            <br /> <br /> <br />
            Insert in info about a new project or goal, and we will notify you
            the maximum procrastination time you have on your hand through
            email. So check your emails for alerts! Even though we would all
            like to be conquerors of our procrastination monster all the time,
            we are human at the end of the day, and we will need help along the
            way to defeat our own internal monsters.
          </p>
          <ProjectForm onSave={this.saveProjectInFirebase} />
          <br />
          <br />
        </strong>
      </div>
    );
  }
}

export default WelcomePage;
