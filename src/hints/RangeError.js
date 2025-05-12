/**
 * RangeError hint provider
 * Provides hints for common RangeError patterns
 */

/**
 * Returns a hint for a RangeError
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message } = parsedError;
  
  // Maximum call stack size exceeded
  if (message.includes('Maximum call stack size exceeded')) {
    return `You have an infinite recursion in your code.
This happens when a function calls itself without a proper exit condition.
- Check recursive functions for a proper base case (exit condition)
- Ensure recursive calls are getting closer to the base case
- Look for accidental infinite loops within recursive functions
- Consider rewriting recursive logic as iterative (using loops)`;
  }
  
  // Invalid array length
  if (message.includes('Invalid array length') || message.includes('invalid array length')) {
    return `You're trying to create an array with an invalid length.
Array lengths must be a positive integer less than 2^32 - 1 (4,294,967,295).
- Ensure you're not using a negative number
- Check for extremely large numbers that exceed JavaScript's array size limit
- Verify calculations that determine array size aren't resulting in NaN, Infinity, or negative values`;
  }
  
  // Array buffer allocation errors
  if (message.includes('allocation') && message.includes('too large')) {
    return `You're trying to allocate a buffer or typed array that's too large.
JavaScript has limits on the size of memory allocations.
- Reduce the requested size of your ArrayBuffer, TypedArray, or Buffer
- Consider processing your data in smaller chunks instead of all at once
- Check for calculation errors that might be resulting in an excessive size request`;
  }
  
  // Invalid string length
  if (message.includes('Invalid string length')) {
    return `You're trying to create a string that exceeds JavaScript's maximum string length.
In most browsers and Node.js, strings are limited to around 2^28 - 2^30 characters.
- Consider handling your data in smaller chunks
- Check for loops or operations that might be generating extremely large strings
- For large text, consider using streams or buffers instead of in-memory strings`;
  }
  
  // Invalid repeat count
  if (message.includes('Invalid count value') && message.includes('repeat')) {
    return `You've provided an invalid count to the String.prototype.repeat method.
The repeat count must be a positive finite number.
- Ensure the repeat count is not negative, Infinity, or NaN
- Verify any variables used for the count have valid values
- Check that the repeat operation won't create a string exceeding the maximum string length`;
  }
  
  // Precision issue in toFixed, toPrecision, etc.
  if ((message.includes('precision') || message.includes('fraction')) && 
      (message.includes('toFixed') || message.includes('toPrecision') || message.includes('toExponential'))) {
    return `You've provided an invalid precision value to a number formatting method.
Methods like toFixed(), toPrecision(), and toExponential() have specific allowed ranges:
- toFixed(): must be between 0 and 100
- toPrecision(): must be between 1 and 100
- toExponential(): must be between 0 and 100
Check the number you're passing to these methods and ensure it's in the valid range.`;
  }
  
  // Catch-all for other RangeErrors
  return `A RangeError occurs when a value is outside the allowed range.
Common causes include:
- Creating extremely large arrays
- Infinite recursion (function calling itself without stopping)
- Using invalid values for methods like toFixed() or toPrecision()
- Creating typed arrays with invalid sizes
- Calling repeat() with invalid counts
Check your values are within the expected reasonable ranges.`;
}; 