exports.socialGoogleService = async () => {
    const { token } = req.body;

    if (!token) {
      return {status: 404, message: 'Token is required' };
    }

    try {
      const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
      const { email, sub: googleId } = response.data;

      // Use SocialUser model for social authentication
      let user = await SocialUser.findOne({ email });
      if (!user) {
        user = new SocialUser({ email, googleId });
        await user.save();
      }

      const jwtToken = generateToken(user);
      return { status: 200, message: 'Login successful', token: jwtToken, user };
    } catch (error) {
      return {status: 400,  message: 'Invalid Google token', error: error.message };
    }
}
    exports.socialFacebookService = async () => {
    const  { token } = req.body;

    if (!token) {
      return { status: 400, message: 'Token is required' };
    }

    try {
      const response = await axios.get(`https://graph.facebook.com/me?fields=id,email&access_token=${token}`);
      const { email, id: facebookId } = response.data;

      // Use SocialUser model for social authentication
      let user = await SocialUser.findOne({ email });
      if (!user) {
        user = new SocialUser({ email, facebookId });
        await user.save();
      }
  
      const jwtToken = generateToken(user);
      return {status: 200,  message: 'Login successful', token: jwtToken, user };
    } catch (error) {
      return {status: 400,  message: 'Invalid Facebook token', error: error.message };
    }}