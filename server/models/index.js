const sequelize = require('../config/db');
const Media = require('./Media');
const ActivityItem = require('./ActivityItem');
const AdminUser = require('./AdminUser');

const db = {
  sequelize,
  Media,
  ActivityItem,
  AdminUser
};

module.exports = db;

