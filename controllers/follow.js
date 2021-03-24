const { Sequelize } = require("sequelize");
const { user, users_tag, tag, follow } = require("../models");
const Op = Sequelize.Op;

module.exports = {
  search: async (req, res) => {
    const { keyword } = req.body;
    const standard = keyword
    const userInfo = await user.findAll({
      include: [
        {
          model: users_tag,
          attributes: ["id"],
          include: [
            {
              model: tag,
              attributes: ["tagName", "time"],
            },
          ],
        },
      ],
      where: { [Op.or]: [{ email:{ [Op.like]: '%' + standard + '%'} }, { userName: {[Op.like]: '%' + standard + '%'} }] },
      attributes: ["email", "userName", "id"],
      order: [[{ model: users_tag }, "tagId", "DESC"]],
    });
    const followingList = await follow.findAll({where: {userId: req.session.userId}, attributes: ['followingId']})
      .then(data => {
        return data.map(user => user.dataValues.followingId);  
      })
    let users = [];
    for (let i = 0; i < userInfo.length; i += 1) {
      const { email, userName, users_tags, id } = userInfo[i].dataValues;
      if (id === req.session.userId || followingList.includes(id)) {
        continue;
      }
      const tag = users_tags[0].tag.tagName;
      const sumData = { email, userName, tag };
      users.push(sumData);
    }
    res.status(200).json({ data: { users }, message: "ok" });
  },

  add: async (req, res) => {
    if (!req.session.userId) {
      res.status(401).json({ message: "unauthorized" });
    } else {
      const { email } = req.body;
      const userInfo = await user.findOne({ where: { email } });
      const validCheck = await follow.findOne({
        where: { userId: req.session.userId, followingId: userInfo.id },
      });
      if (validCheck) {
        res.status(400).json({ message: "already following" });
      } else {
        await follow.create({
          userId: req.session.userId,
          followingId: userInfo.id,
        });
        res.status(201).json({
          data: {
            followingInfo: {
              userName: userInfo.dataValues.userName,
              email: userInfo.dataValues.email,
            },
          },
          message: "ok",
        });
      }
    }
  },

  remove: async (req, res) => {
    if (!req.session.userId) {
      res.status(401).json({ message: "unauthorized" });
    } else {
      const { email } = req.body
      const { id } = await user.findOne({where: { email }})
      await follow.destroy({where: {followingId: id, userId: req.session.userId}})
      res.status(200).json({message: 'remove successfully'});
    }
  },
  
  get: async (req, res) => {
    if (!req.session.userId) {
      res.status(401).json({ message: "unauthorized" });
    } else {
      const userInfos = await follow.findAll({
        where: { userId: req.session.userId },
        attributes: ["followingId"],
      });
      const following = [];
      for (let i = 0; i < userInfos.length; i += 1) {
        const id = userInfos[i].dataValues.followingId;
        const data = await user.findOne({
          include: [
            {
              model: users_tag,
              attributes: ["id"],
              where: { userId: id },
              include: [
                {
                  model: tag,
                  attributes: ["tagName"],
                },
              ],
            },
          ],
          order: [[{ model: users_tag }, "tagId", "DESC"]],
          attributes: ["email", "userName"],
        });
        const { email, userName } = data.dataValues;
        const userTag = data.dataValues.users_tags[0].tag.tagName;
        following.push({ email, userName, tag: userTag });
      }
      res.status(200).json({ data: following });
    }
  },
};
