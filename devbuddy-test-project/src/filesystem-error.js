/**
 * DevBuddy Test Project - File System Error Example
 * 
 * This file demonstrates how DevBuddy intercepts and explains file system errors.
 */

// Initialize DevBuddy at the top of the file
require('devbuddy').init();

console.log('🧪 Testing FileSystemError...');
console.log('This error occurs when there\'s an issue with a file system operation.\n');

// Import the file system module
const fs = require('fs');

// Deliberate ENOENT Error: File not found
// DevBuddy will intercept this error and provide a helpful explanation
console.log('Trying to read a file that doesn\'t exist:');
fs.readFileSync('/path/to/nonexistent/file.txt'); 