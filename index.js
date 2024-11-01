import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { BANNER, MODEL, COMMANDS } from './src/config.js';
import { toggleVoice, listVoices, selectVoice, getVoiceStatus } from './src/voice.js';
import { checkOllamaServer, generateResponse } from './src/ollama.js';
import { typeText } from './src/display.js';

const spinner = ora({
  text: chalk.cyan('Thinking...'),
  color: 'yellow',
  isEnabled: true,
  stream: process.stdout
});

async function getInput() {
  const { prompt } = await inquirer.prompt([{
    type: 'input',
    name: 'prompt',
    message: chalk.blue('You'),
    prefix: '',
    suffix: '',
    transformer: (input) => input,
    validate: () => true,
    waitUserInput: false
  }]);
  return prompt;
}

function showHelp() {
  process.stdout.write(chalk.cyan('\nAvailable commands:\n'));
  process.stdout.write(chalk.yellow('voice') + chalk.white(': Toggle voice output on/off\n'));
  process.stdout.write(chalk.yellow('voices') + chalk.white(': List available voices\n'));
  process.stdout.write(chalk.yellow('help') + chalk.white(': Show this help message\n'));
  process.stdout.write(chalk.yellow('exit') + chalk.white(': Exit the chat\n\n'));
}

async function chat() {
  console.clear();
  process.stdout.write(BANNER + '\n');
  process.stdout.write(chalk.cyan.bold('🤖 Ollama Terminal Chat\n'));
  process.stdout.write(chalk.green(`Model: ${MODEL}\n`));
  process.stdout.write(chalk.dim('Type "help" to see available commands\n\n'));

  await checkOllamaServer();

  while (true) {
    const prompt = await getInput();
    if (!prompt) continue;

    const promptLower = prompt.toLowerCase();
    
    switch (promptLower) {
      case COMMANDS.exit:
        process.stdout.write(chalk.cyan('\n👋 Thanks for chatting!\n'));
        process.exit(0);
        break;
        
      case COMMANDS.voice:
        toggleVoice();
        if (getVoiceStatus().enabled) {
          await selectVoice();
        }
        continue;
        
      case COMMANDS.voices:
        listVoices();
        continue;
        
      case COMMANDS.help:
        showHelp();
        continue;
        
      default:
        spinner.start();
        try {
          const response = await generateResponse(prompt);
          spinner.stop();
          process.stdout.write('\n');
          process.stdout.write(chalk.yellow('AI: '));
          
          // Pass voice status to typeText for synchronized output
          await typeText(response, getVoiceStatus());
          process.stdout.write('\n\n');
        } catch (error) {
          spinner.stop();
          process.stdout.write(`${chalk.red('\n❌ Error:')} ${error.message}\n`);
        }
    }
  }
}

process.on('SIGINT', () => {
  spinner.stop();
  say.stop(); // Stop any ongoing speech
  process.stdout.write(chalk.cyan('\n👋 Thanks for chatting!\n'));
  process.exit(0);
});

chat();