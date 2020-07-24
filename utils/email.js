const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const sendEmail = async (options) => {
  // 1) Create a transporter

  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.SEND_GRID_API_KEY,
      },
    })
  );
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  //   // Activate in gmail "less secure app" option
  // });

  // 2) Define the email options
  const mailOptions = {
    fromname: "Firs-Hilal",
    from: "joshmatparrot@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
