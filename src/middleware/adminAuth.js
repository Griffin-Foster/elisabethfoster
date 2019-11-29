const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;

    // throw an error if the user is not an admin (!isAdmin)
    const { isAdmin } = req.user
    if (!isAdmin) throw 'Error/Invalid: You are not an authorized admin!'
    next()
  } catch (err) {
    res.status(401).json({ msg: err })
  }
}
