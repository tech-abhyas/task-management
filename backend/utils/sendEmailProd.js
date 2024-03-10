const nodemailer = require('nodemailer');


const sendEmailProd = async (email, subject, data) => {

  // mail tempate
  let mailTemplate = `<div> 
  <p>Hello User</p>
  <br>
  <br>
  <p>Please verify you email. click on the <a href="${data.redirectUrl}">Email Confirmation Link</a> </p>
  <br>
  <p>Team Demo App</p>`



  var transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD
    }
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Demo App" <noreply@gmail.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      // text: "Hello world?", // plain text body
      html: mailTemplate, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
}


module.exports = sendEmailProd;