const express = require('express')
const sequelize = require('./models')
const User = require('./models/users')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoute')
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware'); 
const formatPhoneNumberMiddleware = require('./middleware/phoneNumberMiddleware');

const app = express()


// Load environment variables from.env file
dotenv.config()



// MIDDLEWARE
// Middleware Config
app.use(express.json())

// // Middleware to validate API key
// app.use(apiKeyMiddleware)

// // Middleware to format mobile numbers
// app.use(formatPhoneNumberMiddleware)


// Routes
app.use('/users', userRoutes)




// Sync DB
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// server test
app.get('/', (req, res) => {
  res.send('Hello World!')
})


// Listening  for requests
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})