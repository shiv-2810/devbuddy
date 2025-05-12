/**
 * EvalError hint provider
 * Provides hints for EvalError patterns
 */

/**
 * Returns a hint for an EvalError
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message } = parsedError;
  
  // General explanation for EvalError
  return `An EvalError indicates an issue with the eval() function.
While modern JavaScript rarely throws EvalError directly (it uses SyntaxError instead),
this error type exists for backward compatibility.

The eval() function executes code from a string and is generally considered dangerous:
- It creates security vulnerabilities (code injection risks)
- It's slower than normal code
- It makes debugging difficult
- It complicates your codebase

Better alternatives:
- Avoid eval() entirely if possible
- Use Function constructor if you need dynamic code execution
- Consider using JSON.parse() for data parsing instead of eval
- Use a templating system or framework for dynamic content
- If you're handling math expressions, use a dedicated math library

Modern best practice is to avoid eval() in professional JavaScript code.`;
}; 