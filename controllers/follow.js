const { Sequelize } = require('sequelize');
const { user, user_tag, tag, follow } = require('../models');
const Op = Sequelize.Op

module.exports = {
  // 유저 검색
  search: async (req, res) => {
    const { email, userName } = req.body;
    const standard = email || userName;
    const userInfo = await user.findAll({where: {[Op.or]: [{email: standard}, {userName:standard}]}});
    if (!userInfo) {
      res.status(404).json({message: 'not found'});
    } else {
      res.status(200).json({data: {users: userInfo.dataValues}, message: 'ok'});
    }
  },
  // 친구 추가
  add: async (req, res) => {
    if (!req.session.userId) {
      res.status(401).json({message: 'unauthorized'})
    }
    const { email } = req.body;
    const userInfo = await user.findOne({where: {email}});
    const validCheck = await follow.findOne({where: {userId: req.session.userId, followingId: userInfo.id}});
    if (validCheck) {
      res.status(400).json({message: 'already following'});
    } else {
      await follow.create({userId: req.session.userId, followingId: userInfo.id});
      res.status(201).json({
        data: {
          followingInfo: {userName: userInfo.dataValues.userName, email: userInfo.dataValues.email}
        }, 
        message: 'ok'
      })
    }
  },
  // 친구 조회
  get: async (req, res) => {
    if (!req.session.userId) {
      res.status(401).json({message: 'unauthorized'});
    } else {
      const userInfos = await user.findAll({})
    }
  }
}