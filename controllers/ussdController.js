// controllers/ussdController.js
const ussdService = require('../service/ussdService');

exports.handleUSSD = (req, res) => {
  // Destructure request body and default text to an empty string if undefined
  const { sessionId, serviceCode, phoneNumber, text = '' } = req.body;
  
  // Process the USSD logic using the service layer
  const responseMessage = ussdService.processUSSD(sessionId, serviceCode, phoneNumber, text);
  
  // Set Content-Type header to text/plain as required by Africa's Talking
  res.set('Content-Type', 'text/plain');
  res.send(responseMessage);
};
