/**
 * DevBuddy hint provider
 * Provides hints for common error patterns
 */

# DevBuddy 🤖

A developer-friendly runtime toolkit that intercepts JavaScript runtime errors and augments them with plain-English suggestions to help junior developers better understand and fix their code.

## Features

- 🚨 Intercepts JavaScript runtime errors in Node.js
- 💡 Provides clear, actionable, beginner-friendly error explanations
- 🎯 Supports a wide range of JavaScript and Node.js error types
- 🔍 Zero-config setup - just add one line to your app
- 💻 Outputs beautiful, readable error messages with context
- 🧩 Designed for Node.js development environments

## Installation

```bash
npm install devbuddy
```

## Usage

Simply require DevBuddy at the top of your application entry point and call `init()`:

```javascript
// Add this to the top of your main file (e.g., index.js, app.js)
require('devbuddy').init();

// The rest of your application code...
```

That's it! DevBuddy will now intercept errors and provide helpful suggestions.

## Recent Updates

### Enhanced System Error Detection
- Improved detection of Node.js system errors (ENOENT, ECONNREFUSED, etc.) through error code mapping
- Better identification of file system and networking error types

### Improved Error Formatting
- Enhanced "HOW TO FIX IT" section with more targeted recommendations
- Reduced duplicate content in error messages
- Better readability for complex error hints

## Example

Without DevBuddy, you might see an error like this:

```
ReferenceError: userNmae is not defined
    at Object.<anonymous> (/app.js:4:13)
```

With DevBuddy, you'll see:

```
🚨 ERROR: ReferenceError 
➤ userNmae is not defined

💡 WHY THIS HAPPENS 
  The variable "userNmae" doesn't exist in the current scope.

  Common causes:
  - The variable was never declared with let, const, or var
  - The variable name is misspelled (check for typos)
  - The variable exists in a different scope (e.g., inside a function)
  - You forgot to import a module or component
  - The variable is defined later in the code (after you try to use it)

🔧 HOW TO FIX IT 
  - Declare the variable before using it: let userNmae = value;
  - Check for spelling errors (JavaScript is case-sensitive)
  - If it's from another file, add: const userNmae = require('...')
  - Move variable declarations to the top of their scope
  - Check if you meant to use a global object like window.userNmae

📍 WHERE TO LOOK 
  → Object.<anonymous> (/app.js:4:13)
```

## Supported Error Types

DevBuddy now supports a comprehensive range of JavaScript errors:

### Core JavaScript Errors
- **ReferenceError**: When you use a variable that doesn't exist
- **TypeError**: When an operation is performed on an incompatible type
- **SyntaxError**: When there's a syntax mistake in your code
- **RangeError**: When a value is outside the allowed range
- **URIError**: When there's an issue with URI encoding/decoding
- **EvalError**: When there's a problem with the eval() function
- **AggregateError**: When multiple errors are wrapped into one

### Node.js Specific Errors
- **UnhandledPromiseRejection**: When promises fail without proper error handling
- **AssertionError**: From Node's assert module
- **ModuleNotFoundError**: When modules can't be found or imported
- **FileSystemError**: Issues with file system operations (ENOENT, EACCES, etc.)
- **NodeNetworkingError**: Network-related problems (ECONNREFUSED, EADDRINUSE, etc.)

## Troubleshooting Examples

Here are some common error scenarios and how DevBuddy helps:

### Accessing Property on Undefined
```javascript
const user = null;
console.log(user.name);
```

DevBuddy will tell you:
```
You're trying to access the property 'name' on null.

In JavaScript, you can't read properties from null. This happens when:
- An object you expected to exist is null
- An API call returned null instead of an object
- You're trying to access a deeply nested property without checking parent objects
- A function that normally returns an object returned null

How to fix:
1. Add a check before accessing the property:
   if (obj !== null) { obj.name }

2. Use optional chaining (ES2020):
   obj?.name

3. Provide a default value with nullish coalescing:
   (obj ?? {}).name
```

### Unhandled Promise Rejection
```javascript
async function getUser() {
  const response = await fetch('https://api.example.com/users/1');
  return response.json();
}
getUser(); // No error handling!
```

DevBuddy will tell you:
```
You have an unhandled Promise rejection in your async code.
This means a Promise in your code was rejected (failed), but you didn't provide error handling.

How to fix:
1. Always add .catch() handlers to your Promises:
   getUser()
     .then(user => {...})
     .catch(err => {
       console.error('Error:', err);
       // Handle the error appropriately
     });

2. When using async/await, use try/catch:
   async function doSomething() {
     try {
       const user = await getUser();
       // Process user
     } catch (err) {
       // Handle error
     }
   }
```

## Important Notes

- DevBuddy automatically disables itself in production environments (when `NODE_ENV=production`)
- Only works in Node.js environments (no browser support yet)
- Does not include telemetry or remote tracking
- Does not affect your application's behavior, only enhances error output

## Examples

Check out the `examples` directory for sample code demonstrating different error scenarios:

```bash
# Run the example to see DevBuddy in action
node examples/brokenApp.js

# Uncomment different errors in brokenApp.js to test various scenarios
```

## Development

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## License

MIT

## Roadmap

- Browser support
- Integration with popular frameworks (React, Express, etc.)
- Sourcemap integration for better error location
- Interactive mode with guided solutions
- VS Code extension integration # devbuddy
# devbuddy
# devbuddy
