import chalk from 'chalk';

export const displayHelp = () => {
  console.log('');
  console.log(chalk.greenBright.bold('Make Your Dependencies Eternal'));
  console.log('');
  console.log(chalk.yellowBright.bold('Examples:'));
  console.log(chalk.cyanBright('  npx @eternal-js/cli init'));
  console.log('    Initialize Eternal in your project.');
  console.log('');
  console.log(chalk.cyanBright('  npx @eternal-js/cli upgrade'));
  console.log('    Upgrade your adapters to the latest versions.');
  console.log('');
  console.log(chalk.yellowBright.bold('Documentation:'));
  console.log('  Visit https://eternaljs.com/docs for full CLI usage and examples.');
};
