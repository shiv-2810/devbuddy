/**
 * Tests for the DevBuddy hint engine
 */

const { getHint } = require('../src/hintEngine');
const { parseError } = require('../src/errorParser');

describe('HintEngine', () => {
  describe('ReferenceError hints', () => {
    test('should provide hint for "is not defined" errors', () => {
      // Create a ReferenceError and parse it
      const error = new ReferenceError('myVariable is not defined');
      const parsedError = parseError(error);
      
      // Get hint and check that it contains expected guidance
      const hint = getHint(parsedError);
      expect(hint).toContain('myVariable');
      expect(hint).toContain('doesn\'t exist');
    });
    
    test('should provide hint for "before initialization" errors', () => {
      const error = new ReferenceError('Cannot access variable before initialization');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('before it\'s been initialized');
      expect(hint).toContain('temporal dead zone');
    });
    
    test('should provide hint for assignment errors', () => {
      const error = new ReferenceError('Invalid left-hand side assignment');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('assign a value to something that can\'t be assigned');
    });
  });
  
  describe('TypeError hints', () => {
    test('should provide hint for "is not a function" errors', () => {
      const error = new TypeError('obj.method is not a function');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('isn\'t a function');
    });
    
    test('should provide hint for "Cannot read property" errors', () => {
      const error = new TypeError('Cannot read properties of undefined (reading \'name\')');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('undefined');
      expect(hint).toContain('optional chaining');
    });
    
    test('should provide hint for "Assignment to constant" errors', () => {
      const error = new TypeError('Assignment to constant variable');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('reassign a variable that was declared with \'const\'');
    });
    
    test('should provide hint for "is not iterable" errors', () => {
      const error = new TypeError('number is not iterable');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('iterate over');
      expect(hint).toContain('isn\'t an iterable object');
    });
    
    test('should provide hint for "reduce of empty array" errors', () => {
      const error = new TypeError('Reduce of empty array with no initial value');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('reduce()');
      expect(hint).toContain('empty array');
      expect(hint).toContain('initial value');
    });
  });
  
  describe('SyntaxError hints', () => {
    test('should provide hint for "Unexpected token" errors', () => {
      const error = new SyntaxError('Unexpected token }');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('syntax error');
      expect(hint).toContain('brackets');
    });
    
    test('should provide hint for "Unexpected end of" errors', () => {
      const error = new SyntaxError('Unexpected end of input');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('incomplete');
      expect(hint).toContain('unclosed');
    });
    
    test('should provide hint for "Missing initializer" errors', () => {
      const error = new SyntaxError('Missing initializer in const declaration');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('const');
      expect(hint).toContain('without initializing');
    });
  });
  
  describe('RangeError hints', () => {
    test('should provide hint for "Maximum call stack size exceeded" errors', () => {
      const error = new RangeError('Maximum call stack size exceeded');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('infinite recursion');
      expect(hint).toContain('exit condition');
    });
    
    test('should provide hint for "Invalid array length" errors', () => {
      const error = new RangeError('Invalid array length');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('array with an invalid length');
      expect(hint).toContain('positive integer');
    });
    
    test('should provide hint for precision errors', () => {
      const error = new RangeError('toFixed() digits argument must be between 0 and 100');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('precision');
      expect(hint).toContain('toFixed');
    });
  });
  
  describe('URIError hints', () => {
    test('should provide hint for URI decoding errors', () => {
      const error = new URIError('URI malformed');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('URI');
      expect(hint).toContain('decodeURI');
    });
  });
  
  describe('EvalError hints', () => {
    test('should provide hint for eval errors', () => {
      const error = new EvalError('Eval is dangerous');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('eval()');
      expect(hint).toContain('dangerous');
    });
  });
  
  describe('AggregateError hints', () => {
    test('should provide hint for Promise.any errors', () => {
      // Mock an AggregateError if not available in test environment
      const AggregateErrorConstructor = global.AggregateError || function(errors, message) {
        const error = new Error(message);
        error.name = 'AggregateError';
        error.errors = errors;
        return error;
      };
      
      const error = new AggregateErrorConstructor([new Error('fail1'), new Error('fail2')], 'All promises were rejected');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('Promise.any()');
      expect(hint).toContain('promises were rejected');
    });
  });
  
  describe('UnhandledPromiseRejection hints', () => {
    test('should provide hint for unhandled promise rejections', () => {
      const error = new Error('UnhandledPromiseRejectionWarning: Unhandled promise rejection');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('unhandled Promise rejection');
      expect(hint).toContain('catch');
    });
  });
  
  describe('AssertionError hints', () => {
    // Mock an AssertionError
    test('should provide hint for assertion errors', () => {
      const error = new Error('AssertionError [ERR_ASSERTION]: Expected values to be strictly equal');
      error.name = 'AssertionError';
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('assertion');
      expect(hint).toContain('failed');
    });
  });
  
  describe('ModuleNotFoundError hints', () => {
    test('should provide hint for missing modules', () => {
      const error = new Error('Cannot find module \'non-existent-module\'');
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('module');
      expect(hint).toContain('find');
    });
  });
  
  describe('FileSystemError hints', () => {
    test('should provide hint for ENOENT errors', () => {
      const error = new Error('ENOENT: no such file or directory, open \'/path/to/missing/file.txt\'');
      error.code = 'ENOENT';
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('file or directory');
      expect(hint).toContain('doesn\'t exist');
    });
  });
  
  describe('NodeNetworkingError hints', () => {
    test('should provide hint for EADDRINUSE errors', () => {
      const error = new Error('EADDRINUSE: address already in use :::8080');
      error.code = 'EADDRINUSE';
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('Port');
      expect(hint).toContain('already in use');
    });
    
    test('should provide hint for ECONNREFUSED errors', () => {
      const error = new Error('ECONNREFUSED: Connection refused');
      error.code = 'ECONNREFUSED';
      const parsedError = parseError(error);
      
      const hint = getHint(parsedError);
      expect(hint).toContain('Connection refused');
      expect(hint).toContain('not accepting connections');
    });
  });
  
  describe('Unknown errors', () => {
    test('should return null for unknown error types', () => {
      const error = { name: 'CustomError', message: 'Something went wrong' };
      const parsedError = parseError(error);
      
      // Since we now have dynamic loading, this should return a generic hint
      const hint = getHint(parsedError);
      expect(hint).not.toBeNull();
    });
  });
}); 