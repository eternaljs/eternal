import { Command } from 'commander';
import { execSync } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

const getInstalledAdapters = async () => {
  const packageJson = JSON.parse(await readFile('./package.json', 'utf-8'));

  const adapters = Object.keys(packageJson.dependencies || {})
    .concat(Object.keys(packageJson.devDependencies || {}))
    .filter((pkg) => pkg.startsWith('@eternal-js/'));

  return adapters.reduce<Record<string, string>>((acc, adapter) => {
    acc[adapter] =
      packageJson.dependencies?.[adapter] || packageJson.devDependencies?.[adapter];
    return acc;
  }, {});
};

const getLatestVersion = async (adapter: string): Promise<string | null> => {
  try {
    const response = await fetch(`https://registry.npmjs.org/${adapter}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data['dist-tags']?.latest || null;
  } catch (err) {
    if (err instanceof Error) {
      console.error(chalk.red(`Failed to fetch version for ${adapter}: ${err.message}`));
    } else {
      console.error(chalk.red(`An unknown error occurred while fetching version for ${adapter}.`));
    }
    return null;
  }
};

const upgradeAdapters = async () => {
  console.log(chalk.blue('🔍 Checking for adapter updates...'));

  const installedAdapters = await getInstalledAdapters();
  const updates: Array<{ adapter: string; currentVersion: string; latestVersion: string }> = [];

  for (const [adapter, currentVersion] of Object.entries(installedAdapters)) {
    const latestVersion = await getLatestVersion(adapter);
    if (latestVersion && latestVersion !== currentVersion) {
      updates.push({ adapter, currentVersion, latestVersion });
    }
  }

  if (updates.length === 0) {
    console.log(chalk.green('🎉 All adapters are up-to-date!'));
    return;
  }

  console.log(chalk.yellow('\n🚀 Updates available:\n'));
  updates.forEach(({ adapter, currentVersion, latestVersion }) => {
    console.log(
      ` - ${chalk.cyan(adapter)}: ${chalk.red(currentVersion)} → ${chalk.green(
        latestVersion
      )}`
    );
  });

  const { confirm } = await import('@inquirer/prompts');
  const proceed = await confirm({
    message: 'Would you like to upgrade the above adapters?',
  });

  if (!proceed) {
    console.log(chalk.red('❌ Upgrade canceled.'));
    return;
  }

  for (const { adapter, latestVersion } of updates) {
    console.log(chalk.blue(`Upgrading ${adapter} to version ${latestVersion}...`));
    try {
      execSync(`npm install ${adapter}@${latestVersion}`, { stdio: 'inherit' });
    } catch (err) {
      if (err instanceof Error) {
        console.error(chalk.red(`Failed to upgrade ${adapter}: ${err.message}`));
      } else {
        console.error(chalk.red(`An unknown error occurred while upgrading ${adapter}.`));
      }
    }
  }

  console.log(chalk.green('\n🎉 Upgrade complete! All adapters are up-to-date.'));
};

// Create the `upgrade` command
export const upgradeCommand = new Command('upgrade')
  .description('Upgrade Eternal adapters to the latest versions')
  .action(upgradeAdapters);
