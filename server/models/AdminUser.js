const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AdminUser = sequelize.define('AdminUser', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING, // stores bcrypt hashed password
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin'
  }
}, {
  tableName: 'admin_users',
  timestamps: true
});

module.exports = AdminUser;
