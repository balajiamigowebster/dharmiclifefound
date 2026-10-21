const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ActivityItem = sequelize.define('ActivityItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Sub-category slug, e.g.:
  // 'annadhanam', 'unclaimed-souls', 'spreading-the-dharmic-way-of-life',
  // 'education-support', 'women-empowerment', 'caring-for-homeless-people', 'other-additional-activities'
  categorySlug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // JSON array of image URLs (can be local uploads or existing external URLs)
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  // JSON array of video URLs
  videos: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'activity_items',
  timestamps: true
});

module.exports = ActivityItem;
