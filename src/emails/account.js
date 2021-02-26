
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
      to: email,
      from:'Richardflores009@gmail.com',
      subject: 'Welcome to the app!',
      text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
       to: email,
       from: 'richardflores009@gmail.com',
       subject: 'Cancellation >:(',
       text: `Come on man why..... whyyy ... whyyyyyyyyyyyyyy, you are a son of a bitch ${name}, you know that???`
    })
}



  module.exports = {
      sendWelcomeEmail,
      sendGoodbyeEmail
  }