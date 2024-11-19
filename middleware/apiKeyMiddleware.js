
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['api-key'];  
    if (apiKey !== process.env.API_KEY) {   
      return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
    next();  
  };
  
  module.exports = apiKeyMiddleware;
  