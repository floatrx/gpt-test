import { getHi, getJoke, getTest } from '@/api/tests.ts';
import { Button, type ButtonProps } from '@/components/ui/button.tsx';
import { useFetch } from '@/hooks/use-fetch.ts';
import { readStream } from '@/lib/stream.ts';

/**
 * ✨ Simple demo application
 *    to test OpenAPI features ✨
 */
export const App = () => {
  const { fetchApi, loading, message, setMessage } = useFetch();

  const onChunk = (chunk: string) => setMessage((prev) => prev + chunk);
  const requestJoke = () => fetchApi(getJoke).then((r) => readStream(r, onChunk));
  const requestGreeting = () => fetchApi(getHi).then(setMessage);
  const requestTest = () => fetchApi(getTest).then(setMessage);

  const buttons: ButtonProps[] = [
    { children: 'Tell a Joke!', onClick: requestJoke },
    { children: 'Say Hi!', onClick: requestGreeting },
    { children: 'Test', onClick: requestTest },
  ];

  return (
    <div className="container space-y-4">
      <h1 className="text-3xl">Test OpenAPI features</h1>
      <div className="stack">
        {buttons.map((props, idx) => (
          <Button key={idx} disabled={loading} {...props} />
        ))}
      </div>
      <div className="text-xl max-w-xl">{message}</div>
    </div>
  );
};
