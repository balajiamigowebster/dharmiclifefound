require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'dharmic-db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: false
  }
);

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('[Sequelize] Connection to database "dharmic-db" established successfully.');
  } catch (error) {
    console.error('[Sequelize] Unable to connect to the database:', error.message);
  }
}

testConnection();

module.exports = sequelize;
