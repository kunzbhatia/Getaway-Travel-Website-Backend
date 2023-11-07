const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const accessTokenHeader = req.header('Authorization');

  if (!accessTokenHeader || !accessTokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const accessToken = accessTokenHeader.replace('Bearer ', '');

  try {
    // Verify the access token using your JWT secret key
    const decoded = jwt.verify(accessToken,process.env.JWT_SECRET_KEY);

    // Attach user data to the request object for further processing
    req.user = decoded.user;
    next(); // Call the next middleware or route handler
  } catch (error) {
    // Handle invalid or expired access tokens
    console.error('Invalid access token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
