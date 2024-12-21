import { promisify } from 'util';
import fs from 'fs';

const readFile = promisify(fs.readFile);

export const getInstalledAdapters = async () => {
  const packageJsonPath = './package.json';

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error("No package.json file found in the current directory.");
  }

  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));

  // Merge dependencies and devDependencies to check for adapters
  const adapters = Object.keys(packageJson.dependencies || {})
    .concat(Object.keys(packageJson.devDependencies || {}))
    .filter((pkg) => pkg.startsWith('@eternal-js/'));

  // Return a record of adapter names and their versions
  return adapters.reduce<Record<string, string>>((acc, adapter) => {
    acc[adapter] =
      packageJson.dependencies?.[adapter] || packageJson.devDependencies?.[adapter];
    return acc;
  }, {});
};
