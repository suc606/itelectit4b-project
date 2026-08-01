import { useState, useRef, useEffect } from 'react';

/**
 * Custom Hook 1: useToggle
 * Manages a boolean toggle state with a memoized or simple switcher function.
 * Explicit return type: [boolean, () => void]
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue((prev) => !prev);
  };

  return [value, toggle];
}

/**
 * Custom Hook 2: usePrevious<T>
 * Keeps track of the previous value of a state or prop.
 * Explicit return type: T | undefined
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
