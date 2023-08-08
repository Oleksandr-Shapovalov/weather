import { useState, useEffect } from 'react';

export const useDebounceValue = <T>(value: T, delayInMs: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayInMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayInMs]);

  return debouncedValue;
};
