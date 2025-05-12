# DevBuddy Test Project

This project demonstrates the usage of DevBuddy, a developer-friendly error handling toolkit for Node.js.

## What is DevBuddy?

DevBuddy intercepts JavaScript runtime errors and provides beginner-friendly, detailed explanations to help developers understand and fix issues more easily.

## Installation

```bash
# First install dependencies
npm install

# Link local DevBuddy package for testing
npm link ../devbuddy
```

## Running the Examples

This project contains several examples of common JavaScript errors. Each example demonstrates how DevBuddy intercepts and explains the error.

### Reference Error

```bash
npm run test:reference
```

### Type Error

```bash
npm run test:type
```

### Range Error

```bash
npm run test:range
```

### File System Error

```bash
npm run test:fs
```

### Network Error

```bash
npm run test:network
```

### Promise Rejection Error

```bash
npm run test:promise
```

### Running All Examples

```bash
npm start
```

## How It Works

DevBuddy is initialized at the top of each JavaScript file with:

```javascript
require('devbuddy').init();
```

When an error occurs, DevBuddy intercepts it and provides a friendly explanation of what went wrong and how to fix it. 