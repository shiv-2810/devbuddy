/**
 * Error Parser for DevBuddy
 * Extracts relevant information from error objects
 */

/**
 * Parses an Error object to extract relevant information
 * @param {Error} error - The error object to parse
 * @returns {Object} Parsed error with type, message, and stack
 */
function parseError(error) {
  // Handle non-Error objects gracefully
  if (!(error instanceof Error)) {
    return {
      type: 'Unknown',
      message: String(error),
      stack: '',
      originalError: error
    };
  }

  return {
    type: error.name || 'Error',
    message: error.message || '',
    stack: error.stack || '',
    code: error.code, // For system errors like ENOENT
    originalError: error
  };
}

module.exports = { parseError }; 