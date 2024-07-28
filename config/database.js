const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  port: process.env.DB_PORT,
  dialectOptions: {
    options: {
      encrypt: false, // Eğer SSL kullanıyorsanız true yapabilirsiniz
      enableArithAbort: true
    }
  }
});

module.exports = sequelize;
