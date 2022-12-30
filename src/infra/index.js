'use strict'
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});


const {Contract} = require('../domain/entities/Contract');
const { Job } = require('../domain/entities/Job');
const {Profile} = require('../domain/entities/Profile')

Contract.init(sequelize);
Profile.init(sequelize);
Job.init(sequelize);


Contract.associate(sequelize.models)
Profile.associate(sequelize.models)
Job.associate(sequelize.models)



module.exports = sequelize;