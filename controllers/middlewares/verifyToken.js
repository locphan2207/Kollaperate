const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// We’re going to use this function as a custom middleware to check if
// a token exists and whether it is valid:
function verifyToken(req, res, next) {
  // Try to get token in request header:
  const token = req.headers['x-access-token'];
  // If no token:
  if (!token) return res.status(403).send({auth: false, message: 'No token'});

  // If token is found, verify with key:
  jwt.verify(token, keys.secretKey, (err, decoded) => {
    // In case of error:
    if (err) return res.status(500).send({auth: false, message: 'Failed to verify'});

    // Put the id after decoding into request object
    req.userId = decoded.id;

    // Go to the next middleware function
    next();
  });
}

module.exports = verifyToken;
