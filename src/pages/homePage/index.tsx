import { useState } from "react";
//TODO: alias
import { useConvert } from "../../api";
import { useLocalStorage } from "../../utils/localStorage";
import { uuid } from "../../utils/heap";

import {
  ConversionForm,
  ConversionPdfViewer,
  RecentConversions,
} from "./_components";

function HomePage() {
  const { convertData } = useConvert();
  const { getItem, setItem, stringifyItem, parseItem } = useLocalStorage();
  const [pdfUrl, setPdfUrl] = useState("");

  const convertToPdf = (inputValue: string | undefined) => {
    if (inputValue) {
      setPdfUrl("");
      convertData(inputValue).then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      });

      const items = getItem("items") || "[]";
      if (items) {
        setItem(
          "items",
          stringifyItem([
            { value: inputValue, id: uuid() },
            ...parseItem(items).filter((el: any) => el.value !== inputValue),
          ])
        );
      } else {
        setItem("items", stringifyItem([{ value: inputValue, id: uuid() }]));
      }
    }
  };

  return (
    <div className="grow max-h-screen grid !grid-rows-8 !grid-cols-8 !gap-0 bg-slate-100">
      <ConversionForm onConversionFormSubmit={convertToPdf} />
      <RecentConversions
        items={parseItem(getItem("items") || "[]")}
        onItemClick={convertToPdf}
      />
      <ConversionPdfViewer pdfUrl={pdfUrl} isLoading={false} />
    </div>
  );
}

export default HomePage;
