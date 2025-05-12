/**
 * UnhandledPromiseRejectionWarning hint provider
 * Provides hints for unhandled promise rejections
 */

/**
 * Returns a hint for UnhandledPromiseRejectionWarning
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message, originalError } = parsedError;
  
  // First check if we have a more specific error inside the promise rejection
  // that we can provide better hints for
  if (originalError && originalError.name && originalError.name !== 'Error') {
    // Try to get the specific error type's hint provider
    try {
      const specificHintProvider = require(`./${originalError.name}`);
      const specificHint = specificHintProvider({ 
        type: originalError.name,
        message: originalError.message,
        stack: originalError.stack,
        originalError: originalError
      });
      
      if (specificHint) {
        return `This is an unhandled Promise rejection containing a ${originalError.name}:\n\n${specificHint}\n
Additionally, to fix the unhandled promise rejection itself:
- Add .catch() handlers to your promises
- Use try/catch with async/await
- Add a global process.on('unhandledRejection') handler`;
      }
    } catch (err) {
      // No specific handler available, continue with general guidance
    }
  }
  
  // Check for common async issues
  if (message.includes('undefined is not a function') || message.includes('is not a function')) {
    return `You have an unhandled Promise rejection due to trying to call a function that doesn't exist.
This often happens in async code when:
- You misspelled a function name
- You're calling a method on an object that's undefined or null
- You forgot to import or define a function you're using in a Promise chain
- You expected an API to return a function but it returned something else

How to fix:
1. Add proper error handling with .catch() or try/catch for async/await
2. Check all function names and references in your Promise chain
3. Validate that objects exist before calling methods on them
4. Use optional chaining (obj?.method) for safer property access`;
  }
  
  // Check for network or file system errors
  if (message.includes('ECONNREFUSED') || message.includes('ENOTFOUND') || 
      message.includes('fetch') || message.includes('http')) {
    return `You have an unhandled Promise rejection from a network request.
Your code is trying to connect to a server or API that failed, but you're not handling the error case.

Common causes:
- The server or API is down
- URL or hostname is incorrect
- Network connectivity issues
- Firewall or permission problems
- Incorrect port number

How to fix:
1. Always add .catch() handlers to network requests:
   fetch(url).then(response => {...}).catch(err => {...})

2. Or use try/catch with async/await:
   try {
     const response = await fetch(url);
   } catch (err) {
     // Handle error
   }

3. Check that your URLs and server details are correct
4. Consider adding retry logic for transient network failures`;
  }
  
  // Generic handler for any unhandled rejection
  return `You have an unhandled Promise rejection in your async code.
This means a Promise in your code was rejected (failed), but you didn't provide error handling.

In Node.js, unhandled rejections can terminate your process (in newer versions)
or cause silent failures and memory leaks (in older versions).

How to fix:
1. Always add .catch() handlers to your Promises:
   somePromise()
     .then(result => {...})
     .catch(err => {
       console.error('Error:', err);
       // Handle the error appropriately
     });

2. When using async/await, use try/catch:
   async function doSomething() {
     try {
       const result = await somePromise();
       // Process result
     } catch (err) {
       // Handle error
     }
   }

3. For global fallback, add (but don't rely solely on):
   process.on('unhandledRejection', (reason, promise) => {
     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
     // Application-specific handling
   });

Remember: Always handle Promise failures explicitly in your code!`;
}; 