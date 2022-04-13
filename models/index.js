const path = require('path');
const Sequelize = require('sequelize');
const Message = require('./message')


const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config)



db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Message = Message(sequelize, Sequelize)

module.exports = db;