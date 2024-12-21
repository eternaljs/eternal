import path from 'path';
import fs from 'fs';

export function loadMigrations() {
  try {
    const migrationsDir = path.resolve('./migrations');
    const migrationFiles = fs.readdirSync(migrationsDir).filter((file) => file.endsWith('.ts'));
    return migrationFiles.map((file) => {
      const migrationPath = path.join(migrationsDir, file);
      const migration = require(migrationPath).migration;
      if (!migration) {
        throw new Error(`Migration file ${file} is missing an exported "migration" object.`);
      }
      return migration;
    });
  } catch (e) {
    return [];
  }
}
