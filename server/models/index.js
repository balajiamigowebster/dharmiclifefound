const sequelize = require('../config/db');
const Media = require('./Media');
const ActivityItem = require('./ActivityItem');
const AdminUser = require('./AdminUser');
const AwardItem = require('./AwardItem');

const db = {
  sequelize,
  Media,
  ActivityItem,
  AdminUser,
  AwardItem
};

module.exports = db;

