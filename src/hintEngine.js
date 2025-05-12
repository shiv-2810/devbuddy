/**
 * Hint Engine for DevBuddy
 * Maps known error patterns to helpful suggestions
 */

const fs = require('fs');
const path = require('path');

// Registry of hint providers by error type
const hintProviders = {};

// Registry of error code to handler mappings
const errorCodeMappings = {
  // File system error codes
  'ENOENT': 'FileSystemError',
  'EACCES': 'FileSystemError',
  'EEXIST': 'FileSystemError',
  'EISDIR': 'FileSystemError',
  'ENOTDIR': 'FileSystemError',
  'EBUSY': 'FileSystemError',
  'EMFILE': 'FileSystemError',
  'ENFILE': 'FileSystemError',
  
  // Network error codes
  'ECONNREFUSED': 'NodeNetworkingError',
  'EADDRINUSE': 'NodeNetworkingError',
  'ENOTFOUND': 'NodeNetworkingError',
  'ETIMEDOUT': 'NodeNetworkingError',
  'ECONNRESET': 'NodeNetworkingError',
  'EPROTO': 'NodeNetworkingError'
};

// Dynamically load all hint providers from the hints directory
function loadHintProviders() {
  const hintsDir = path.join(__dirname, 'hints');
  
  try {
    // Read all files in the hints directory
    const files = fs.readdirSync(hintsDir);
    
    // Filter for JS files and load each provider
    files.filter(file => file.endsWith('.js')).forEach(file => {
      const errorType = path.basename(file, '.js');
      try {
        const provider = require(path.join(hintsDir, file));
        hintProviders[errorType] = provider;
        
        // Also map common variants of error names (like Error vs. error)
        if (errorType.endsWith('Error')) {
          const lowerCaseType = errorType.charAt(0).toLowerCase() + errorType.slice(1);
          hintProviders[lowerCaseType] = provider;
        }
      } catch (err) {
        console.error(`Failed to load hint provider for ${errorType}:`, err.message);
      }
    });
  } catch (err) {
    console.error('Failed to load hint providers:', err.message);
  }
}

// Load all hint providers at startup
loadHintProviders();

/**
 * Checks if an error message matches a specific pattern
 * @param {string} message - The error message to check
 * @param {string|RegExp} pattern - Pattern to match against
 * @returns {boolean} Whether the message matches the pattern
 */
function messageMatches(message, pattern) {
  if (pattern instanceof RegExp) {
    return pattern.test(message);
  }
  
  return message.includes(pattern);
}

/**
 * Gets a hint for the given error
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
function getHint(parsedError) {
  const { type, message, code } = parsedError;
  
  // Check for system errors by error code first
  if (code && errorCodeMappings[code]) {
    const errorType = errorCodeMappings[code];
    if (hintProviders[errorType]) {
      return hintProviders[errorType](parsedError);
    }
  }
  
  // Check for special case: UnhandledPromiseRejection
  if (message.includes('UnhandledPromiseRejection')) {
    return hintProviders['UnhandledPromiseRejectionWarning']?.(parsedError) || null;
  }
  
  // Check for special case: Module not found
  if (message.includes('Cannot find module') || message.includes('Module not found')) {
    return hintProviders['ModuleNotFoundError']?.(parsedError) || null;
  }
  
  // Check if we have a provider for this error type
  const provider = hintProviders[type];
  if (provider) {
    return provider(parsedError);
  }
  
  // Try to find a fallback provider based on message patterns
  for (const [errorType, provider] of Object.entries(hintProviders)) {
    // Skip if we've already checked this type
    if (errorType === type) {
      continue;
    }
    
    // Check if this error type typically appears in the message
    if (messageMatches(message, new RegExp(`\\b${errorType}\\b`, 'i'))) {
      return provider(parsedError);
    }
  }
  
  return null;
}

module.exports = { getHint }; 