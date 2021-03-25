const { user, tag, users_tag, record, sequelize } = require("../models");

module.exports = {
  userInfo: {
    get: async (req, res) => {
      if (!req.session.userId) {
        res.status(401).json({ message: "unathorized" });
      } else {
        const userInfo = await user.findOne({
          where: { id: req.session.userId },
        });
        const tagsInfo = await tag.findAll({
          include: [
            {
              model: users_tag,
              where: { userId: req.session.userId },
            },
          ],
        });
        const tags = [];
        for (let i = 0; i < tagsInfo.length; i += 1) {
          tags.push(tagsInfo[i].dataValues.tagName);
        }

        const { email, userName } = userInfo.dataValues;
        res.status(200).json({ data: { email, userName, tags }, message: "ok" });
      }
    },

    post: async (req, res) => {
      if (!req.session.userId || req.body.newPassword === undefined) {
        res.status(404).json({
          message: "Your session had expired, please log in again or send New Password",
        });
      } else {
        const userInfo = await user.findOne({
          where: { id: req.session.userId },
        });

        const { password } = userInfo.dataValues;

        if (password === req.body.newPassword) {
          res.status(403).json({ message: "Same password as before" });
        } else {
          await user.update({ password: req.body.newPassword }, { where: { id: req.session.userId } });

          res.status(200).json({ message: "Your password has been changed successfully" });
        }
      }
    },
  },

  record: {
    post: async (req, res) => {
      if (!req.session.userId) {
        res.status(401).json({ message: "unauthorized" });
      } else {
        const { week, day, recordName, time } = req.body;
        const data = await record.findOne({
          where: { week, day, recordName, userId: req.session.userId },
        });
        if (!data) {
          await record.create({
            week,
            day,
            recordName,
            time,
            userId: req.session.userId,
          });
        } else {
          const sumTime = data.dataValues.time + time;
          await record.update({ time: sumTime }, { where: { week, day, recordName, userId: req.session.userId } });
        }
        const total = await record
          .findAll({
            where: { userId: req.session.userId },
            attributes: ["time"],
          })
          .then((data) => {
            let temp = 0;
            for (let i = 0; i < data.length; i += 1) {
              const { time } = data[i].dataValues;
              temp += time;
            }
            return temp;
          });

        await users_tag
          .findAll({
            where: { userId: req.session.userId },
            attributes: [sequelize.fn("max", sequelize.col("tagId"))],
            raw: true,
          })
          .then((data) => {
            const curTagId = data[0]["max(`tagId`)"];
            const giveTag = async (tagId) => {
              const isOver = await tag
                .findOne({ where: { id: tagId }, attributes: ["time"] })
                .then((data) => {
                  const nextAimTime = data.dataValues.time * 3600;
                  return total >= nextAimTime;
                })
                .catch((err) => false);

              if (isOver) {
                await users_tag.create({ userId: req.session.userId, tagId });
                giveTag(tagId + 1);
              } else {
                return;
              }
            };
            giveTag(curTagId + 1);
          });

        res.status(201).json({ message: "updated" });
      }
    },
    get: async (req, res) => {
      console.log(req.session);
      if (!req.session.userId) {
        res.status(401).json({ message: "unauthorized" });
      } else {
        const userInfo = await user.findOne({
          where: { id: req.session.userId },
        });
        const data = await record.findAll({
          where: { userId: req.session.userId },
        });
        let sumData = {};
        for (let i = 0; i < data.length; i += 1) {
          const { recordName, day, week, time } = data[i].dataValues;
          if (!sumData[recordName]) {
            sumData[recordName] = {};
          }

          if (!sumData[recordName][week]) {
            const newArr = Array(7).fill(null);
            newArr[day - 1] = time;
            sumData[recordName][week] = newArr;
          } else {
            sumData[recordName][week][day - 1] = time;
          }
        }

        res.status(200).json({
          data: sumData,
          message: userInfo.dataValues.userName + "`s records",
        });
      }
    },
  },
  
  logOut: async (req, res) => {
    if (!req.session.userId) {
      res.status(401).json({ message: "unauthorized" });
    } else {
      req.session.destroy((err) => {
        res.clearCookie("connect.sid").status(200).json({ message: "logout successfully" });
      });
    }
  },
};
