import say from 'say';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { VOICES } from './config.js';

let currentVoice = 'Alex';
let isVoiceEnabled = false;

export async function selectVoice() {
  const { voice } = await inquirer.prompt([{
    type: 'list',
    name: 'voice',
    message: 'Select a voice:',
    choices: Object.entries(VOICES).map(([name, description]) => ({
      name: `${name} (${description})`,
      value: name
    }))
  }]);
  
  currentVoice = voice;
  process.stdout.write(chalk.green(`\nVoice set to: ${voice}\n`));
}

export function toggleVoice() {
  isVoiceEnabled = !isVoiceEnabled;
  process.stdout.write(chalk.green(`\nVoice output ${isVoiceEnabled ? 'enabled' : 'disabled'}\n`));
  if (isVoiceEnabled) {
    process.stdout.write(chalk.dim(`Current voice: ${currentVoice}\n`));
  }
  return isVoiceEnabled;
}

export function getVoiceStatus() {
  return {
    enabled: isVoiceEnabled,
    currentVoice
  };
}

export function listVoices() {
  process.stdout.write(chalk.cyan('\nAvailable voices:\n'));
  Object.entries(VOICES).forEach(([name, description]) => {
    process.stdout.write(chalk.yellow(`${name}: `) + chalk.white(`${description}\n`));
  });
  process.stdout.write('\n');
}

// This function is no longer needed as speech is handled in typeText
export function speakResponse() {
  return Promise.resolve();
}</content>