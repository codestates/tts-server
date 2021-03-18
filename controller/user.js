const { where } = require("sequelize");
const { user, tag, user_tag, record } = require("../models");

module.exports = {
  // 유저 정보 조회
  userInfo: async (req, res) => {
    if (!req.session.userId) {
      res.status(401).json({ message: "unathorized" });
    } else {
      const userInfo = await user.findOne({
        where: { id: req.session.userId },
      });
      // 태그 전달 테스트 필요
      const tags = await tag.findAll({
        include: [
          {
            model: user_tag,
          },
        ],
      });
      const { email, userName } = userInfo.dataValues;
      res.status(200).json({ data: { email, userName, tags }, message: "ok" });
    }
  },
  // 레코드
  record: {
    // 기록하기
    post: async (req, res) => {
      if (!req.session.userId) {
        res.status(401).json({ message: "unauthorized" });
      } else {
        const { week, day, recordName, time } = req.body;
        const data = await record.findOne({ where: { week, day, recordName } });
        // 해당 날짜에 존재하는 데이터가 없을 땐 새로운 데이터 생성 아니면 시간 업데이트
        if (!data) {
          await record.create({ week, day, recordName, time });
        } else {
          await record.update(
            { time: data.dataValues.time + time },
            { where: { week, day, recordName } }
          );
        }
        res.status(201).json({ message: "updated" });
      }
    },
    // 레코드 조회
    get: async (req, res) => {
      if (!req.session.userId) {
        res.status(401).json({ message: "unauthorized" });
      } else {
        const userInfo = await user.findOne({
          where: { id: req.session.userId },
        });
        const data = await record.findAll({
          where: { userId: req.session.userId },
        });
        res.status(200).json({
          data: data.dataValues,
          message: userInfo.dataValues.userName + "`s records",
        });
      }
    },
  },
  // 로그아웃
  logOut: async (req, res) => {
    if (!req.session.userId) {
      res.status(401).json({ message: "unauthorized" });
    } else {
      req.session.destroy((err) => {
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "logout successfully" });
      });
    }
  },
};
