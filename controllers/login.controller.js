const { loginService } = require("../service/login.sevice");

exports.login = async (req, res) => {
 console.log("========== THE EXPRESS REQUEST OBJECT ===========");
 console.log(req);
 console.log("====================")
 const response = await loginService(req.body);
 return res.status(response.status).json(response);
};