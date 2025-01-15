const mongoose = require('mongoose');

const SocialUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  facebookId: { type: String },
});

const SocialUser = mongoose.model('SocialUser', SocialUserSchema);

module.exports = SocialUser;
