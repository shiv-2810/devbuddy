/**
 * TypeError hint provider
 * Provides hints for common TypeError patterns
 */

/**
 * Returns a hint for a TypeError
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message } = parsedError;
  
  // Check for "X is not a function" errors
  if (message.includes('is not a function')) {
    // Extract the problematic value
    const parts = message.split(' ');
    let varName = parts[0];
    
    return `"${varName}" exists but isn't a function, yet your code is trying to call it like one.

Common causes:
- The variable/property contains a value (string, number, object) not a function
- You have a typo in the function name
- The object you're calling the method on is undefined or null
- You're using an API incorrectly
- The function was overwritten with a non-function value

How to fix:
- Check that ${varName} is supposed to be a function and not a regular variable
- Verify that you've spelled the function name correctly (case matters)
- Make sure the object exists before calling methods: if (obj) { obj.method() }
- Use optional chaining for safer access: obj?.method()
- Check your imports/requires to ensure you're getting the right exports`;
  }
  
  // Check for "Cannot read property 'X' of undefined/null" errors
  if (message.includes('Cannot read') && (message.includes('undefined') || message.includes('null'))) {
    // Try to extract property name if available
    let propName = 'property';
    const propMatch = message.match(/property '?([^']*)'? of/);
    if (propMatch && propMatch[1]) {
      propName = propMatch[1];
    }
    
    const isUndefined = message.includes('undefined');
    const type = isUndefined ? 'undefined' : 'null';
    
    return `You're trying to access the property '${propName}' on ${type}.

In JavaScript, you can't read properties from ${type}. This happens when:
- An object you expected to exist is ${type}
- An API call returned ${type} instead of an object
- You're trying to access a deeply nested property without checking parent objects
- A function that normally returns an object returned ${type}

How to fix:
1. Add a check before accessing the property:
   if (obj !== ${type}) { obj.${propName} }

2. Use optional chaining (ES2020):
   obj?.${propName}

3. Provide a default value with nullish coalescing:
   (obj ?? {}).${propName}

4. Debug by checking when and why the object is ${type}:
   console.log('Object value:', obj)`;
  }
  
  // Check for "Assignment to constant variable" errors
  if (message.includes('Assignment to constant variable')) {
    return `You're trying to reassign a variable that was declared with 'const'.

Variables declared with const:
- Cannot be reassigned after initialization
- Are not immutable - their properties can still be changed
- Must be assigned a value when declared

Common mistakes:
- Trying to change a const variable's value
- Declaring a loop counter with const
- Forgetting that a variable needs to be reassignable

How to fix:
- If you need to modify this variable, use 'let' instead of 'const'
- If it's an object, you can modify its properties (obj.prop = value)
- If it's an array, you can change elements (arr[0] = value)
- Use const only for values that shouldn't change`;
  }
  
  // Check for "X is not iterable" errors
  if (message.includes('is not iterable')) {
    const match = message.match(/(.+) is not iterable/);
    const value = match ? match[1] : 'value';
    
    return `You're trying to iterate over ${value}, but it's not an iterable object.

In JavaScript, you can only use for...of loops, spread syntax (...), or destructuring on iterable objects:
- Arrays: [1, 2, 3]
- Strings: "hello"
- Maps, Sets
- Objects with a Symbol.iterator method

Common causes:
- The variable is undefined or null
- The variable is a number, boolean, or non-iterable object
- The API call that should return an array returned something else
- Trying to use for...of on a plain object (use for...in instead)

How to fix:
- Check that your variable contains what you expect: console.log(typeof ${value}, ${value})
- For plain objects, use: for (const key in obj) or Object.keys(obj).forEach()
- Make sure API calls successfully return arrays before iterating
- Convert to an iterable if possible: Object.keys(obj), Object.entries(obj)`;
  }
  
  // Check for object/property non-extensible errors
  if (message.includes('extensible') || (message.includes('define property') && message.includes('on'))) {
    return `You're trying to add or modify a property on an object that's non-extensible.

In JavaScript, objects can be locked down with:
- Object.preventExtensions() - prevents adding new properties
- Object.seal() - prevents adding or deleting properties
- Object.freeze() - prevents adding, deleting, or modifying properties

This commonly happens when:
- Working with frozen objects in libraries/frameworks
- Using Object.defineProperty on non-extensible objects
- Trying to modify built-in objects that have been locked

How to fix:
- Create a copy of the object before modifying it: {...obj}
- Use a different property that is modifiable
- Check if the object is extensible first: Object.isExtensible(obj)
- Create a new object with the desired properties instead of modifying the original`;
  }
  
  // Check for "Cannot convert X to object" errors
  if (message.includes('Cannot convert') && message.includes('to object')) {
    return `You're trying to use an object method on a primitive value (like null, undefined, or a number).

Common causes:
- Calling Object methods on null or undefined: Object.keys(null)
- Using object spread on non-objects: {...undefined}
- Accessing properties with bracket notation on primitives: undefined['prop']
- Trying to destructure from a primitive: const {prop} = undefined

How to fix:
- Check that your variable is an object before using object methods
- Add null/undefined checks before operations: if (obj) {...}
- Provide default values: const {prop} = obj || {}
- Use optional chaining for nested property access: obj?.prop`;
  }
  
  // Check for "reduce of empty array with no initial value"
  if (message.includes('reduce') && message.includes('empty array')) {
    return `You're trying to use Array.reduce() on an empty array without providing an initial value.

When using reduce() on an array:
- If the array is empty and no initialValue is provided, this error occurs
- The first element is used as the initial accumulator if no initialValue is provided

How to fix:
- Always provide an initial value as the second argument to reduce():
  array.reduce((accumulator, current) => { ... }, initialValue)
  
- Check if the array is empty before reducing:
  if (array.length > 0) { array.reduce(callback) }
  
- Provide a fallback for empty arrays:
  (array.length ? array.reduce(callback) : defaultValue)`;
  }
  
  // Check for "Cannot create property 'X' on Y" errors
  if (message.includes('Cannot create property')) {
    return `You're trying to add a property to a value that isn't an object or is immutable.

Common causes:
- Adding properties to primitive values (strings, numbers, etc.)
- Modifying frozen objects (Object.freeze())
- Trying to add properties to null or undefined
- Attempting to modify read-only properties

How to fix:
- Make sure you're working with an object, not a primitive
- Check if your value is null/undefined before adding properties
- Create a new object if the original is frozen: newObj = {...oldObj, newProp: value}
- For primitive wrapper objects, create proper objects: new String() vs string primitive`;
  }
  
  // Check for "X is not a constructor" errors
  if (message.includes('is not a constructor')) {
    const match = message.match(/(.+) is not a constructor/);
    const func = match ? match[1] : 'function';
    
    return `You're trying to use 'new ${func}()', but ${func} is not a constructor function.

In JavaScript, you can only use 'new' with:
- Constructor functions (function Person() {})
- Classes (class Person {})
- Built-in objects like Array, Object, Date, etc.

You cannot use 'new' with:
- Regular functions not intended as constructors
- Arrow functions
- Methods
- Primitive wrapper functions called directly (String, Number, Boolean)

How to fix:
- If ${func} is a regular function, call it without 'new': ${func}()
- If you need an instance, use a proper constructor or class
- For built-ins like String, use without new for conversion: String(value)
- If using Date, remember it requires 'new': new Date()`;
  }
  
  // Check for "X.apply is not a function" error (common with bind/call/apply)
  if (message.includes('.apply') || message.includes('.call') || message.includes('.bind')) {
    return `You're trying to use a function method (.call, .apply, or .bind) on something that's not a function.

These methods only exist on function objects:
- func.call(thisArg, ...args) - calls the function with a specified 'this'
- func.apply(thisArg, [args]) - like call, but takes an array of arguments
- func.bind(thisArg, ...args) - creates a new function with bound 'this'

Common causes:
- The variable you're calling these methods on isn't a function
- The function reference is undefined or null
- A method didn't return a function as expected
- Typo in the function name

How to fix:
- Check that your variable is actually a function before using .call/.apply/.bind
- Verify the function exists: typeof func === 'function'
- Make sure you're not accidentally calling the function first: func().bind() vs func.bind()
- Add guards: if (typeof func === 'function') { func.apply(...) }`;
  }
  
  // Generic catch-all for other TypeErrors
  return `A TypeError occurs when a value isn't of the expected type.

Common causes:
- Calling a non-function as if it were a function
- Accessing properties on null or undefined
- Using array methods on non-arrays
- Trying to modify constants or frozen objects
- Passing the wrong type of argument to a function

How to debug:
1. Check the exact values you're working with: console.log(typeof variable, variable)
2. Add checks before operations: if (typeof obj === 'object' && obj !== null)
3. Use safer property access with optional chaining: obj?.prop?.method()
4. Provide fallbacks with the nullish coalescing operator: value ?? defaultValue
5. Add more specific type checks for complex operations`;
}; 