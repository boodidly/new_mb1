import chalk from 'chalk';

export const OLLAMA_API = 'http://localhost:11434/api';
export const MODEL = 'llama3.2:1b';

export const VOICES = {
  'Alex': 'Default male voice',
  'Samantha': 'Default female voice',
  'Daniel': 'British male voice',
  'Karen': 'Australian female voice',
  'Moira': 'Irish female voice'
};

export const BANNER = `
${chalk.white('═══╗')}  ${chalk.red('▓▓▓')}  ${chalk.white('╔═══')}
${chalk.red('░░░║')}  ${chalk.white('|||')}  ${chalk.red('║░░░')}
${chalk.white('───╢')} ${chalk.red('▒▒▒▒▒')} ${chalk.white('╟───')}
${chalk.red('▒▒▒▒')}${chalk.white('┃')}${chalk.red('░░░░░')}${chalk.white('┃')}${chalk.red('▒▒▒▒')}
${chalk.white('╾──╼')}${chalk.red('┇')}${chalk.white('═════')}${chalk.red('┇')}${chalk.white('╾──╼')}
${chalk.red('▓▓')}${chalk.white('╾───┨')}${chalk.red('▓▓▓')}${chalk.white('╟───╼')}${chalk.red('▓▓')}
${chalk.white('══╾')}${chalk.red('░░░')}${chalk.white('┃')}${chalk.red('███')}${chalk.white('┃')}${chalk.red('░░░')}${chalk.white('╼══')}
${chalk.red('▒▒')}${chalk.white('╾───┨')}${chalk.red('▓▓▓')}${chalk.white('╟───╼')}${chalk.red('▒▒')}
${chalk.white('───')}${chalk.red('┇')}${chalk.white('═════')}${chalk.red('┇')}${chalk.white('───')}`;

export const COMMANDS = {
  exit: 'exit',
  voice: 'voice',
  voices: 'voices',
  help: 'help'
};