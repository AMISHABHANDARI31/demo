import { useCallback, useState } from 'react';

export function useAsync(asyncFunction) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (caughtError) {
        setError(caughtError);
        throw caughtError;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction],
  );

  return { data, error, isLoading, execute };
}
