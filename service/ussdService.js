
/**
 * Processes the USSD request and returns the response string.
 *
 * @param {string} sessionId - The unique session ID.
 * @param {string} serviceCode - The service code (USSD code).
 * @param {string} phoneNumber - The phone number of the user.
 * @param {string} text - The user input string.
 * @returns {string} - The response to send back.
 */
exports.processUSSD = (sessionId, serviceCode, phoneNumber, text) => {
    let response = '';

    // Initial menu when text is empty
    if (text === '') {
      response = `CON Welcome to QashMe Fund
  1. recharge to phone
  2. Send Quick Money`;
    } else if (text === '1') {
      // User selected Option 1; ask for further details
      response = `CON recharge to phone 1. Please enter additional details:`;
    } else if (text.startsWith('1*')) {
      // Process additional details after Option 1 (e.g., "1*Your input")
      const parts = text.split('*');
      // Remove the option indicator and join the rest as input
      const userInput = parts.slice(1).join(' ');
      response = `END Thank You for Banking With Us: ${userInput}`;
    } else if (text === '2') {
      // User selected Option 2; end the session
      response = `END thanks for banking with us 2. Goodbye!`;
    } else {
      // Handle any invalid input
      response = `END Invalid option. Please try again.`;
    }

    return response;
  };
