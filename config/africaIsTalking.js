// src/config/africastalking.js
const africastalking = require('africastalking')({
    apiKey: process.env.AT_API_KEY,  // Ensure you set these in your environment variables
    username: process.env.AT_USERNAME,
  });
  
  module.exports = africastalking;
  