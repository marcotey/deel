const Sequelize = require('sequelize');
const {Op} = require('sequelize');
const {Transaction} = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

module.exports = {
  sequelize,
  Op,
  Transaction
};
