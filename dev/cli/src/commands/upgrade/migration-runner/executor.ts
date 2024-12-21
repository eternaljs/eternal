import fs from 'fs/promises';
import { MigrationContext } from './types.js';

export async function executeMigration(migration: any) {
  const context: MigrationContext = {
    framework: 'next.js', // Dynamically determine framework
    runtime: 'node',      // Dynamically determine runtime
    adapterName: '@eternal-js/auth-adapter', // Replace with real adapter info
    adapterVersion: '2.0.0', // Replace with real version info
  };

  const targetFiles = migration.targetFiles(context);

  for (const filePath of targetFiles) {
    const sourceCode = await fs.readFile(filePath, 'utf-8');
    const isValidFile = await migration.conditions.validateFile(filePath, sourceCode);

    if (!isValidFile) continue;

    const transformedCode = migration.transform.transformCode(
      { sourceCode, filePath },
      context,
      require('@babel/core')
    );

    await fs.writeFile(filePath, transformedCode, 'utf-8');
    console.log(`✅ Transformed file: ${filePath}`);
  }
}
