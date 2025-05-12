/**
 * ModuleNotFoundError hint provider
 * Provides hints for module not found errors
 */

/**
 * Returns a hint for ModuleNotFoundError
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message } = parsedError;
  
  // Extract the module name from the error message
  let moduleName = '';
  if (message.includes('Cannot find module')) {
    // Extract module name from quotes if present
    const moduleMatch = message.match(/Cannot find module ['"]([^'"]+)['"]/);
    if (moduleMatch && moduleMatch[1]) {
      moduleName = moduleMatch[1];
    }
  }
  
  // Handle relative path imports
  if (moduleName && (moduleName.startsWith('./') || moduleName.startsWith('../'))) {
    return `Node.js can't find the file at path: ${moduleName}

Common issues with local files:
- The file doesn't exist at that location
- There's a typo in the file path
- You used the wrong relative path (./file vs ../file)
- You forgot to add the file extension (required for .js files in ESM)
- You're working in a different directory than you think

How to fix:
- Double-check the file exists at that path
- Use correct relative paths: 
  - './file' for files in same directory
  - '../file' for files in parent directory
- In ESM modules, add explicit file extensions (.js)
- Check your current working directory with process.cwd()`;
  }
  
  // Handle npm packages
  if (moduleName && !moduleName.startsWith('/') && !moduleName.startsWith('.')) {
    return `Node.js can't find the npm package: ${moduleName}

Common issues with npm packages:
- The package isn't installed in your project
- There's a typo in the package name
- You're using a sub-module that doesn't exist
- Your node_modules is corrupted or missing
- You're using a global package without installing it locally

How to fix:
- Install the package: npm install ${moduleName}
- Check package.json to verify the exact name and version
- Run npm install to reinstall all dependencies
- Check for typos in the import/require statement
- Make sure you're importing a valid entry point from the package`;
  }
  
  // Handle Node.js built-in modules
  if (moduleName && ['fs', 'path', 'http', 'crypto', 'os', 'url'].includes(moduleName)) {
    return `Node.js can't find the built-in module: ${moduleName}

This is unusual because '${moduleName}' is a built-in Node.js module.

Possible issues:
- You might be running in a restricted environment (like a browser)
- You might have a local file overriding the built-in module name
- There could be a configuration issue with your Node.js installation
- You might be using import syntax for CJS modules or vice versa

How to fix:
- Make sure you're running in a Node.js environment, not a browser
- Try using the correct import method for your module system:
  - CommonJS: const ${moduleName} = require('${moduleName}')
  - ESM: import * as ${moduleName} from '${moduleName}'
- Check for local files with the same name as the module`;
  }
  
  // Caught ESM vs CommonJS issues
  if (message.includes('ES Module')) {
    return `You have an error related to ES Modules vs CommonJS modules.

Node.js handles two different module systems:
- CommonJS (older): uses require() and module.exports
- ES Modules (newer): uses import and export statements

Common issues:
- Trying to require() an ES Module
- Missing file extensions in import statements (required in ESM)
- Mixing import and require in incompatible ways
- Missing "type": "module" in package.json for ESM

How to fix:
- If using ESM, add "type": "module" to package.json
- Use correct file extensions in imports (.js, .mjs)
- For CommonJS files in an ESM project, use .cjs extension
- ESM can import CJS using import syntax, but CJS cannot require() ESM directly`;
  }
  
  // Generic catch-all
  return `Node.js couldn't find a module you tried to import or require.

This typically happens when:
- The module name is misspelled
- The package is not installed (npm install it first)
- You're using the wrong path for a local file
- The file doesn't exist where you think it does
- You're mixing ES Modules and CommonJS incorrectly
- You've forgotten to create or save the file you're importing

How to fix:
1. For npm packages:
   - Run: npm install package-name
   - Check package.json for correct dependencies
   - Run: npm install to install all dependencies

2. For local files:
   - Check file paths carefully
   - Use './filename' for files in the current directory
   - Use '../filename' for files in the parent directory
   - In ES Modules, include file extensions (.js)

3. Check your current directory with:
   console.log(process.cwd())

4. For module system issues:
   - Check if you need "type": "module" in package.json
   - Use correct import/require syntax for your module system`;
}; 