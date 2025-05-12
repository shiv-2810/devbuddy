/**
 * Logger for DevBuddy
 * Formats and prints friendly error messages
 */

const chalk = require('chalk');

/**
 * Extracts fix recommendations from a hint string
 * @param {string} hint - The full hint text
 * @returns {string[]} Array of fix recommendations
 */
function extractFixRecommendations(hint) {
  // If hint contains specific fix markers, extract those lines
  if (hint.includes('How to fix:') || hint.includes('HOW TO FIX')) {
    const lines = hint.split('\n');
    const fixSectionIndex = lines.findIndex(line => 
      line.includes('How to fix:') || line.includes('HOW TO FIX')
    );
    
    if (fixSectionIndex > -1) {
      // Get all lines after "How to fix:" until the next section or end
      const fixLines = [];
      for (let i = fixSectionIndex + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        // Stop at empty lines or new sections
        if (line === '' || (line.startsWith('#') && line.endsWith('#'))) {
          break;
        }
        fixLines.push(line);
      }
      
      if (fixLines.length > 0) {
        return fixLines;
      }
    }
  }
  
  // Look for bullet points (list items starting with - or *)
  const bulletPoints = hint.split('\n')
    .filter(line => {
      const trimmed = line.trim();
      return trimmed.startsWith('-') || trimmed.startsWith('*');
    })
    .map(line => line.trim());
  
  if (bulletPoints.length > 0) {
    return bulletPoints;
  }
  
  // Fallback: return default message with entire hint
  return ['Check your code carefully using the suggestions above'];
}

/**
 * Prints a user-friendly error message with hint
 * @param {Object} error - The parsed error object
 * @param {string|null} hint - The hint to display
 */
function printFriendlyError(error, hint) {
  console.log('\n'); // Add some spacing

  // Error header with emoji
  console.log(chalk.bgRed.white.bold(` 🚨 ERROR: ${error.type} `));
  console.log(chalk.red.bold(`➤ ${error.message}`));
  
  // Display hint if available
  if (hint) {
    console.log('\n' + chalk.bgGreen.black.bold(' 💡 WHY THIS HAPPENS '));
    const hintLines = hint.split('\n');
    hintLines.forEach(line => {
      console.log(chalk.green(`  ${line}`));
    });
    
    console.log('\n' + chalk.bgBlue.white.bold(' 🔧 HOW TO FIX IT '));
    
    // Extract fix recommendations
    const fixRecommendations = extractFixRecommendations(hint);
    fixRecommendations.forEach(line => {
      console.log(chalk.blue(`  ${line}`));
    });
  } else {
    console.log('\n' + chalk.yellow('⚠️  DevBuddy doesn\'t have a specific suggestion for this error yet.'));
    console.log(chalk.yellow('   This might be a complex or uncommon error pattern.'));
  }
  
  // Show a simplified stack trace
  console.log('\n' + chalk.bgYellow.black.bold(' 📍 WHERE TO LOOK '));
  
  const stackLines = (error.stack || '').split('\n');
  // Skip the first line as it contains the error message we already displayed
  const relevantStackLines = stackLines.slice(1, 4); // Show only 3 lines of stack
  
  if (relevantStackLines.length > 0) {
    relevantStackLines.forEach(line => {
      // Clean up the line and highlight file paths
      const cleanedLine = line.trim().replace(/^\s*at\s+/, '');
      // Highlight file paths
      const enhancedLine = cleanedLine.replace(/\((.+:\d+:\d+)\)/, (match, path) => {
        return `(${chalk.yellow(path)})`;
      });
      console.log(chalk.dim('  → ') + enhancedLine);
    });
    
    if (stackLines.length > 4) {
      console.log(chalk.dim(`  ... (${stackLines.length - 4} more stack frames)`));
    }
  }
  
  console.log('\n'); // Add some spacing
}

module.exports = { printFriendlyError }; 