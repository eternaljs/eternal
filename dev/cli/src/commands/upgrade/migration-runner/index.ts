import { loadMigrations } from './loader.js'
import { validateMigration } from './validator.js';
import { executeMigration } from './executor.js';

export async function runMigrations() {
  console.log('🔄 Running migrations...');
  
  // Load all migration files
  const migrations = loadMigrations();

  for (const migration of migrations) {
    console.log(`➡️ Running migration: ${migration.meta.id} (${migration.meta.description})`);

    // Validate the migration
    if (!(await validateMigration(migration))) {
      console.log(`❌ Skipping migration: ${migration.meta.id} (Validation failed)`);
      continue;
    }

    // Execute the migration
    await executeMigration(migration);

    console.log(`✅ Completed migration: ${migration.meta.id}`);
  }

  console.log('🎉 All migrations completed!');
}