const { user, users_tag } = require("../models");
const dotenv = require("dotenv");
const axios = require('axios');
dotenv.config();

module.exports = {
  signUp: async (req, res) => {
    const { email, password, userName } = req.body;
    if (email && password && userName) {
      const validCheck = await user.findOne({ where: { email } });
      if (!validCheck) {
        const newUser = await user.create({ email, password, userName });
        await users_tag.create({ userId: newUser.dataValues.id, tagId: 1 });
        res.status(200).json({ message: "signup successfully" });
      } else {
        res.status(400).json({ message: "email alreay exists" });
      }
    } else {
      res.status(400).json({ message: "need full information" });
    }
  },

  logIn: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "need full information" });
    } else {
      const userInfo = await user.findOne({ where: { email, password } });
      if (!userInfo) {
<<<<<<< HEAD
        // 이메일, 비밀번호 중 적어도 하나 이상 맞지 않을 때
        res.status(404).json({ message: "not exist, check your email or password" });
=======
        res
          .status(404)
          .json({ message: "not exist, check your email or password" });
>>>>>>> 24b73bfc81a0e485dfd403888ca98d9c2fd9deb5
      } else {
        req.session.userId = userInfo.id;
        res.status(200).json({ message: "login successfully" });
      }
    }
  },

  oAuth: {
    accessToken: async (req, res) => {
      if (!req.body.authorizationCode) {
        res.status(401).json({messgae: "check authorization code again"})
      } else {
        const params = {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: req.body.authorizationCode
        }
        await axios.post('https://github.com/login/oauth/access_token',
          params,
          {headers: {accept: 'application/json'}})
          .then(result=>{ 
          res.json(
            { 
              data: {accessToken: result.data.access_token}, 
              message: "issued access_token successfully"
            })})
          .catch(e=> e)
      }
    }
  }
};
