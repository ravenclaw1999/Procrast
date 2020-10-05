import React from "react";
import { Redirect } from "react-router-dom";

export default function Home(props) {
  console.log("I am in the home function");
  if (props.user) return <Redirect to="/welcome" />;

  console.log("Guess there is no user prop here. Let's render!");

  return (
    <div>
      <div className="bgimg-1">
        <div className="caption">
          <span className="border header">Procrast</span>
        </div>
      </div>

      <div className="home-text container">
        <h3>About</h3>
        <div className="row">
          <p className="col">Although we don't want to admit it, we all procrastinate.
          Procrastination is something that hunts us all. But life's too short to
          procrastinate. Are you afraid that your procrastination monster is
          dominating your life? Well, don't worry. This is the app for you.</p>
          <img className="col img" src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />

        </div>

      </div>

      <div className="bgimg-2">
        <div className="caption second-caption">
          <span className="border smaller-img">Nah, I will finish it later.</span>
        </div>
      </div>


    </div>

  );
}
