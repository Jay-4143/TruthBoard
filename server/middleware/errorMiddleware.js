const errorHandler = (err, req, res, next) => {
  const fs = require('fs');
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} - ERROR: ${err.message}\n${err.stack}\n\n`;
  console.error(`ERROR: ${err.message}`);
  if (err.stack) console.error(err.stack);
  
  try {
    fs.appendFileSync('error.log', logMessage);
  } catch (logErr) {
    console.error('Failed to write to error.log:', logErr);
  }
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
