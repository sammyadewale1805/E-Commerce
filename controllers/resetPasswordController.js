const ResetPasswordService = require('../service/resetPasswordService');

class ResetPasswordController {
  static async requestReset(req, res) {
    try {
      const { email, phoneNumber } = req.body;
      const response = await ResetPasswordService.requestReset({ email, phoneNumber });
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      const response = await ResetPasswordService.resetPassword({ token, newPassword });
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = ResetPasswordController;
