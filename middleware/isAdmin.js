const isAdmin = (req, res, next) => {
    // Check if the user is an admin
    if (req.user && req.user.role === 'admin') {
      // User is an admin, allow access to the route
      return next();
    } else {
      // User is not an admin, deny access
      return res.status(403).json({ message: 'Access forbidden. Admin authorization required.' });
    }
  };
  
  module.exports = isAdmin;
  