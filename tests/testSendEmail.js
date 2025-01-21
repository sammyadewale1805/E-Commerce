require('dotenv').config(); // Load environment variables
const { sendEmail } = require('../utils/email'); // Adjust path if your sendEmail.js is in another location

(async () => {
  try {
    // Replace with a valid recipient email
    await sendEmail('recipient@example.com', 'Test Email', 'This is a test email.');
    console.log('Test email sent successfully.');
  } catch (error) {
    console.error('Failed to send test email:', error.message);
  }
})();

