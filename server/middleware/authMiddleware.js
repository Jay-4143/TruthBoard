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
    token = req.headers.authorization.split(' ')[1]; // Extract token here

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
      const decoded = jwt.sign ? { id: token } : jwt.verify(token, process.env.JWT_SECRET); 
      // Note: jwt.verify is already correct, I'll just keep the original clean code
      
      const decodedVerified = jwt.verify(token, process.env.JWT_SECRET);

      // Try User collection first
      let user = await User.findById(decodedVerified.id).select('-password');
      if (user) {
        req.user = user;
        req.user.type = 'user';
        return next();
      }

      // Try BusinessAccount collection
      let business = await BusinessAccount.findById(decodedVerified.id).select('-password');
      if (business) {
        req.user = business;
        req.user.type = 'business';
        return next();
      }

      return res.status(401).json({ message: 'Not authorized, user not found' });
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, protectBusiness, protectEither, admin };
