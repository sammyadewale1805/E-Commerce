const {registerService} = require('../service/service.register')
exports.register = async (req, res) => {
  const response = await registerService(req.body);
  return res.status(response.status).json(response);

}