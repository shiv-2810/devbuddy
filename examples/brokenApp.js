/**
 * DevBuddy Demo App
 * 
 * This example demonstrates DevBuddy by triggering different types of errors.
 * To try each error, uncomment one at a time and run:
 * 
 * node brokenApp.js
 */

// Initialize DevBuddy
require('../src').init();

console.log('DevBuddy Demo App Started');

// Choose one error to test (uncomment one at a time):

// -------------------- ReferenceError Examples --------------------

// 1.1 ReferenceError: variable is not defined
// console.log(undefinedVariable);

// 1.2 ReferenceError: Cannot access variable before initialization
// console.log(letVar);
// let letVar = 'too late';

// 1.3 ReferenceError: Assignment to expression
// const obj = {};
// obj.func() = 5;

// -------------------- TypeError Examples --------------------

// 2.1 TypeError: null/undefined access
// const user = null;
// console.log(user.name);

// 2.2 TypeError: not a function
// const obj = { name: 'DevBuddy' };
// obj.getName();

// 2.3 TypeError: Assignment to constant
// const MAX_VALUE = 100;
// MAX_VALUE = 200;

// 2.4 TypeError: is not iterable
// const notIterable = 42;
// for (const item of notIterable) {
//   console.log(item);
// }

// 2.5 TypeError: Cannot convert undefined to object
// const keys = Object.keys(undefined);

// 2.6 TypeError: reduce of empty array with no initial value
// const emptyArray = [];
// emptyArray.reduce((sum, item) => sum + item);

// 2.7 TypeError: X is not a constructor
// const notAConstructor = () => {};
// new notAConstructor();

// -------------------- SyntaxError Examples --------------------

// You need to create a new file to test SyntaxErrors
// Example: node -e "const obj = { name: 'DevBuddy' ; }"

// -------------------- RangeError Examples --------------------

// 3.1 RangeError: Maximum call stack size exceeded
// function recursiveFunction() {
//   recursiveFunction();
// }
// recursiveFunction();

// 3.2 RangeError: Invalid array length
// const arr = new Array(-1);

// 3.3 RangeError: Invalid count value
// "hi".repeat(-1);

// 3.4 RangeError: toFixed() precision out of range
// (123).toFixed(101);

// -------------------- URIError Examples --------------------

// 4.1 URIError: URI malformed
// decodeURIComponent('%');

// -------------------- EvalError Example --------------------

// 5.1 EvalError (rarely thrown in modern JS)
// function checkEval() {
//   throw new EvalError('Eval usage not recommended');
// }
// checkEval();

// -------------------- AggregateError Example --------------------

// 6.1 AggregateError from Promise.any
// async function testAggregateError() {
//   try {
//     await Promise.any([
//       Promise.reject(new Error('Failed 1')),
//       Promise.reject(new Error('Failed 2'))
//     ]);
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }
// testAggregateError();

// -------------------- UnhandledPromiseRejection Examples --------------------

// 7.1 Basic unhandled promise rejection
// Promise.reject(new Error('Unhandled rejection!'));

// 7.2 Async/await without try/catch
// async function asyncFail() {
//   const data = await fetch('https://this-does-not-exist.example.com');
//   return data.json();
// }
// asyncFail();

// -------------------- AssertionError Example --------------------

// 8.1 Built-in assert module error
// const assert = require('assert');
// assert.strictEqual(1, 2, 'Numbers are not equal');

// -------------------- ModuleNotFoundError Example --------------------

// 9.1 Cannot find module
// require('some-module-that-doesnt-exist');

// -------------------- Node.js File System Errors --------------------

// 10.1 ENOENT: File not found
// const fs = require('fs');
// fs.readFileSync('/path/to/nonexistent/file.txt');

// 10.2 EACCES: Permission denied (may need to run on a read-only file)
// const fs = require('fs');
// try {
//   // This will fail if /etc/passwd exists and is read-only (Unix/Linux/macOS)
//   fs.writeFileSync('/etc/passwd', 'hello');
// } catch (err) {
//   throw err;
// }

// -------------------- Node.js Networking Errors --------------------

// 11.1 ECONNREFUSED: Connection refused
// const http = require('http');
// const req = http.get('http://localhost:12345', () => {});
// req.on('error', (err) => { throw err; });

// 11.2 EADDRINUSE: Address already in use
// First run a server on port 9090, then try to start another one
// const http = require('http');
// const server1 = http.createServer().listen(9090, () => {
//   console.log('Server 1 running');
//   // Try to start another server on the same port
//   const server2 = http.createServer().listen(9090);
//   server2.on('error', (err) => { throw err; });
// });

// 11.3 Headers already sent error
// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World');
//   // Try to send headers again after response has been sent
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
// }).listen(9091);

console.log('If you see this, no error was triggered. Uncomment one of the error examples to see DevBuddy in action.'); 