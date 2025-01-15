const {} = require('../service/social.service')
exports.googleController = async (req, res) => {
    const response = await registerService();
  return res.status(response.status).json(response);
  };

  exports.facebookAuth = async (req, res) => {
    const response = await registerService();
  return res.status(response.status).json(response);
  };