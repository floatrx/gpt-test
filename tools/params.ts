/**
 * Parse the command line arguments
 * @returns The parsed arguments as a key-value pair object
 */
export const parseArgs = () => {
  const args = process.argv.slice(2); // Ignore the first two elements
  const params: Record<string, string | boolean> = {};

  for (let i = 0; i < args.length; i++) {
    // Check if the argument starts with '--'
    if (args[i].startsWith('--')) {
      const [key, value] = args[i].substring(2).split('=');
      params[key] = value || true;
    }
  }
  return params;
};
