const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: 'User no longer exists' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const protectBusiness = async (req, res, next) => {
  let token;
  const BusinessAccount = require('../models/BusinessAccount');

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await BusinessAccount.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Business account no longer exists' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, business token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no business token' });
  }
};

const protectEither = async (req, res, next) => {
  let token;
  const BusinessAccount = require('../models/BusinessAccount');

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Try User collection first
      let user = await User.findById(decoded.id).select('-password');
      if (user) {
        user.type = 'user';
        req.user = user;
        return next();
      }

      // Try BusinessAccount collection
      let business = await BusinessAccount.findById(decoded.id).select('-password');
      if (business) {
        business.type = 'business';
        req.user = business;
        return next();
      }

      return res.status(401).json({ message: 'User not found' });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect, protectBusiness, protectEither };
