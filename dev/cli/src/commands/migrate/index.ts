import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

const MIGRATION_DIR = path.resolve('./migrations');
const MIGRATION_REGISTRY = path.resolve(MIGRATION_DIR, 'migration.json');

const readMigrationJson = async () => {
  try {
    const data = await fs.readFile(MIGRATION_REGISTRY, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return { lastApplied: null, migrations: [] }; // Default structure if no migration.json exists
  }
};

const writeMigrationJson = async (data: any) => {
  await fs.writeFile(MIGRATION_REGISTRY, JSON.stringify(data, null, 2));
};

const loadMigration = async (migrationFile: string) => {
  const migrationPath = path.resolve(MIGRATION_DIR, `${migrationFile}.ts`);
  try {
    return await import(migrationPath);
  } catch (err) {
    throw new Error(`Failed to load migration: ${migrationFile}`);
  }
};

const applyMigration = async (migrationFile: string, sourceCode: string): Promise<string> => {
  const migration = await loadMigration(migrationFile);
  if (typeof migration.migrate !== 'function') {
    throw new Error(`Migration file ${migrationFile} does not export a 'migrate' function`);
  }
  return migration.migrate(sourceCode);
};

export const runMigrations = async () => {
  const spinner = ora('Checking for unapplied migrations...').start();
  const migrationJson = await readMigrationJson();
  const { lastApplied, migrations } = migrationJson;

  const unappliedMigrations = lastApplied
    ? migrations.slice(migrations.indexOf(lastApplied) + 1)
    : migrations;

  if (unappliedMigrations.length === 0) {
    spinner.succeed('🎉 All migrations are up-to-date.');
    return;
  }

  spinner.text = 'Applying migrations...';
  let sourceCode = await fs.readFile('./eternal.ts', 'utf-8');
  for (const migration of unappliedMigrations) {
    try {
      sourceCode = await applyMigration(migration, sourceCode);
      migrationJson.lastApplied = migration;
      await writeMigrationJson(migrationJson);
    } catch (err) {
      spinner.fail(`Failed to apply migration: ${migration}`);
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  }

  await fs.writeFile('./eternal.ts', sourceCode);
  spinner.succeed('🎉 All migrations applied successfully.');
};
