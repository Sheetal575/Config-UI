import { useEffect, useState } from 'react';

export const useLocal = (id: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(id);
    return storedValue ? storedValue : initialValue;
  });

  const clearValue = () => {
    localStorage.removeItem(id);
  };

  useEffect(() => {
    localStorage.setItem(id, value);
  }, [id, value]);

  return [value, setValue, clearValue] as const;
};
