/**
 * DevBuddy Error Test Script
 * 
 * Usage: node test-errors.js <error-type>
 * 
 * Available error types:
 * - reference: ReferenceError examples
 * - type: TypeError examples
 * - syntax: SyntaxError examples
 * - range: RangeError examples
 * - uri: URIError examples
 * - eval: EvalError examples
 * - aggregate: AggregateError examples
 * - promise: UnhandledPromiseRejection examples
 * - assert: AssertionError examples
 * - module: ModuleNotFoundError examples
 * - fs: FileSystem error examples
 * - network: Networking error examples
 * - all: Run a test for each error type (will stop at first error)
 */

// Initialize DevBuddy
require('./src').init();

console.log('🤖 DevBuddy Error Test Started');

// Get the error type from command line arguments
const errorType = process.argv[2] || 'help';

// Display help if no valid error type is provided
if (errorType === 'help') {
  console.log(`
Usage: node test-errors.js <error-type>

Available error types:
- reference: ReferenceError examples
- type: TypeError examples
- syntax: SyntaxError examples (Note: Will be caught at parse time)
- range: RangeError examples
- uri: URIError examples
- eval: EvalError examples
- aggregate: AggregateError examples
- promise: UnhandledPromiseRejection examples
- assert: AssertionError examples
- module: ModuleNotFoundError examples
- fs: FileSystem error examples
- network: Networking error examples
- all: Run a test for each error type (will stop at first error)
  `);
  process.exit(0);
}

// Function with individual tests
function triggerReferenceError() {
  console.log('\n🧪 Testing ReferenceError...');
  // Variable is not defined
  undefinedVariable;
}

function triggerTypeError() {
  console.log('\n🧪 Testing TypeError...');
  // Accessing property of null
  const user = null;
  user.name;
}

function triggerRangeError() {
  console.log('\n🧪 Testing RangeError...');
  // Maximum call stack size exceeded
  function recursiveFunction() {
    recursiveFunction();
  }
  recursiveFunction();
}

function triggerURIError() {
  console.log('\n🧪 Testing URIError...');
  // URI malformed
  decodeURIComponent('%');
}

function triggerEvalError() {
  console.log('\n🧪 Testing EvalError...');
  // Throw custom EvalError
  throw new EvalError('Eval usage not recommended');
}

async function triggerAggregateError() {
  console.log('\n🧪 Testing AggregateError...');
  // AggregateError from Promise.any
  await Promise.any([
    Promise.reject(new Error('Failed 1')),
    Promise.reject(new Error('Failed 2'))
  ]);
}

function triggerPromiseRejection() {
  console.log('\n🧪 Testing UnhandledPromiseRejection...');
  // Basic unhandled promise rejection
  Promise.reject(new Error('Unhandled rejection!'));
  // Keep process alive
  setTimeout(() => {
    console.log('Promise rejection should have been caught by now');
  }, 1000);
}

function triggerAssertionError() {
  console.log('\n🧪 Testing AssertionError...');
  // Built-in assert module error
  const assert = require('assert');
  assert.strictEqual(1, 2, 'Numbers are not equal');
}

function triggerModuleNotFoundError() {
  console.log('\n🧪 Testing ModuleNotFoundError...');
  // Cannot find module
  require('some-module-that-doesnt-exist');
}

function triggerFileSystemError() {
  console.log('\n🧪 Testing FileSystemError...');
  // ENOENT: File not found
  const fs = require('fs');
  fs.readFileSync('/path/to/nonexistent/file.txt');
}

function triggerNetworkError() {
  console.log('\n🧪 Testing NodeNetworkingError...');
  // ECONNREFUSED: Connection refused
  const http = require('http');
  const req = http.get('http://localhost:12345', () => {});
  req.on('error', (err) => { 
    // Re-throw the error so it's uncaught
    throw err; 
  });
}

function showSyntaxErrorInfo() {
  console.log('\n🧪 Testing SyntaxError...');
  console.log('Note: SyntaxErrors are caught at parse time and cannot be triggered at runtime.');
  console.log('To test a SyntaxError, run: node -e "const obj = { name: \'DevBuddy\' ; }"');
}

// Run the specific test based on error type
if (errorType === 'reference') triggerReferenceError();
else if (errorType === 'type') triggerTypeError();
else if (errorType === 'range') triggerRangeError();
else if (errorType === 'uri') triggerURIError();
else if (errorType === 'eval') triggerEvalError();
else if (errorType === 'aggregate') triggerAggregateError();
else if (errorType === 'promise') triggerPromiseRejection();
else if (errorType === 'assert') triggerAssertionError();
else if (errorType === 'module') triggerModuleNotFoundError();
else if (errorType === 'fs') triggerFileSystemError();
else if (errorType === 'network') triggerNetworkError();
else if (errorType === 'syntax') showSyntaxErrorInfo();
else if (errorType === 'all') {
  console.log('\n⚠️ Will run the first test and stop at the first error.');
  console.log('To test all error types, run them individually.');
  console.log('\n');
  triggerReferenceError();
} 