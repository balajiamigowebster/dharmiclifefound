const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TestimonialVideo = sequelize.define('TestimonialVideo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Category slug: 'udaliyal-dharmam-classes' or 'manoviyal-dharmam-classes'
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Display name: 'Udaliyal Dharmam Classes' or 'Manoviyal Dharmam Classes'
  categoryName: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Udaliyal Dharmam Classes'
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Student / Speaker Name
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  speakerName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Location / City (e.g. Puducherry, Chennai)
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Relative or absolute URL: e.g. /uploads/videos/filename.mp4
  videoUrl: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Optional thumbnail image: e.g. /uploads/images/poster.jpg
  thumbnailUrl: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'testimonial_videos',
  timestamps: true
});

module.exports = TestimonialVideo;

