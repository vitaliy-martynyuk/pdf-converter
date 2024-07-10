import { useMemo, useState } from "react";

import {
  CONVERSION_LOCAL_STORAGE_KEYS,
  ConversionItem,
  useConvertToPdf,
} from "../../domains";
import { uuid, useLocalStorage } from "../../utils/heap";

import {
  ConversionForm,
  ConversionPDFViewer,
  RecentConversions,
} from "./_components";

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { convertData } = useConvertToPdf();
  const { getItem, setItem, stringifyItem, parseItem } = useLocalStorage();
  const [pdfUrl, setPdfUrl] = useState("");

  const conversionCachedItems = useMemo<Array<ConversionItem>>(() => {
    const items = getItem(CONVERSION_LOCAL_STORAGE_KEYS.ITEMS) || "[]";

    return parseItem(items);
  }, [getItem, parseItem]);

  const convertToPdf = async (inputValue: string) => {
    setIsLoading(true);
    const response = await convertData(inputValue);
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setIsLoading(false);

    setItem(
      CONVERSION_LOCAL_STORAGE_KEYS.ITEMS,
      stringifyItem([
        { value: inputValue, id: uuid() },
        ...conversionCachedItems.filter((el) => el.value !== inputValue),
      ])
    );
  };

  return (
    <div className="grow max-h-screen grid !grid-rows-8 !grid-cols-8 !gap-0 bg-slate-100">
      <ConversionForm onConversionFormSubmit={convertToPdf} />
      <RecentConversions
        items={conversionCachedItems}
        onItemClick={convertToPdf}
      />
      <ConversionPDFViewer pdfUrl={pdfUrl} isLoading={isLoading} />
    </div>
  );
}

export default HomePage;
