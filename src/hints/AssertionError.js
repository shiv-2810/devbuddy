/**
 * AssertionError hint provider
 * Provides hints for Node's assert module errors
 */

/**
 * Returns a hint for AssertionError
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message, originalError } = parsedError;
  
  // Deep equality failure
  if (message.includes('deepEqual') || message.includes('deepStrictEqual')) {
    return `Your assertion is failing because two objects aren't deeply equal.
The assert.deepEqual() or assert.deepStrictEqual() comparison found differences between the actual and expected values.

Common issues:
- Object properties are in different orders (doesn't matter for deepEqual)
- Property values have different types (matters for deepStrictEqual)
- Objects contain different properties
- Arrays have different elements or order
- You're comparing different data structures

How to debug:
1. Check the 'actual' and 'expected' values in the error message
2. Look for subtle differences like strings vs numbers ('1' vs 1)
3. Check for extra or missing properties
4. Remember that deepStrictEqual is type-sensitive (use deepEqual for type-converting comparison)
5. Consider using console.log() to output both values before comparison`;
  }
  
  // Strict equality failure
  if (message.includes('strictEqual') || message.includes('===')) {
    return `Your assertion is failing because two values aren't strictly equal (===).
The assert.strictEqual() comparison found that actual !== expected.

Common issues:
- Different types (e.g., number vs string, like 1 vs '1')
- Different object references (even with same content)
- Different primitive values
- Undefined or null values when not expected

How to debug:
1. Check the exact types using typeof or instanceof
2. For objects, remember they're compared by reference not value
3. Use assert.deepStrictEqual() for comparing object contents
4. Check for undefined/null values with console.log()`;
  }
  
  // Regular equality failure
  if (message.includes('equal') || message.includes('==')) {
    return `Your assertion is failing because two values aren't equal.
The assert.equal() comparison found that actual != expected.

How to debug:
1. Check the 'actual' and 'expected' values in the error message
2. Remember that == allows type coercion, so '1' == 1 is true, but maybe something else is different
3. For object comparisons, equal checks references not contents (use deepEqual instead)
4. Use console.log() to inspect both values before the assertion
5. Check for whitespace or invisible characters in strings`;
  }
  
  // Check for common assertion types
  if (message.includes('fail')) {
    return `Your code explicitly called assert.fail().
This is usually used to:
- Mark a test as deliberately failing
- Indicate a code path that shouldn't be reached
- Force a failure when a custom condition isn't met

Check your test logic to see why assert.fail() was called.`;
  }
  
  if (message.includes('ok') || message.includes('ifError')) {
    return `Your assertion expected a truthy value but got a falsy one.
The assert.ok() function expects its argument to be truthy (true, non-zero, non-empty, etc.).

Common causes:
- The condition evaluated to false, 0, '', null, undefined, or NaN
- A function returned an unexpected falsy value
- A variable doesn't contain the value you expected

How to debug:
1. Add console.log() before the assertion to see the exact value
2. Check if a function is returning what you expect
3. Verify object properties exist before using them`;
  }
  
  // Generic assertion error handling
  return `An AssertionError from Node's assert module indicates that an assertion failed.
This happens when the code's reality doesn't match your expectations.

Common assertion types:
- assert(value) or assert.ok(value): Fails if value is falsy
- assert.equal(actual, expected): Fails if actual != expected (loose equality)
- assert.strictEqual(actual, expected): Fails if actual !== expected (strict equality)
- assert.deepEqual(actual, expected): Fails if objects aren't similar in content
- assert.deepStrictEqual(actual, expected): Fails if objects differ in content or types

How to debug:
1. Check the expected vs actual values in the error message
2. Add console.log() statements to inspect variables
3. Check if you're using the right assertion type for your comparison
4. Make sure you understand the difference between equality comparisons
5. Look for subtle type differences (strings vs numbers, etc.)

Assert is useful for:
- Enforcing preconditions in functions
- Validating program state
- Testing with frameworks like Mocha or Jest`;
}; 