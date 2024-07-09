import { useRef, useState } from "react";

import { useConvert } from "./api";
import { useLocalStorage } from "./utils/localStorage";
import { PDFViewer } from "./utils/pdf";
import { uuid } from "./utils/heap";

function App() {
  const { convertData } = useConvert();
  const { getItem, setItem, stringifyItem, parseItem } = useLocalStorage();
  const [pdfUrl, setPdfUrl] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log(pdfUrl);

  const convertToPdf = (inputValue: string | undefined) => {
    if (inputValue) {
      setPdfUrl("");
      convertData(inputValue).then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      });

      const items = getItem("items") || "";
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
    <div>
      <div className="underline text-center">PDF converter</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputRef.current?.value) {
            convertToPdf(inputRef.current.value);
            inputRef.current.value = "";
          }
        }}
      >
        <input
          type="text"
          name="text"
          className="border-solid rounded-md border-slate-300 border-2"
          ref={inputRef}
          required
        />
        <button
          type="submit"
          className="border-solid rounded-md border-slate-300 border-2"
        >
          Convert
        </button>
      </form>
      {getItem("items") && (
        <ul>
          {parseItem(getItem("items") as string).map((el: any) => (
            <li key={el.id} onClick={() => convertToPdf(el.value)}>
              {el.value}
            </li>
          ))}
        </ul>
      )}
      {pdfUrl && (
        <PDFViewer
          document={{
            url: pdfUrl,
          }}
          loader={<div>loading...</div>}
        />
      )}
    </div>
  );
}

export default App;
