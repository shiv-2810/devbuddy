/**
 * SyntaxError hint provider
 * Provides hints for common SyntaxError patterns
 */

/**
 * Returns a hint for a SyntaxError
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message } = parsedError;
  
  // Check for "Unexpected token" errors
  if (message.includes('Unexpected token')) {
    // Extract the unexpected token if possible
    const tokenMatch = message.match(/Unexpected token '?([^']*)'?/);
    const token = tokenMatch ? tokenMatch[1] : 'unknown';
    
    return `There's a syntax error in your code. JavaScript encountered '${token}' where it wasn't expecting it.

Common causes:
- Mismatched brackets, parentheses, or quotes: check that all (, {, [ have matching closing ones
- Missing commas in arrays or objects: [1 2] should be [1, 2]
- Extra commas: {a: 1, b: 2,} (trailing comma may be invalid in some contexts)
- Using reserved keywords as variable names
- Template literals using wrong quotes (use backticks for template strings not quotes)
- Missing operators between values

How to fix:
- Read the code near the error line carefully
- Count opening/closing pairs of (), {}, and []
- Check if quotes/backticks are properly matched
- Look for missing commas or extra symbols`;
  }
  
  // Check for "Unexpected end of input" or "Unexpected end of JSON input" errors
  if (message.includes('Unexpected end of')) {
    return `Your code or JSON is incomplete. Something was opened but never closed.

Common causes:
- Unclosed brackets, parentheses: missing ), }, or ]
- Unclosed string: missing " or ' at the end of a string
- Incomplete multiline comment: missing */
- Incomplete template literal: missing closing backtick
- Truncated file or JSON data

How to fix:
- Count your opening and closing brackets to ensure they match
- Check for unclosed quotes or backticks
- Use a code editor with bracket matching
- For JSON, use a validator like jsonlint.com
- If working with a multiline string, make sure it's properly closed`;
  }
  
  // Check for "Unexpected identifier" errors
  if (message.includes('Unexpected identifier')) {
    return `JavaScript found a variable/function name (identifier) where it wasn't expecting one.

Common causes:
- Missing operators: x y should be x + y or x, y
- Missing commas in object literals: {a: 1 b: 2} should be {a: 1, b: 2}
- Missing semicolons between statements (in specific contexts)
- Trying to use reserved keywords as variable names
- Trying to use ES6 features in older JavaScript environments

How to fix:
- Look for missing operators between variables or values
- Check for missing commas in objects or arrays
- Ensure you're not using reserved words as identifiers
- Check that your code matches the JavaScript version you're running`;
  }
  
  // Check for missing semicolon errors
  if (message.includes('Missing semicolon') || message.includes('missing ;')) {
    return `You're missing a semicolon at the end of a statement.

While JavaScript has automatic semicolon insertion (ASI), some situations still require explicit semicolons:

- When a line starts with (, [, /, +, or - which could be interpreted as continuing the previous line
- In for loops with empty parts: for (;;) { ... }
- When using multiple statements on a single line

How to fix:
- Add a semicolon at the indicated position
- Consider using a consistent style (either always use semicolons or consistently rely on ASI)
- Be careful with statements split across multiple lines, especially with method chaining`;
  }
  
  // Check for illegal return statements
  if (message.includes('Illegal return statement')) {
    return `You have a return statement outside of a function.

Common causes:
- Using 'return' at the top level of your script
- Using 'return' in an eval() context where it's not allowed
- Misplacing a return statement outside its intended function

How to fix:
- Move the return statement inside a function
- Make sure your functions and their returns are properly enclosed in braces {}
- If you're trying to exit a script, use process.exit() in Node.js instead`;
  }
  
  // Check for invalid or unexpected string errors
  if (message.includes('Invalid or unexpected token') || message.includes('Unexpected string')) {
    return `JavaScript encountered an invalid or unexpected string in your code.

Common causes:
- Using curly quotes (" ") instead of straight quotes (" ")
- Using the wrong type of quotes (mixing ' and " without escaping)
- Including special invisible characters in your code
- Having line breaks within a regular string (use template literals with backticks for multiline strings)
- Copy-pasting code from websites or documents that replaced quotes with special characters

How to fix:
- Replace any fancy quotes with straight quotes
- Ensure multiline strings use template literals (backticks)
- Check for invisible characters or encoding issues
- Re-type quotes instead of copy-pasting if necessary`;
  }
  
  // Check for unexpected property errors
  if (message.includes('Unexpected property')) {
    return `JavaScript found a property where it wasn't expecting one.

Common causes:
- Using shorthand syntax incorrectly in object literals
- Invalid object destructuring syntax
- Incorrect property syntax in object initialization

How to fix:
- Check your object literal syntax: {key: value} not {key = value}
- For shorthand properties, ensure the variable exists: const x = 5; const obj = {x};
- With destructuring, ensure the syntax is correct: const {key} = obj; not const {key: obj};`;
  }
  
  // Check for "Unexpected reserved word" errors
  if (message.includes('Unexpected reserved word')) {
    return `You're trying to use a reserved JavaScript keyword in an invalid way.

Common causes:
- Using keywords like class, let, const, import, export as variable names
- Using ES6+ syntax in an environment that doesn't support it
- Using strict mode features without enabling strict mode
- Trying to use a future JavaScript feature not yet supported

How to fix:
- Rename variables to not use reserved keywords
- Check if you need a transpiler like Babel for newer syntax
- Add 'use strict'; at the top of your file or function
- Check your Node.js version supports the JavaScript features you're using`;
  }
  
  // Check for "Missing initializer in..." errors
  if (message.includes('Missing initializer')) {
    return `You declared a constant (const) without initializing it with a value.

Unlike let or var, const declarations must be initialized when declared.

How to fix:
- Add a value: const x = 'something';
- If you don't have an initial value, use let instead: let x;
- If the value is calculated later, initialize with a default: const x = null;`;
  }
  
  // Check for template literal errors
  if (message.includes('template literal') || message.includes('Unterminated template')) {
    return `There's an issue with a template literal (string using backticks).

Common causes:
- Missing closing backtick
- Unescaped backtick within the template
- Invalid expression inside template expressions
- Nesting template literals incorrectly

How to fix:
- Ensure all template literals start and end with backticks
- If you need a backtick inside the template, escape it with a backslash
- Check that all expressions inside the template are valid JavaScript
- For nested templates, make sure inner and outer backticks are properly balanced`;
  }
  
  // JSON parse errors
  if (message.includes('JSON.parse')) {
    return `There's an error parsing JSON data.

Common causes:
- Missing or extra commas in the JSON
- Using single quotes instead of double quotes for strings
- Keys not enclosed in double quotes
- Having trailing commas (not allowed in JSON)
- Including JavaScript comments (// or /* */) in JSON
- Using undefined, NaN, or functions (not valid in JSON)

How to fix:
- Ensure all strings use double quotes: {"key": "value"}
- Check that all property names are in double quotes
- Remove any trailing commas in arrays or objects
- Remove any comments from your JSON
- Use a JSON validator to find syntax errors`;
  }
  
  // Strict mode errors
  if (message.includes('strict mode')) {
    return `Your code is violating a rule in JavaScript strict mode.

Strict mode enforces stricter parsing and error handling, including:
- No using variables without declaring them
- No duplicate parameter names in functions
- No using delete on variables
- No octal syntax or with statement

How to fix:
- Ensure all variables are properly declared with let, const, or var
- Check for duplicate parameter names in functions
- Remove 'with' statements
- Fix any other strict mode violations mentioned in the error`;
  }
  
  // Catch-all for other syntax errors
  return `You have a syntax error in your JavaScript code.

Common causes of syntax errors:
- Mismatched brackets, braces, or parentheses: (), {}, []
- Missing commas between items in arrays or objects
- Using reserved keywords incorrectly
- Improper string quotes or unclosed strings
- Invalid JavaScript syntax or typos
- Using newer JavaScript features in older environments

Debugging tips:
1. Look carefully at the line where the error occurs
2. Check for mismatched pairs of symbols: (), {}, [], "", ''
3. Use a linter like ESLint to catch syntax errors automatically
4. Try commenting out sections of code to isolate the problem
5. Indent your code properly to make structure issues more visible`;
}; 