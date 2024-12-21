#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init/index.js';
import { upgradeCommand } from './commands/upgrade/index.js';
import { displayHelp } from './commands/help/index.js';
import { contributorCommand } from './commands/contributor/index.js';

const program = new Command();

program
  .name('eternal')
  .description('Eternal CLI: Make Your Dependencies Eternal')
  .version('1.0.0')
  .helpOption('-h, --help', 'Display help information about Eternal CLI')
  .on('--help', displayHelp);

// User-facing commands
program.addCommand(initCommand);
program.addCommand(upgradeCommand);
// Contributor-only commands
program.addCommand(contributorCommand);

// Parse CLI arguments
program.parse(process.argv);
