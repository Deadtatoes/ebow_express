const express = require('express');
const Joi = require('joi');
const User = require('../models/users')
const router = express.Router();

// Middleware For API Validation
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden, invalid API key' });
  }
  next();
};

// Validation With Joi
const validateUser = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).pattern(/^[a-zA-Z]+$/).required(),
    lastName: Joi.string().min(2).max(30).pattern(/^[a-zA-Z]+$/).required(),
    mobile: Joi.string().min(9).max(15).required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(data);
};

// Creating User
router.post('/create', apiKeyMiddleware, async (req, res) => {
  // Validate request body with Joi
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Phone Number ReEdit
  const { mobile, firstName, lastName, email } = req.body;
  let formattedMobile = mobile;
  if (mobile.startsWith('0')) {
    formattedMobile = '233' + mobile.slice(1); 
  }

  try {

    console.log(formattedMobile);
    console.log(typeof(User))
    if(!User){
      return res.status(400).json({ message: 'User model not found' });  // Check if User model exists in the database  // TODO: Add error handling for model not found scenario.  // TODO: Add error handling for database connection issues.  // TODO: Add error handling for database query errors.  // TODO: Add error handling for database validation errors.  // TODO: Add error handling for database transaction errors.  // TODO: Add error handling for database connection errors.  // TODO: Add error handling for database query errors.  // TODO: Add error handling for database validation errors.  // TODO: Add error handling for database transaction errors.  // TODO: Add error handling for database connection errors.  // TODO: Add error handling for database query errors.  // TODO: Add error handling for database validation errors.  // TODO: Add error handling for database transaction errors.  // TODO: Add error handling for database connection errors
    }

    const user = await User.create({ 
      firstName, 
      lastName, 
      mobile: formattedMobile, 
      email 
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

//Fetching all users
router.get('/', apiKeyMiddleware, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

module.exports = router;
