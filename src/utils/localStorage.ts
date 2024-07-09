export const useLocalStorage = () => {
  const getItem = (key: string) => localStorage.getItem(key);
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  const stringifyItem = (obj: Record<any, any>) => JSON.stringify(obj);
  const parseItem = (value: string): any => JSON.parse(value);

  return {
    getItem,
    setItem,
    stringifyItem,
    parseItem,
  };
};
