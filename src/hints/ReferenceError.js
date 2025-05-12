/**
 * ReferenceError hint provider
 * Provides hints for common ReferenceError patterns
 */

/**
 * Returns a hint for a ReferenceError
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message } = parsedError;
  
  // Check for "X is not defined" errors
  if (message.includes('is not defined')) {
    const variableName = message.split(' ')[0];
    return `The variable "${variableName}" doesn't exist in the current scope.

Common causes:
- The variable was never declared with let, const, or var
- The variable name is misspelled (check for typos)
- The variable exists in a different scope (e.g., inside a function)
- You forgot to import a module or component
- The variable is defined later in the code (after you try to use it)

How to fix:
- Declare the variable before using it: let ${variableName} = value;
- Check for spelling errors (JavaScript is case-sensitive)
- If it's from another file, add: const ${variableName} = require('...')
- Move variable declarations to the top of their scope
- Check if you meant to use a global object like window.${variableName}`;
  }
  
  // Check for "Cannot access X before initialization" errors
  if (message.includes('before initialization')) {
    // Extract variable name if possible
    const match = message.match(/Cannot access '?([^']*)'? before initialization/);
    const varName = match ? match[1] : 'variable';
    
    return `You're trying to use the variable '${varName}' before it's been initialized.

This happens because of the "temporal dead zone" with let and const variables:
- Variables declared with let/const exist in the scope from the start
- But they can't be accessed until the line where they're declared
- Unlike var, they don't get "hoisted" with a default value of undefined

Example of the problem:
  console.log(x);  // Error: Cannot access 'x' before initialization
  let x = 5;

How to fix:
- Move your variable declaration above the first usage
- Initialize the variable earlier in the code
- Reorganize your code to avoid the reference before declaration`;
  }
  
  // Check for assignment errors 
  if (message.includes('assignment to') || message.includes('left-hand')) {
    return `You're trying to assign a value to something that can't be assigned to.

Common causes:
- Accidentally using = instead of == or === in a condition
- Trying to assign to a function call result: doSomething() = value;
- Trying to assign to a property that doesn't exist
- Using a reserved keyword as a variable name

How to fix:
- If this is a comparison, use == or === instead of =
- Check that the left side of the assignment is a valid variable or property
- Make sure you're not trying to assign to a literal value or expression
- If assigning to an object property, make sure the object exists first`;
  }
  
  // Check for "X is not a function" in a ReferenceError context
  if (message.includes('is not a function')) {
    const parts = message.split(' ');
    const funcName = parts[0];
    
    return `You're trying to call '${funcName}' as a function, but it doesn't exist in this scope.

Common causes:
- The function name is misspelled
- The function exists in a different scope
- The function is defined later in the code
- The function needs to be imported from a module
- You meant to use a method of an object, but used wrong syntax

How to fix:
- Check for typos in the function name
- Make sure you've defined or imported the function
- If it's a method, use proper notation: object.method()
- Check if you need to bind the function to the correct 'this' context`;
  }
  
  // Check for global/window reference errors (browser-specific)
  if (message.includes('window') || message.includes('document') || message.includes('global')) {
    return `You're trying to access a global object that doesn't exist in the current environment.

If you see a reference to 'window' or 'document':
- These are browser-specific objects not available in Node.js
- Your code might be written for browsers but running in Node.js

If you see a reference to 'global':
- This is Node.js's global object (similar to 'window' in browsers)
- It might not be available in all JavaScript environments

How to fix:
- Use environment checks: if (typeof window !== 'undefined') { ... }
- Use appropriate APIs for the current environment
- In Node.js, use the 'global' object instead of 'window'
- Consider using isomorphic libraries that work in both environments`;
  }
  
  // Check for scoping issues (specific message patterns)
  if (message.includes('scope') || message.includes('closure')) {
    return `You have a scoping issue with your variables or functions.

JavaScript has function scope (for var) and block scope (for let/const):
- Variables declared with var are hoisted to the top of their function
- Variables declared with let/const are only available in their block {}
- Functions create their own scope

Common issues:
- Trying to access block-scoped variables outside their block
- Expecting var variables to be block-scoped (they're not)
- Confusion with closures capturing variables

How to fix:
- Use let/const instead of var for proper block scoping
- Move variable declarations to the appropriate scope
- Be careful with loops and closures (they may share variables)
- Remember that each function creates its own 'this' context`;
  }
  
  // Default catchall for other ReferenceErrors
  return `A ReferenceError occurs when you try to use a variable or function that doesn't exist.

Common causes:
- Using a variable without declaring it first
- Misspelling a variable or function name
- Accessing a variable outside its scope
- Using let/const variables before they're declared
- Accessing browser objects (like window or document) in Node.js

How to fix:
- Check for typos in variable and function names
- Declare variables before using them (with let, const, or var)
- Check the scope where variables are defined
- Make sure you've imported any required modules
- Add proper error handling for references that might not exist`;
}; 