import { stdout } from 'process';
import chalk from 'chalk';
import say from 'say';

const TYPING_SPEED = {
  min: 30,  // Increased for better sync with speech
  max: 50   // Increased for better sync with speech
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function typeText(text, voice = null) {
  // Split text into sentences for better sync
  const sentences = text.split(/([.!?]+\s+)/);
  let currentLine = '';
  const terminalWidth = stdout.columns || 80;
  
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const words = sentence.split(' ');
    
    // Start speaking the sentence
    if (voice) {
      say.speak(sentence, voice.currentVoice, 1.0);
    }
    
    for (const word of words) {
      // Check if adding the next word would exceed terminal width
      if ((currentLine + word).length > terminalWidth - 5) {
        stdout.write(chalk.white(currentLine) + '\n');
        currentLine = '';
        await sleep(TYPING_SPEED.max);
      }
      
      // Type each character in the word
      for (const char of word) {
        currentLine += char;
        stdout.write(chalk.white(char));
        await sleep(Math.random() * (TYPING_SPEED.max - TYPING_SPEED.min) + TYPING_SPEED.min);
      }
      
      // Add space between words
      if (words.indexOf(word) < words.length - 1) {
        currentLine += ' ';
        stdout.write(' ');
        await sleep(TYPING_SPEED.min);
      }
    }
    
    // Wait for a bit longer at the end of sentences
    if (sentence.match(/[.!?]+\s+$/)) {
      await sleep(TYPING_SPEED.max * 2);
    }
  }
  
  // Write any remaining text
  if (currentLine) {
    stdout.write(chalk.white(currentLine));
  }
  
  // Return a promise that resolves when speech is done
  return new Promise((resolve) => {
    if (voice?.enabled) {
      say.stop();
      resolve();
    } else {
      resolve();
    }
  });
}</content>