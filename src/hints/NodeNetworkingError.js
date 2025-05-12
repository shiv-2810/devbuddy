/**
 * NodeNetworkingError hint provider
 * Provides hints for common Node.js networking errors
 */

/**
 * Returns a hint for Node.js networking errors
 * @param {Object} parsedError - The parsed error object
 * @returns {string|null} A hint message or null if no hint is available
 */
module.exports = function(parsedError) {
  const { message, code } = parsedError;
  
  // EADDRINUSE (Address already in use)
  if (code === 'EADDRINUSE' || message.includes('EADDRINUSE') || message.includes('address already in use')) {
    // Try to extract the port if possible
    const portMatch = message.match(/port\s*(\d+)/i) || message.match(/:(\d+)/);
    const port = portMatch ? portMatch[1] : 'in use';
    
    return `Port ${port} is already in use.

This EADDRINUSE error happens when you try to start a server on a port that's already being used by another process.

Common causes:
- Another instance of your app is already running
- A different application is using the same port
- The previous instance of your server didn't properly shut down
- If using nodemon or similar tools, they might have zombie processes

How to fix:
1. Choose a different port:
   const server = http.createServer(app).listen(3001);

2. Check what's using the port and close it:
   - On macOS/Linux: sudo lsof -i :${port}
   - On Windows: netstat -ano | findstr :${port}

3. Add code to handle this error gracefully:
   server.on('error', (e) => {
     if (e.code === 'EADDRINUSE') {
       console.log('Port in use, retrying...');
       setTimeout(() => {
         server.close();
         server.listen(PORT);
       }, 1000);
     }
   });

4. Use the '0' port to automatically assign an available port:
   const server = http.createServer(app).listen(0);
   server.on('listening', () => {
     console.log(\`Server started on port \${server.address().port}\`);
   });`;
  }
  
  // ECONNREFUSED (Connection refused)
  if (code === 'ECONNREFUSED' || message.includes('ECONNREFUSED') || message.includes('connection refused')) {
    return `Connection refused: The server is not accepting connections.

This ECONNREFUSED error happens when your application tries to connect to a server that's not running or not accepting connections.

Common causes:
- The server you're trying to connect to isn't running
- You have the wrong host or port number
- A firewall is blocking the connection
- The server is running but not listening on the expected interface
- Network configuration issues

How to fix:
1. Verify the server is running on the expected host and port

2. Check firewall and network settings

3. Add retry logic for transient connection issues:
   const connectWithRetry = (url, options, retries = 5, delay = 1000) => {
     return new Promise((resolve, reject) => {
       const tryConnect = (attemptsLeft) => {
         fetch(url, options)
           .then(resolve)
           .catch(err => {
             if (attemptsLeft === 0 || err.code !== 'ECONNREFUSED') {
               return reject(err);
             }
             setTimeout(() => tryConnect(attemptsLeft - 1), delay);
           });
       };
       tryConnect(retries);
     });
   };

4. For local development, make sure you're using the correct hostname:
   - Use 'localhost' or '127.0.0.1' for local connections
   - Check if the server is bound to a specific interface`;
  }
  
  // ENOTFOUND (DNS lookup failed)
  if (code === 'ENOTFOUND' || message.includes('ENOTFOUND') || message.includes('getaddrinfo')) {
    // Try to extract hostname
    const hostMatch = message.match(/getaddrinfo\s+\w+\s+([^\s]+)/) || 
                     message.match(/ENOTFOUND\s+([^\s]+)/);
    const hostname = hostMatch ? hostMatch[1] : 'hostname';
    
    return `DNS lookup failed for ${hostname}.

This ENOTFOUND error happens when Node.js can't resolve a hostname to an IP address.

Common causes:
- The hostname doesn't exist or is misspelled
- DNS server issues or network connectivity problems
- VPN or proxy configuration problems
- Local hosts file configuration issues
- Temporary DNS propagation delays after domain changes

How to fix:
1. Check the hostname for typos: '${hostname}'

2. Verify your internet connection is working

3. Check if you can resolve other domains:
   const dns = require('dns');
   dns.lookup('google.com', (err, address) => {
     if (err) console.log('DNS resolution failing');
     else console.log('DNS working, google.com resolved to', address);
   });

4. Try using an IP address directly if possible

5. Check your DNS settings and hosts file

6. Add error handling and fallbacks:
   try {
     const response = await fetch('https://${hostname}/api');
   } catch (err) {
     if (err.code === 'ENOTFOUND') {
       // Use backup API endpoint or retry with exponential backoff
     }
   }`;
  }
  
  // ETIMEDOUT (Connection timed out)
  if (code === 'ETIMEDOUT' || message.includes('ETIMEDOUT') || message.includes('timed out')) {
    return `Connection timed out.

This ETIMEDOUT error happens when a network request takes too long to complete.

Common causes:
- The server is slow to respond or overloaded
- Network congestion or high latency
- Firewall or security software intercepting the connection
- The server exists but isn't responding on the specified port
- VPN or proxy issues causing connection delays

How to fix:
1. Increase the timeout duration:
   const options = { 
     timeout: 10000 // 10 seconds
   };
   fetch(url, options);

2. Add retry logic:
   async function fetchWithRetry(url, options, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await fetch(url, options);
       } catch (err) {
         if (i === maxRetries - 1) throw err;
         // Exponential backoff
         await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
       }
     }
   }

3. Check if the server is responsive using other tools:
   - ping hostname
   - curl or wget

4. Implement circuit breakers for failing services`;
  }
  
  // ECONNRESET (Connection reset by peer)
  if (code === 'ECONNRESET' || message.includes('ECONNRESET') || message.includes('connection reset')) {
    return `Connection reset by the server.

This ECONNRESET error happens when the connection is forcibly closed by the server.

Common causes:
- The server crashed or was restarted during your connection
- Server-side timeout closing idle connections
- Network issues or firewalls interrupting the connection
- Overburdened server dropping connections
- Proxy or load balancer issues

How to fix:
1. Add retry logic for transient connection issues:
   function fetchWithRetry(url, options = {}, retries = 3) {
     return fetch(url, options)
       .catch(error => {
         if (error.code === 'ECONNRESET' && retries > 0) {
           return fetchWithRetry(url, options, retries - 1);
         }
         throw error;
       });
   }

2. Implement proper error handling:
   try {
     const response = await fetch(url);
   } catch (err) {
     if (err.code === 'ECONNRESET') {
       console.log('Connection was reset, retrying...');
       // Retry logic here
     }
   }

3. For server applications, ensure proper connection handling:
   - Clean socket closures
   - Proper error event listeners
   - Using keep-alive as appropriate`;
  }
  
  // EPROTO (Protocol error)
  if (code === 'EPROTO' || message.includes('EPROTO') || message.includes('protocol error')) {
    return `Protocol error in network communication.

This EPROTO error typically happens with SSL/TLS connections or when there's a mismatch in protocol versions.

Common causes:
- SSL/TLS handshake failures
- Connecting to a HTTPS server without proper TLS support
- Certificate validation issues
- Using HTTP when HTTPS is required or vice versa
- Attempting websocket connections to non-websocket servers

How to fix:
1. Check if you're using the correct protocol (http:// vs https://):
   const url = 'https://example.com' // not http://example.com

2. For SSL issues, you might need to configure TLS options:
   const https = require('https');
   const options = {
     rejectUnauthorized: false // Note: Use only in development!
   };
   https.get(url, options);

3. Update your Node.js version if using older SSL/TLS versions

4. Verify the server's SSL configuration using external tools:
   - ssllabs.com
   - openssl s_client -connect hostname:443`;
  }
  
  // HTTP specific errors
  if (message.includes('HPE_') || message.includes('Invalid status code') || 
      (code && code.startsWith('ERR_HTTP_'))) {
    return `HTTP protocol error.

This error relates to the HTTP protocol implementation.

Common causes:
- Malformed HTTP requests or responses
- HTTP parsing errors
- Invalid headers or status codes
- HTTP version incompatibilities
- Using HTTP methods incorrectly

How to fix:
1. Check your HTTP request format:
   - Verify headers are properly formatted
   - Ensure URL encoding is correct
   - Check content-length matches body size

2. When sending large payloads, consider:
   - Using streams instead of buffers
   - Chunked transfer encoding
   - Compression (gzip)

3. For custom HTTP implementations:
   - Follow the HTTP specifications
   - Use established libraries when possible
   - Test with a variety of clients and servers`;
  }
  
  // Cannot set headers after they are sent
  if (message.includes('Cannot set headers after they are sent')) {
    return `You're trying to send HTTP headers after they've already been sent to the client.

This common Express/HTTP error happens when you attempt to send multiple responses to a single request.

Common causes:
- Calling res.send(), res.json(), or res.render() multiple times
- Using next() after already sending a response
- Multiple callback executions in asynchronous routes
- Missing return statements after sending responses
- Race conditions in async code

How to fix:
1. Ensure you only send one response per request:
   if (condition) {
     return res.status(400).send('Error');
   }
   // Rest of the code...
   return res.send('Success');

2. Add appropriate return statements:
   if (err) {
     return res.status(500).send('Server Error');
   }
   
3. Use else clauses to make logic explicit:
   if (user) {
     return res.json(user);
   } else {
     return res.status(404).send('User not found');
   }

4. For middleware, be careful with calling next():
   if (shouldContinue) {
     return next();
   }
   return res.send('Response');`;
  }
  
  // Generic networking error
  return `You've encountered a networking error in your Node.js application.

Common network error types:
- ECONNREFUSED: Connection refused (server not running)
- EADDRINUSE: Address already in use (port taken)
- ENOTFOUND: DNS lookup failed (hostname doesn't exist)
- ETIMEDOUT: Connection timed out
- ECONNRESET: Connection reset by peer
- EPROTO: Protocol error

Best practices for network code:
1. Always add proper error handling for network operations
2. Use timeouts to prevent hanging connections:
   const controller = new AbortController();
   const timeoutId = setTimeout(() => controller.abort(), 5000);
   try {
     const response = await fetch(url, { signal: controller.signal });
     clearTimeout(timeoutId);
   } catch (err) {
     // Handle errors
   }

3. Implement retry mechanisms with exponential backoff
4. For servers, handle errors gracefully with proper status codes
5. Log network issues with sufficient context for debugging
6. Consider circuit breakers for failing external services`;
}; 