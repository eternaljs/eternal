import chalk from 'chalk';

/**
 * Fetch the latest version of a given package from the npm registry.
 * @param packageName - The name of the package.
 * @returns The latest version as a string, or null if it cannot be fetched.
 */
export const getLatestVersion = async (packageName: string): Promise<string | null> => {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data['dist-tags']?.latest || null;
  } catch (err) {
    if (err instanceof Error) {
      console.error(chalk.red(`Failed to fetch version for ${packageName}: ${err.message}`));
    } else {
      console.error(chalk.red(`An unknown error occurred while fetching version for ${packageName}.`));
    }
    return null;
  }
};
