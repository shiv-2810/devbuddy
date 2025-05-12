/**
 * AggregateError hint provider
 * Provides hints for AggregateError patterns
 */

/**
 * Returns a hint for an AggregateError
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message, originalError } = parsedError;
  
  // Check for Promise.any related messages
  if (message.includes('All promises were rejected')) {
    return `An AggregateError with "All promises were rejected" occurs when Promise.any() fails.
Promise.any() expects at least one promise to fulfill (succeed), but all promises were rejected.

This typically happens in Promise.any() operations where:
- Every promise in the array failed
- The array of promises was empty
- You have logic errors in your promises causing them all to reject

How to fix:
- Check each promise in your array to understand why all are failing
- Make sure your array contains at least one promise
- Ensure the promises are properly formed
- Consider using Promise.allSettled() if you want to handle both success and failure cases
- Add better error handling inside your promise functions`;
  }
  
  // Check for Promise.all related usage
  if (message.includes('aggregate') && message.toLowerCase().includes('promise')) {
    return `An AggregateError is thrown when multiple errors need to be reported as one.
This often happens in operations like Promise.any() when all promises are rejected.

The AggregateError contains an 'errors' property that holds an array of all the individual errors.
You can access these with: aggregateError.errors

How to debug:
- Examine each individual error in the 'errors' array
- Check if you're handling Promise.any() correctly (it needs at least one successful promise)
- Look for common patterns across all the errors (might indicate a systemic issue)
- Consider using different Promise combinators like Promise.allSettled() for better error insight`;
  }
  
  // Generic AggregateError handling
  return `AggregateError is a collection of multiple errors wrapped as one.
It was introduced in ES2020 and is commonly used in Promise operations.

Common causes:
- Using Promise.any() where all promises reject
- Using libraries or APIs that bundle multiple errors
- Working with operations that can fail in multiple ways at once

How to debug:
- AggregateError has an 'errors' property that contains an array of all individual errors
- Check each of these errors individually
- Look for patterns or commonalities between the errors
- Make sure your promise handling is correct
- Consider adding extra logging or try/catch handlers around problematic code

Example of handling:
try {
  // code that might throw AggregateError
} catch (err) {
  if (err instanceof AggregateError) {
    // Loop through individual errors
    err.errors.forEach(error => console.log(error.message));
  }
}`;
}; 