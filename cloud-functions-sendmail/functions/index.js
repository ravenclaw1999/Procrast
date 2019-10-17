const functions = require('firebase-functions');
// const rp = require('request-promise');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

'use strict';

// const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Procrast';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
// [END onCreateTrigger]
  // [START eventAttributes]
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  // [END eventAttributes]

  return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]

// [START sendByeEmail]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
// [END onDeleteTrigger]
  const email = user.email;
  const displayName = user.displayName;

  return sendGoodbyeEmail(email, displayName);
});
// [END sendByeEmail]

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@procrast.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
  await mailTransport.sendMail(mailOptions);
  console.log('New welcome email sent to:', email);
  return null;
}

exports.sendProcrast = functions.https.onRequest( async (req, res) => {
  await sendProcrastEmail(req.body.email, req.body.displayName, req.body.message)
  return null
  //recaptcha validation
  // rp({
  //       uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
  //       method: 'POST',
  //       formData: {
  //           secret: 'your_secret_key',
  //           response: req.body['g-recaptcha-response']
  //       },
  //       json: true
  //   }).then(result => {
  //       if (result.success) {
  //           sendEmail('recipient@gmail.com', req.body).then(()=> { 
  //             res.status(200).send(true);
  //           });
  //       }
  //       else {
  //           res.status(500).send("Recaptcha failed.")
  //       }
  //   }).catch(reason => {
  //       res.status(500).send("Recaptcha req failed.")
  //   })

});

async function sendProcrastEmail(email, displayName, message){
   const mailOptions = {
    from: `${APP_NAME} <noreply@procrast.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Message from ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}! ${message}`;
  await mailTransport.sendMail(mailOptions);
  console.log('New welcome email sent to:', email);
  return null;   
}

// Sends a goodbye email to the given user.
async function sendGoodbyeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
  };

  // The user unsubscribed to the newsletter.
  mailOptions.subject = `Bye!`;
  mailOptions.text = `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`;
  await mailTransport.sendMail(mailOptions);
  console.log('Account deletion confirmation email sent to:', email);
  return null;
}