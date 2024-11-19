
const formatPhoneNumberMiddleware = (req, res, next) => {
    const { mobile } = req.body;
    if (mobile && mobile.startsWith('0')) {
      req.body.mobile = '233' + mobile.slice(1);  // Reformat the mobile number to start with '233'
    }
    next();  // Proceed to the next middleware/route handler
  };
  
  module.exports = formatPhoneNumberMiddleware;
  