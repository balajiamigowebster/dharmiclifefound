const sequelize = require('../config/db');
const Media = require('./Media');
const ActivityItem = require('./ActivityItem');
const AdminUser = require('./AdminUser');
const AwardItem = require('./AwardItem');
const ContactMessage = require('./ContactMessage');

const db = {
  sequelize,
  Media,
  ActivityItem,
  AdminUser,
  AwardItem,
  ContactMessage
};

module.exports = db;

