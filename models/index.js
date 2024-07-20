const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const News = require('./news')(sequelize, Sequelize);
const Story = require('./story')(sequelize, Sequelize);

module.exports = {
  sequelize,
  News,
  Story
};
