
// Importing from configuration
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/config'); //

// Initialize Sequelize with development credentials
const sequelize = new Sequelize(
  dbConfig.database, 
  dbConfig.username, 
  dbConfig.password, 
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

// Database Test Configuration
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
