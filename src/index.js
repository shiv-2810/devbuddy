/**
 * DevBuddy - Developer-friendly runtime toolkit for Node.js
 * Main entrypoint file
 */

const { registerGlobalErrorHandlers } = require('./core');
const hintEngine = require('./hintEngine');
const logger = require('./logger');

/**
 * Initializes DevBuddy and registers global error handlers
 * @returns {void}
 */
function init() {
  // Only enable in development mode
  if (process.env.NODE_ENV === 'production') {
    console.warn('DevBuddy is disabled in production mode');
    return;
  }
  
  registerGlobalErrorHandlers(hintEngine, logger);
  console.log('\x1b[36m%s\x1b[0m', '🤖 DevBuddy initialized - I\'ll help with error messages!');
}

module.exports = { init }; 