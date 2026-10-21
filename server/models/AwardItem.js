const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AwardItem = sequelize.define('AwardItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Award category slug: 'srowtha-rathana-award' or 'dharma-shri-award'
  awardType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.STRING,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  awardName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Srowtha Ratnam Award'
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recipient: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cashPrize: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recognition: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tributeText: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // JSON array of image URLs
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
  tableName: 'award_items',
  timestamps: true
});

module.exports = AwardItem;
