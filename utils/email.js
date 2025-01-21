const nodemailer = require('nodemailer');

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Using Gmail as the email service
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
      },
    });
     console.log('EMAIL_USER:', process.env.EMAIL_USER);
     console.log('EMAIL_PASS:', process.env.EMAIL_PASS);


    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to, // Recipient's email address
      subject, // Subject of the email
      text, // Body of the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error; // Rethrow the error for further handling
  }
};

module.exports = { sendEmail };
