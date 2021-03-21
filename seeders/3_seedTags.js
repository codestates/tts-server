'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tags', [
      {
        tagName: '비기너',
        time: 0
      },
      {
        tagName: '아이언',
        time: 5
      },
      {
        tagName: '브론즈',
        time: 10
      },
      {
        tagName: '실버',
        time: 25
      },
      {
        tagName: '골드',
        time: 50
      },
      {
        tagName: '플레티넘',
        time: 100
      },
      {
        tagName: '다이아',
        time: 150
      },
      {
        tagName: '마스터',
        time: 200
      },
      {
        tagName: '그랜드마스터',
        time: 300
      },
      {
        tagName: '첼린저',
        time: 500
      }
    ], null, ['tagName', 'time']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tags', null, {});
  }
};

