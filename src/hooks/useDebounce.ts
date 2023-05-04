import { useState, useEffect } from 'react';

interface debounceProps<T> {
  value: T;
  delay: number;
}

export default function useDebounce<T>({ value, delay }: debounceProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debouncedValue;
}
