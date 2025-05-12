# DevBuddy Usage Guide

This guide shows you how to use DevBuddy in your Node.js projects to enhance error messages with friendly, detailed explanations.

## Installation

Install DevBuddy from npm:

```bash
npm install devbuddy
```

## Basic Usage

1. Require and initialize DevBuddy at the top of your entry point file:

```javascript
// At the top of your main file (e.g., index.js, app.js, server.js)
require('devbuddy').init();

// Rest of your application code...
```

2. That's it! DevBuddy will now intercept uncaught exceptions and unhandled promise rejections, providing helpful explanations.

## Example

Without DevBuddy, you might see an error like this:

```
TypeError: Cannot read properties of null (reading 'name')
    at Object.<anonymous> (app.js:5:16)
```

With DevBuddy, you'll see:

```
🚨 ERROR: TypeError 
➤ Cannot read properties of null (reading 'name')

💡 WHY THIS HAPPENS 
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

🔧 HOW TO FIX IT 
  1. Add a check before accessing the property:
     if (obj !== null) { obj.name }
  
  2. Use optional chaining (ES2020):
     obj?.name

📍 WHERE TO LOOK 
  → Object.<anonymous> (app.js:5:16)
  ... (more stack frames)
```

## Important Notes

- DevBuddy automatically disables itself in production environments (when `NODE_ENV=production`)
- It doesn't affect your application's behavior, only enhances error output
- It's designed for development environments to help with debugging

## Supported Error Types

DevBuddy handles a wide range of JavaScript errors:

- **ReferenceError**: When you use a variable that doesn't exist
- **TypeError**: When an operation is performed on an incompatible type
- **SyntaxError**: When there's a syntax mistake in your code
- **RangeError**: When a value is outside the allowed range
- **URIError**: When there's an issue with URI encoding/decoding
- **EvalError**: When there's a problem with the eval() function
- **AggregateError**: When multiple errors are wrapped into one
- **UnhandledPromiseRejection**: When promises fail without proper error handling
- **AssertionError**: From Node's assert module
- **ModuleNotFoundError**: When modules can't be found or imported
- **FileSystemError**: Issues with file system operations (ENOENT, EACCES, etc.)
- **NodeNetworkingError**: Network-related problems (ECONNREFUSED, EADDRINUSE, etc.)

## Advanced Usage

### Customizing DevBuddy

Currently, DevBuddy doesn't require customization - it works automatically.

### Only in Development

DevBuddy is designed for development environments. To ensure it doesn't run in production:

```javascript
// Don't worry, this is built-in!
if (process.env.NODE_ENV !== 'production') {
  require('devbuddy').init();
}
```

## Examples

Check out the [DevBuddy Test Project](https://github.com/shiv-2810/devbuddy-test-project) for practical examples of DevBuddy in action with different error types. 