/**
 * DevBuddy Test Project - Range Error Example
 * 
 * This file demonstrates how DevBuddy intercepts and explains RangeErrors.
 */

// Initialize DevBuddy at the top of the file
require('devbuddy').init();

console.log('🧪 Testing RangeError...');
console.log('This error occurs when a value is outside the allowed range.\n');

// Deliberate RangeError: Maximum call stack size exceeded
// DevBuddy will intercept this error and provide a helpful explanation
console.log('Triggering an infinite recursion:');

function recursiveFunction() {
  // This function calls itself without a base case, causing a stack overflow
  recursiveFunction();
}

// Call the recursive function to trigger the error
recursiveFunction(); 