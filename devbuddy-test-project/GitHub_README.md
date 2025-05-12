# DevBuddy Test Project

A demonstration project showing how to use [DevBuddy](https://github.com/shiv-2810/devbuddy), a developer-friendly Node.js toolkit that provides beginner-friendly JavaScript error explanations.

![DevBuddy Demo](https://github.com/shiv-2810/devbuddy-test-project/raw/main/screenshots/devbuddy-demo.png)

## What is DevBuddy?

DevBuddy is a Node.js library that:

- Intercepts JavaScript runtime errors
- Provides clear, actionable, beginner-friendly error explanations
- Helps developers understand what went wrong and how to fix it
- Supports a wide range of JavaScript and Node.js error types

## Installation

Clone this repository:

```bash
git clone https://github.com/shiv-2810/devbuddy-test-project.git
cd devbuddy-test-project
```

Install dependencies:

```bash
npm install
```

## Running the Examples

This project includes examples of different error types and how DevBuddy explains them:

### Interactive Menu

```bash
npm start
```

This will launch an interactive menu where you can choose which error type to test.

### Individual Error Examples

You can also run individual error examples directly:

- **Reference Error**: `npm run test:reference`
- **Type Error**: `npm run test:type`
- **Range Error**: `npm run test:range`
- **File System Error**: `npm run test:fs`
- **Network Error**: `npm run test:network`
- **Promise Rejection Error**: `npm run test:promise`

## Error Types Demonstrated

1. **ReferenceError**: Trying to use a variable that doesn't exist
2. **TypeError**: Accessing a property of null
3. **RangeError**: Maximum call stack size exceeded (infinite recursion)
4. **FileSystemError**: Trying to read a non-existent file (ENOENT)
5. **NetworkingError**: Connection refused (ECONNREFUSED)
6. **UnhandledPromiseRejection**: A Promise rejection with no .catch() handler

## How DevBuddy Works

DevBuddy is initialized at the top of each JavaScript file:

```javascript
require('devbuddy').init();
```

When an error occurs, DevBuddy:

1. Intercepts the error before it crashes your application
2. Analyzes the error type and message
3. Provides a friendly explanation of what went wrong
4. Gives specific suggestions on how to fix the issue
5. Shows relevant code locations to investigate

## Using DevBuddy in Your Projects

To use DevBuddy in your own Node.js projects:

1. Install DevBuddy from npm:
   ```bash
   npm install devbuddy
   ```

2. Add it to your main file:
   ```javascript
   require('devbuddy').init();
   ```

3. That's it! DevBuddy will automatically enhance any uncaught errors.

## License

MIT

## Credits

Created by [Shivam Kumar](https://github.com/shiv-2810) 