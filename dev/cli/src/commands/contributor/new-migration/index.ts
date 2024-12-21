import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const createMigrationCommand = new Command('new-migration')
    .description('Create a new migration for API upgrades')
    .action(() => {
        try {
            const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
            const migrationName = `migration-${timestamp}-example-change`;

            const migrationsDir = path.resolve('./migrations');
            const migrationFilePath = path.join(migrationsDir, `${migrationName}.ts`);


            // Get the directory of the current script
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            const templatePath = path.resolve(__dirname, './templates/template.txt'); // Path to the template file

            // Ensure the migrations directory exists
            if (!fs.existsSync(migrationsDir)) {
                fs.mkdirSync(migrationsDir);
            }

            // Check if the template file exists
            if (!fs.existsSync(templatePath)) {
                console.error(
                    chalk.red(
                        `❌ Template file not found at ${templatePath}. Please create a template file before running this command.`
                    )
                );
                process.exit(1);
            }

            // Read the template file
            const templateContent = fs.readFileSync(templatePath, 'utf-8');

            // Write the template content to the new migration file
            fs.writeFileSync(migrationFilePath, templateContent);

            console.log(chalk.green(`✅ Migration created at ${migrationFilePath}`));
        } catch (error) {
            console.error(chalk.red(`❌ Failed to create migration: ${error}`));
        }
    });
