export const getJoke = async () => {
  const res = await fetch(`/api/bot/stream`);
  if (!res.body) {
    throw new Error('ReadableStream is not yet supported in this browser.');
  }
  return res.body.getReader();
};

export const getHi = async (): Promise<string> => {
  const res = await fetch(`/api/bot/greeting`);
  return await res.json().then((data) => data?.answer);
};

export const getTest = async () => {
  const res = await fetch(`/api/test`);
  return await res.text().then((text) => `${new Date().toISOString()} ${text}`);
};
