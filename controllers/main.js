const { user, users_tag } = require("../models");

module.exports = {
  // 회원가입 요청
  signUp: async (req, res) => {
    const { email, password, userName } = req.body;
    if (email && password && userName) {
      const validCheck = await user.findOne({ where: { email } });
      if (!validCheck) {
        const newUser = await user.create({ email, password, userName });
        // 가장 기본적인 태그(티어로 치면 '언랭', 칭호로 치면 '초심자' 같은 것을 부여);
        await users_tag.create({ userId: newUser.dataValues.id, tagId: 1 });
        res.status(200).json({ message: "signup successfully" });
      } else {
        // 해당 이메일로 가입한 유저가 이미 존재할 때
        res.status(400).json({ message: "email alreay exists" });
      }
    } else {
      // 필수 작성 요소 중 하나라도 없을 때
      res.status(400).json({ message: "need full information" });
    }
  },
  // 로그인 요청
  logIn: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      // 필수 요소 중 하나라도 없을 때
      res.status(400).json({ message: "need full information" });
    } else {
      const userInfo = await user.findOne({ where: { email, password } });
      if (!userInfo) {
        // 이메일, 비밀번호 중 적어도 하나 이상 맞지 않을 때
        res.status(404).json({ message: "not exist, check your email or password" });
      } else {
        // 존재 할 시 세션을 부여
        req.session.userId = userInfo.id;
        res.status(200).json({ message: "login successfully" });
      }
    }
  },
};
