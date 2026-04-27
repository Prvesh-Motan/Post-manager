import { useState, useEffect, useCallback } from 'react';

function read(key, initial) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return initial;
    return JSON.parse(raw);
  } catch {
    return initial;
  }
}

/**
 * Syncs state with localStorage. Serializer defaults to JSON.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => read(key, initialValue));

  useEffect(() => {
    setValue(read(key, initialValue));
  }, [key]);

  const setStored = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* quota or private mode */
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, setStored];
}
