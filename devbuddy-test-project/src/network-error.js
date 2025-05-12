/**
 * DevBuddy Test Project - Network Error Example
 * 
 * This file demonstrates how DevBuddy intercepts and explains network errors.
 */

// Initialize DevBuddy at the top of the file
require('devbuddy').init();

console.log('🧪 Testing NetworkingError...');
console.log('This error occurs when there\'s an issue with a network operation.\n');

// Import the http module
const http = require('http');

// Deliberate ECONNREFUSED Error: Connection refused
// DevBuddy will intercept this error and provide a helpful explanation
console.log('Trying to connect to a server that doesn\'t exist:');

// Try to connect to a server on a port that's likely not running anything
const req = http.get('http://localhost:54321', () => {
  console.log('This callback will never be called');
});

// Re-throw the error from the error event to be caught by DevBuddy
req.on('error', (err) => {
  throw err;
});

// Keep the process alive long enough for the error to occur
setTimeout(() => {
  console.log('This should not be displayed');
}, 5000); 