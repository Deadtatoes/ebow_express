const {DataTypes} =require('sequelize')
const sequelize = require('../models/index')

// Define User model
const User = sequelize.define('users',{

    // First Name Column
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // Last Name Column
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // Mobile Number Column
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // Email Column
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = User