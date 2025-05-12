/**
 * DevBuddy Test Project - Promise Rejection Error Example
 * 
 * This file demonstrates how DevBuddy intercepts and explains unhandled promise rejections.
 */

// Initialize DevBuddy at the top of the file
require('devbuddy').init();

console.log('🧪 Testing UnhandledPromiseRejection...');
console.log('This error occurs when a Promise is rejected but the rejection is not handled.\n');

// Deliberate UnhandledPromiseRejection: This promise rejection is not handled
// DevBuddy will intercept this error and provide a helpful explanation
console.log('Creating a Promise that will be rejected without a .catch() handler:');

// Create a promise that immediately rejects
Promise.reject(new Error('This promise rejection is not handled'));

// Keep the process alive long enough for the error to be caught
setTimeout(() => {
  console.log('This should not be displayed');
}, 1000); 