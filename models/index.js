const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const News = require('./news')(sequelize, Sequelize);
const Story = require('./story')(sequelize, Sequelize);
const Issue = require('./issue')(sequelize, Sequelize);
const DeviceToken = require('./deviceToken')(sequelize, Sequelize);

module.exports = {
  sequelize,
  News,
  Story,
  Issue,
  DeviceToken
};
