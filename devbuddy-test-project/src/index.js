/**
 * DevBuddy Test Project - Main Entry Point
 * 
 * This file provides a menu-driven interface to run different error examples
 * and see how DevBuddy handles them.
 */

// Initialize DevBuddy at the top of the file
require('devbuddy').init();

const readline = require('readline');
const { execSync } = require('child_process');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Welcome message and menu
console.log('\n');
console.log('🤖 Welcome to the DevBuddy Test Project!');
console.log('=======================================');
console.log('\nThis project demonstrates how DevBuddy intercepts and explains different JavaScript errors.');
console.log('\nChoose an error type to test:\n');

const errorOptions = [
  { id: '1', name: 'Reference Error', script: 'test:reference' },
  { id: '2', name: 'Type Error', script: 'test:type' },
  { id: '3', name: 'Range Error', script: 'test:range' },
  { id: '4', name: 'File System Error', script: 'test:fs' },
  { id: '5', name: 'Network Error', script: 'test:network' },
  { id: '6', name: 'Promise Rejection Error', script: 'test:promise' },
  { id: 'q', name: 'Quit', script: null }
];

// Display menu options
errorOptions.forEach(option => {
  console.log(`${option.id}. ${option.name}`);
});

// Handle user input
function promptUser() {
  rl.question('\nEnter your choice (1-6, or q to quit): ', (answer) => {
    const selectedOption = errorOptions.find(option => option.id === answer);
    
    if (!selectedOption) {
      console.log('Invalid option. Please try again.');
      return promptUser();
    }
    
    if (selectedOption.id === 'q') {
      console.log('Thanks for testing DevBuddy! Goodbye.');
      rl.close();
      return;
    }
    
    console.log(`\nRunning ${selectedOption.name} example...\n`);
    
    try {
      // Clear the terminal
      console.log('\x1Bc');
      
      // Run the selected script
      execSync(`npm run ${selectedOption.script}`, { stdio: 'inherit' });
    } catch (error) {
      // The error will be handled by DevBuddy
    }
    
    setTimeout(() => {
      console.log('\n\nPress Enter to return to the menu...');
      rl.once('line', () => {
        // Clear the terminal
        console.log('\x1Bc');
        
        // Display menu again
        console.log('\n');
        console.log('🤖 Welcome to the DevBuddy Test Project!');
        console.log('=======================================');
        console.log('\nThis project demonstrates how DevBuddy intercepts and explains different JavaScript errors.');
        console.log('\nChoose an error type to test:\n');
        
        errorOptions.forEach(option => {
          console.log(`${option.id}. ${option.name}`);
        });
        
        promptUser();
      });
    }, 1000);
  });
}

// Start the application
promptUser(); 