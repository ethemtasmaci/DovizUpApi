const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('DeviceToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
};
