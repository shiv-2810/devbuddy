/**
 * URIError hint provider
 * Provides hints for common URIError patterns
 */

/**
 * Returns a hint for a URIError
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message } = parsedError;
  
  // Check for decodeURI/decodeURIComponent errors
  if (message.includes('decodeURI') || message.includes('decode URI')) {
    return `You're trying to decode a URI or URI component that contains invalid encodings.
URIError occurs when decodeURI() or decodeURIComponent() receive malformed input.

Common problems:
- The string contains % followed by characters that aren't valid hexadecimal digits
- The string contains incomplete percent-encoding (like '%2' without a third character)
- The string includes invalid UTF-8 byte sequences

How to fix:
- Ensure the string you're decoding was properly encoded with encodeURI() or encodeURIComponent()
- Wrap your decode operation in a try/catch to handle malformed inputs
- Validate your input before decoding
- Check if you're accidentally double-decoding an already decoded string`;
  }
  
  // Check for encodeURI/encodeURIComponent errors
  if (message.includes('encodeURI') || message.includes('encode URI')) {
    return `You're trying to encode a URI or URI component with invalid characters.
URIError occurs when encodeURI() or encodeURIComponent() encounter characters 
they cannot encode (usually certain Unicode sequences).

How to fix:
- Check your input string for unusual Unicode characters or surrogate pairs
- Use a try/catch block around your encoding operation
- You might need to preprocess your string before encoding
- Consider using alternative encoding libraries that handle wider character ranges`;
  }
  
  // Generic URIError handling
  return `A URIError indicates a problem with URI encoding or decoding functions.
These errors happen with the following functions:
- encodeURI()
- decodeURI() 
- encodeURIComponent()
- decodeURIComponent()

Common causes:
- Trying to decode strings that weren't properly URI-encoded
- Strings with incomplete percent-encoding sequences (like '%F' without a second digit)
- Handling damaged or manually constructed URIs
- Working with invalid UTF-8 sequences

How to fix:
- Validate input before decoding
- Use try/catch blocks around URI operations
- Check if you're using the right function (encodeURI vs encodeURIComponent)
- Remember that encodeURIComponent() is more aggressive and escapes more characters`;
}; 