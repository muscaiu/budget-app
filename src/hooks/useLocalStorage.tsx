import { useState, useEffect } from "react";

export default function useLocalStorage(
  key: string,
  defaultValue: Function | any
) {
  const [value, setValue] = useState(() => {
    const jsonvalue = localStorage.getItem(key);
    if (jsonvalue != null) return JSON.parse(jsonvalue);
    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
