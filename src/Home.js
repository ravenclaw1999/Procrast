import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Home(props) {
    console.log("I am in the home function");
    if (props.user) return <Redirect to="/welcome" />;

    console.log("Guess there is no user prop here. Let's render!");
    
    return (
        <div className="homePage">
          <br /><br />
          <h1 className="homePageTitle">Procrast</h1>
          <h2 className="slogan">Meh. I will finish it later.</h2>
          <br />
          <p className="description">Although we don't want to admit it, we all procrastinate. Procrastination is something that hunts us all. But 
          life's too short to procrastinate. 
          Are you afraid that your procrastination monster is dominating your life? Well, don't worry. This is the app for you.</p>
        </div>
      )
  }
