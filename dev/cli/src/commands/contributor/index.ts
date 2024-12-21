import { Command } from 'commander';
import { createMigrationCommand } from './new-migration/index.js';

export const contributorCommand = new Command('contributor')
  .description('Contributor-specific commands')
  .addCommand(createMigrationCommand);
