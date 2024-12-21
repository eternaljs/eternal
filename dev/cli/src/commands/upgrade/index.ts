import { Command } from 'commander';
import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import { runMigrations } from './migration-runner/index.js'; // Import the migration-runner
import { getInstalledAdapters } from '../../common/adapters.js';
import { getLatestVersion } from '../../common/npm.js';

const upgradeAdapters = async () => {
  console.log(chalk.blackBright.bold(`

      ███████╗████████╗███████╗██████╗ ███╗   ██╗ █████╗ ██╗     
      ██╔════╝╚══██╔══╝██╔════╝██╔══██╗████╗  ██║██╔══██╗██║     
      █████╗     ██║   █████╗  ██████╔╝██╔██╗ ██║███████║██║     
      ██╔══╝     ██║   ██╔══╝  ██╔══██╗██║╚██╗██║██╔══██║██║     
      ███████╗   ██║   ███████╗██║  ██║██║ ╚████║██║  ██║███████╗
      ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝                                         
      
  `));

  console.log(chalk.greenBright.bold('Welcome to Eternal Upgrade! Let us handle the heavy lifting for you.'));
  console.log('');
  
  console.log(
    chalk.gray(
      `
      ⚠️  Important: Always use Eternal for managing your third-party integrations and upgrades.
      🔄  Why? Because Eternal ensures:
          - Seamless upgrades without breaking your code.
          - Automatic migrations tailored to your specific setup.
          - A future-proof integration experience.
          
      🚫 Avoid manually updating Eternal dependencies in package.json.
      ❌ Doing so bypasses migration tracking and may introduce compatibility issues.
  
      💡 Instead, always use this upgrade tool to stay aligned with the latest updates and community-driven improvements.
  
      🛠️ Encounter a migration issue? Consider becoming a contributor to Eternal!
      🙌 Your contribution can help thousands of developers avoid similar issues.
      GitHub: ${chalk.cyanBright('https://github.com/eternaljs/eternal')}
  
      💻 Together, let’s make dependencies eternal.
      `
    )
  );
  
  console.log('');

  const spinner = ora(chalk.blue('🔍 Checking for adapter updates...')).start();

  const installedAdapters = await getInstalledAdapters();
  const updates: Array<{ adapter: string; currentVersion: string; latestVersion: string }> = [];

  for (const [adapter, currentVersion] of Object.entries(installedAdapters)) {
    const latestVersion = await getLatestVersion(adapter);
    const normalizedCurrentVersion = currentVersion.replace(/^[^\d]*/, '');
    if (latestVersion && latestVersion !== normalizedCurrentVersion) {
      updates.push({ adapter, currentVersion, latestVersion });
    }
  }

  if (updates.length === 0) {
    spinner.succeed(chalk.green('🎉 All adapters are up-to-date!'));
    console.log(chalk.greenBright('Your project is already at its best. 🚀'));
    return;
  }

  spinner.succeed(chalk.yellow('🚀 Updates available:\n'));

  updates.forEach(({ adapter, currentVersion, latestVersion }) => {
    console.log(
      ` - ${chalk.cyan(adapter)}: ${chalk.red(currentVersion)} → ${chalk.green(
        latestVersion
      )}`
    );
  });

  console.log('');
  const { confirm } = await import('@inquirer/prompts');
  const proceed = await confirm({
    message: chalk.yellowBright('Would you like to upgrade the above adapters?'),
  });

  if (!proceed) {
    console.log(chalk.red('❌ Upgrade canceled. Your project remains unchanged.'));
    return;
  }

  const upgradeSpinner = ora(chalk.blue('Upgrading adapters...')).start();

  for (const { adapter, latestVersion } of updates) {
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

  upgradeSpinner.succeed(chalk.greenBright('\n🎉 Adapters upgraded successfully!'));

  console.log(chalk.blue('🔄 Running migrations to ensure compatibility...'));

  // Run migrations after upgrading adapters
  const migrationSpinner = ora(chalk.blue('Applying migrations...')).start();

  const migrationStartTime = Date.now();
  await runMigrations();
  const migrationEndTime = Date.now();

  const timeSavedSeconds = Math.ceil((migrationEndTime - migrationStartTime) / 1000);
  const timeSavedMinutes = Math.max(10, Math.ceil(timeSavedSeconds / 60)); // Ensure a minimum of 10 minutes
  
  migrationSpinner.succeed(
    chalk.greenBright(`🎉 All migrations applied successfully in ${timeSavedSeconds}s!`)
  );
  
  console.log(
    chalk.greenBright.bold(`
      Your project is now up-to-date, fully compatible, and future-proof!
      ✨ Estimated time saved: ~${timeSavedMinutes} minutes of manual upgrades and debugging.
      💡 What's next?
        - Review the upgrade details: ${chalk.cyan('docs/upgrade-log.md')}
        - Continue building amazing things with Eternal.
    `)
  );
  
};

export const upgradeCommand = new Command('upgrade')
  .description('Upgrade Eternal adapters to the latest versions and apply migrations')
  .action(upgradeAdapters);
