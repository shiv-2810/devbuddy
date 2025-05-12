/**
 * FileSystemError hint provider
 * Provides hints for common Node.js filesystem errors
 */

/**
 * Returns a hint for a FileSystemError
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message, code } = parsedError;
  
  // ENOENT (No such file or directory)
  if (code === 'ENOENT' || message.includes('ENOENT') || message.includes('no such file or directory')) {
    // Try to extract the file path
    const pathMatch = message.match(/'([^']+)'/);
    const filePath = pathMatch ? pathMatch[1] : 'file or directory';
    
    return `Node.js can't find the file or directory: ${filePath}

This ENOENT error happens when you try to access a file or directory that doesn't exist.

Common causes:
- The file has been deleted or moved
- There's a typo in the file path
- You're using a relative path that's resolved from the wrong location
- You haven't created the file or directory yet
- Working with a path that was valid on a different machine

How to fix:
1. Check if the file/directory exists:
   const fs = require('fs');
   if (fs.existsSync('${filePath}')) { ... }

2. For relative paths, check your current working directory:
   console.log('Current directory:', process.cwd());

3. Use path.join() to safely create paths:
   const path = require('path');
   const filePath = path.join(__dirname, 'relative/path');

4. Create directories first if needed:
   const fs = require('fs');
   fs.mkdirSync(dirPath, { recursive: true });`;
  }
  
  // EACCES (Permission denied)
  if (code === 'EACCES' || message.includes('EACCES') || message.includes('permission denied')) {
    return `You don't have permission to access the file or directory.

This EACCES error happens when Node.js can't read, write, or execute a file/directory due to file system permissions.

Common causes:
- The file is owned by another user
- The file has restrictive permissions set
- You're trying to access a protected system directory
- The file is in use by another process (and locked)
- You're running the script as a user without sufficient privileges

How to fix:
1. Change the file permissions:
   - On Unix/Linux/Mac: chmod 644 filename or chmod 755 dirname
   - On Windows: Right-click → Properties → Security tab

2. Run your program with elevated privileges (not recommended for production):
   - On Unix/Linux/Mac: sudo node yourscript.js
   - On Windows: Run as Administrator

3. Use a different file location that your user has access to

4. Check if the file is locked by another process`;
  }
  
  // EEXIST (File exists)
  if (code === 'EEXIST' || message.includes('EEXIST') || message.includes('file already exists')) {
    return `The file or directory already exists.

This EEXIST error happens when you try to create a file/directory that already exists.

Common causes:
- Using fs.mkdir() without the recursive option for existing directories
- Using fs.writeFile() with { flag: 'wx' } on an existing file
- Trying to rename/move a file to a destination that exists
- Creating a file with exclusive access mode

How to fix:
1. Check if the file/directory exists before creating it:
   if (!fs.existsSync(path)) {
     fs.mkdirSync(path);
   }

2. Use recursive option for directories:
   fs.mkdirSync(path, { recursive: true });

3. Override existing files with appropriate flags:
   fs.writeFileSync(path, data, { flag: 'w' });

4. Delete or rename the existing file first if you need to replace it`;
  }
  
  // EBUSY (Resource busy or locked)
  if (code === 'EBUSY' || message.includes('EBUSY') || message.includes('resource busy')) {
    return `The file or directory is busy or locked.

This EBUSY error happens when a file/directory can't be accessed because it's being used by another process.

Common causes:
- Trying to delete a file that's open in another program
- Attempting to access a file that's locked for exclusive use
- Modifying a file while it's being read elsewhere
- Working with system files that are in use

How to fix:
1. Close any other programs that might be using the file

2. Use graceful error handling and retry logic:
   try {
     fs.unlinkSync(filePath);
   } catch (err) {
     if (err.code === 'EBUSY') {
       // Wait and retry or use alternative approach
     }
   }

3. For database files or logs, ensure proper connection closing

4. Use fs.open() with appropriate flags for shared access`;
  }
  
  // EISDIR (Is a directory)
  if (code === 'EISDIR' || message.includes('EISDIR') || message.includes('is a directory')) {
    return `You're trying to perform a file operation on a directory.

This EISDIR error happens when you use a file operation (like read/write) on a directory.

Common causes:
- Using fs.readFile() or fs.writeFile() on a directory path
- Trying to open a directory with fs.openSync()
- Using the wrong path that points to a directory instead of a file
- Forgetting to append a filename to a directory path

How to fix:
1. Check if the path is a directory before file operations:
   const stats = fs.statSync(path);
   if (stats.isDirectory()) {
     // Handle directory case
   } else {
     // Perform file operation
   }

2. For reading directories, use the appropriate methods:
   const files = fs.readdirSync(dirPath);

3. Make sure to include the filename when working with files:
   const filePath = path.join(dirPath, 'filename.txt');`;
  }
  
  // ENOTDIR (Not a directory)
  if (code === 'ENOTDIR' || message.includes('ENOTDIR') || message.includes('not a directory')) {
    return `You're trying to perform a directory operation on a file.

This ENOTDIR error happens when you use a directory operation on a file path.

Common causes:
- Using fs.readdir() on a file path
- Using path.join() with a file instead of a directory
- Having a typo in a directory path that points to a file
- Using path.dirname() incorrectly

How to fix:
1. Check if the path is a directory before directory operations:
   const stats = fs.statSync(path);
   if (stats.isFile()) {
     // Handle file case
   } else {
     // Perform directory operation
   }

2. Make sure you're using directory paths for directory operations:
   const dirPath = path.dirname(filePath);
   const files = fs.readdirSync(dirPath);

3. Use path.dirname() to get the directory portion of a path:
   const dir = path.dirname('/path/to/file.txt'); // returns '/path/to'`;
  }
  
  // EMFILE (Too many open files) or ENFILE (File table overflow)
  if (code === 'EMFILE' || code === 'ENFILE' || 
      message.includes('EMFILE') || message.includes('ENFILE') || 
      message.includes('too many open files')) {
    return `You've reached the system limit for open files.

This error happens when your program has too many files open simultaneously.

Common causes:
- Not closing file handles after opening files
- Opening many files in a loop without closing them
- Memory leaks in file handling code
- Asynchronous operations opening files without limits
- System limits set too low for your application

How to fix:
1. Always close files after using them:
   const fd = fs.openSync(path, 'r');
   try {
     // use the file
   } finally {
     fs.closeSync(fd);
   }

2. Use 'with' pattern with promises:
   await fs.promises.open(path, 'r').then(async (fd) => {
     try {
       // use the file
     } finally {
       await fd.close();
     }
   });

3. Limit concurrent file operations:
   - Use a queue to process files in batches
   - Implement a semaphore for limiting parallel operations

4. For system-wide issues, increase ulimit on Linux/Mac:
   ulimit -n 4096`;
  }
  
  // Generic filesystem error catch-all
  return `You've encountered a file system error in your Node.js application.

Common file system errors include:
- ENOENT: No such file or directory
- EACCES: Permission denied
- EEXIST: File already exists
- EISDIR: Is a directory when a file was expected
- ENOTDIR: Not a directory when a directory was expected
- EBUSY: Resource busy or locked
- EMFILE/ENFILE: Too many open files

Best practices for file handling:
1. Always check if files/directories exist before operating on them
2. Use try/catch blocks around file operations
3. Close file handles when you're done with them
4. Use the 'path' module to safely construct file paths
5. Consider using promises or async/await for file operations:
   const fs = require('fs').promises;
   try {
     const data = await fs.readFile(path);
   } catch (err) {
     console.error('Error:', err.code);
   }

6. For larger files, use streams instead of reading entire files
7. Always handle errors with specific code checks`;
}; 