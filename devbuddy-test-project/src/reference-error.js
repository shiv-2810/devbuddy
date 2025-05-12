/**
 * DevBuddy Test Project - Reference Error Example
 * 
 * This file demonstrates how DevBuddy intercepts and explains ReferenceErrors.
 */

// Initialize DevBuddy at the top of the file
require('devbuddy').init();

console.log('🧪 Testing ReferenceError...');
console.log('This error occurs when trying to use a variable that doesn\'t exist.\n');

// Deliberate ReferenceError: undefinedVariable is not defined
// DevBuddy will intercept this error and provide a helpful explanation
console.log('Trying to use undefined variable: undefinedVariable');
undefinedVariable; // This will cause a ReferenceError 