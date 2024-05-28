import { useCallback, useState } from 'react';

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchApi = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    setMessage('');
    setLoading(true);
    return await fn()
      .then((response) => {
        return response;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, message, setMessage, fetchApi };
};
