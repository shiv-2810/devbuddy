/**
 * DevBuddy Error Testing Script
 * 
 * This script allows you to test all the different error types
 * that DevBuddy can handle and see the friendly explanations.
 * 
 * Usage:
 *   node testing-all-errors.js <error-type>
 * 
 * Example:
 *   node testing-all-errors.js reference
 */

// Initialize DevBuddy
require('../src').init();

console.log('🤖 DevBuddy Error Testing Tool');
console.log('----------------------------\n');

// Get the error type from command line arguments
const errorType = process.argv[2] || 'help';

/**
 * Display available error types and usage instructions
 */
function showHelp() {
  console.log('Test DevBuddy by triggering different types of errors:');
  console.log('\nUsage: node testing-all-errors.js <error-type>\n');
  console.log('Available error types:');
  console.log('  reference    - ReferenceError (undefined variable)');
  console.log('  type         - TypeError (null property access)');
  console.log('  range        - RangeError (infinite recursion)');
  console.log('  uri          - URIError (malformed URI)');
  console.log('  eval         - EvalError (custom example)');
  console.log('  aggregate    - AggregateError (from Promise.any)');
  console.log('  promise      - UnhandledPromiseRejection');
  console.log('  assert       - AssertionError (from Node.js assert)');
  console.log('  module       - ModuleNotFoundError (missing module)');
  console.log('  fs           - FileSystemError (ENOENT, file not found)');
  console.log('  network      - NetworkingError (ECONNREFUSED)');
  console.log('\nSyntaxError must be tested separately using:');
  console.log('  node -e "const x = {a: 1,};" # Invalid trailing comma in older JS');
}

/**
 * Error trigger functions for each error type
 */
const errorTriggers = {
  reference: () => {
    console.log('📌 Triggering ReferenceError...');
    // This variable is not defined and will cause a ReferenceError
    nonExistentVariable;
  },
  
  type: () => {
    console.log('📌 Triggering TypeError...');
    const user = null;
    user.name; // Cannot read property of null
  },
  
  range: () => {
    console.log('📌 Triggering RangeError...');
    function recursiveFunction() {
      recursiveFunction(); // Infinite recursion
    }
    recursiveFunction();
  },
  
  uri: () => {
    console.log('📌 Triggering URIError...');
    decodeURIComponent('%'); // Malformed URI
  },
  
  eval: () => {
    console.log('📌 Triggering EvalError...');
    throw new EvalError('Eval usage is discouraged');
  },
  
  aggregate: () => {
    console.log('📌 Triggering AggregateError...');
    // Using Promise.any with all rejecting promises
    // This needs to be executed in top-level await or a separate function
    Promise.any([
      Promise.reject(new Error('First promise failed')),
      Promise.reject(new Error('Second promise failed'))
    ]);
    // Keep the process alive for the error to be caught
    setTimeout(() => {}, 1000);
  },
  
  promise: () => {
    console.log('📌 Triggering UnhandledPromiseRejection...');
    Promise.reject(new Error('This promise rejection is not handled'));
    // Keep process alive
    setTimeout(() => {}, 1000);
  },
  
  assert: () => {
    console.log('📌 Triggering AssertionError...');
    const assert = require('assert');
    assert.strictEqual(1, 2, 'Numbers are not equal');
  },
  
  module: () => {
    console.log('📌 Triggering ModuleNotFoundError...');
    require('a-module-that-does-not-exist');
  },
  
  fs: () => {
    console.log('📌 Triggering FileSystemError...');
    const fs = require('fs');
    fs.readFileSync('/path/to/nonexistent/file.txt');
  },
  
  network: () => {
    console.log('📌 Triggering NetworkingError...');
    const http = require('http');
    const req = http.get('http://localhost:12345', () => {});
    req.on('error', (err) => { throw err; });
  }
};

// Handle the requested error type
if (errorType === 'help') {
  showHelp();
} else if (errorTriggers[errorType]) {
  // Execute the error trigger function directly without try/catch
  // so DevBuddy can intercept the error
  const trigger = errorTriggers[errorType];
  trigger();
} else {
  console.log(`❌ Unknown error type: "${errorType}"`);
  showHelp();
} 