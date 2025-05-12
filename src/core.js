/**
 * Core functionality for DevBuddy
 * Registers global error handlers for uncaught exceptions and unhandled rejections
 */

const { parseError } = require('./errorParser');

/**
 * Registers global error handlers
 * @param {Object} hintEngine - The hint engine instance
 * @param {Object} logger - The logger instance
 */
function registerGlobalErrorHandlers(hintEngine, logger) {
  // Only run in development environment
  if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== undefined) {
    return;
  }

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    const parsedError = parseError(err);
    const hint = hintEngine.getHint(parsedError);
    logger.printFriendlyError(parsedError, hint);
    
    // Exit process with error code
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason) => {
    // Convert to proper Error if not already
    const err = reason instanceof Error ? reason : new Error(String(reason));
    const parsedError = parseError(err);
    const hint = hintEngine.getHint(parsedError);
    logger.printFriendlyError(parsedError, hint);
    
    // Exit process with error code
    process.exit(1);
  });
}

module.exports = { registerGlobalErrorHandlers }; 