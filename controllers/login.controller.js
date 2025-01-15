const { loginService } = require("../service/login.sevice");

exports.login = async (req, res) => {
 const response = await loginService(req.body);
 return res.status(response.status).json(response);
};