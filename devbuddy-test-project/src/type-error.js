/**
 * DevBuddy Test Project - Type Error Example
 * 
 * This file demonstrates how DevBuddy intercepts and explains TypeErrors.
 */

// Initialize DevBuddy at the top of the file
require('devbuddy').init();

console.log('🧪 Testing TypeError...');
console.log('This error occurs when an operation is performed on an incompatible type.\n');

// Deliberate TypeError: Cannot read properties of null (reading 'name')
// DevBuddy will intercept this error and provide a helpful explanation
console.log('Trying to access a property of null:');
const user = null;
user.name; // This will cause a TypeError 