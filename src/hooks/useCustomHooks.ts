import { useState, useRef, useEffect } from 'react';

export function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue((prev) => !prev);
  };

  return [value, toggle];
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
