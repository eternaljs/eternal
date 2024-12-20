import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import { execSync } from 'child_process';

export const initCommand = new Command('init')
  .description('Initialize Eternal in your project')
  .action(async () => {
    // Step 1: Display Welcome Banner
    console.log(chalk.blackBright.bold(`

      ███████╗████████╗███████╗██████╗ ███╗   ██╗ █████╗ ██╗     
      ██╔════╝╚══██╔══╝██╔════╝██╔══██╗████╗  ██║██╔══██╗██║     
      █████╗     ██║   █████╗  ██████╔╝██╔██╗ ██║███████║██║     
      ██╔══╝     ██║   ██╔══╝  ██╔══██╗██║╚██╗██║██╔══██║██║     
      ███████╗   ██║   ███████╗██║  ██║██║ ╚████║██║  ██║███████╗
      ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝                                         
      
`));
    console.log(chalk.greenBright.bold('Welcome to Eternal CLI! Let’s make your dependencies eternal.'));
    console.log('');

    // Step 2: Check for package.json in the root folder
    const packageJsonPath = path.resolve('./package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.error(chalk.red('❌ Error: No package.json found in the current directory.'));
      console.error(chalk.yellow('Please run this command in the root of your project.'));
      return;
    }

    // Step 3: Ask user questions
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'environment',
        message: chalk.yellow('🌍 What environment is your project targeting?'),
        choices: [
          { name: 'Node.js (Server-side)', value: 'node' },
          { name: 'Browser (Client-side)', value: 'browser' },
          { name: 'Both (Universal)', value: 'both' },
        ],
      },
      {
        type: 'list',
        name: 'fileType',
        message: chalk.yellow('📂 Do you want the Eternal file in TypeScript or JavaScript?'),
        choices: [
          { name: 'TypeScript (.ts)', value: 'ts' },
          { name: 'JavaScript (.js)', value: 'js' },
        ],
      },
      {
        type: 'input',
        name: 'outputPath',
        message: chalk.yellow('📁 Where should we save the Eternal file?'),
        default: (answers) =>
          answers.fileType === 'ts' ? './src/eternal.ts' : './eternal.js',
      },
    ]);

    // Step 4: Simulate Template Processing
    const spinner = ora(chalk.blue('Generating your Eternal file...')).start();
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading

    // Step 5: Load and Modify Template
    const templatePath = path.resolve(`./templates/init-${answers.environment}.txt`);
    if (!fs.existsSync(templatePath)) {
      spinner.fail(chalk.red('Template file not found.'));
      return;
    }

    let template = fs.readFileSync(templatePath, 'utf-8');
    template = template.replace('{{ENVIRONMENT}}', answers.environment);

    // Step 6: Save the Modified Template
    const outputPath = path.resolve(answers.outputPath);
    fs.writeFileSync(outputPath, template);

    spinner.succeed(chalk.greenBright('Eternal file generated successfully!'));

    // Step 7: Install @eternal-js/core
    console.log(chalk.blue('Installing @eternal-js/core...'));
    try {
      execSync('npm install @eternal-js/core@latest', { stdio: 'inherit' });
      console.log(chalk.greenBright('✅ @eternal-js/core installed successfully!'));
    } catch (err) {
      console.error(chalk.red('❌ Failed to install @eternal-js/core.'));
      console.error(err instanceof Error ? err.message : 'Unknown error occurred.');
    }

    // Step 8: Display Success Message
    console.log(chalk.greenBright.bold(`
      🎉 ${chalk.whiteBright('Congratulations! Eternal has been successfully initialized.')}

      Your Eternal file has been saved at:
      ${chalk.blueBright(outputPath)}

      What’s next?
      👉 Open ${chalk.yellowBright(outputPath)} to customize it according to your project’s needs.
      👉 Read the inline comments in the file for guidance on configuration.
      👉 Explore the full documentation: ${chalk.cyanBright('https://eternaljs.com/docs')}
      `));
  });
