/**
 * Delay for a given number of milliseconds
 * @param ms
 */
export const delay = async (ms: number = 100) => {
  return await new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Delay for a random number of milliseconds between min and max
 * @param min - minimum delay in milliseconds (default 50)
 * @param max - maximum delay in milliseconds (default 100)
 */
export const randomDelay = async (min: number = 50, max: number = 100) => {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return await delay(ms);
};
