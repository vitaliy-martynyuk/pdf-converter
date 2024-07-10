import { v4 as uuidv4 } from "uuid";
import PDFViewerComponent from "pdf-viewer-reactjs";

export const uuid = uuidv4;

export const PDFViewer = PDFViewerComponent;

export const useLocalStorage = () => {
  const getItem = (key: string) => localStorage.getItem(key);
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  const stringifyItem = (value: any) => JSON.stringify(value);
  const parseItem = (value: string): any => JSON.parse(value);

  return {
    getItem,
    setItem,
    stringifyItem,
    parseItem,
  };
};
