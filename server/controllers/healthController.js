/**
 * Health Check Controller
 */

const { sendSuccess } = require('../utils/response');

exports.getHealth = (req, res) => {
  sendSuccess(res, {
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  }, 'Server is healthy', 200);
};

module.exports = exports;
