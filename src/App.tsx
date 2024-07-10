import { useRef, useState } from "react";

import { useConvert } from "./api";
import { useLocalStorage } from "./utils/localStorage";
import { PDFViewer } from "./utils/pdf";
import { uuid } from "./utils/heap";

function App() {
  const { convertData } = useConvert();
  const { getItem, setItem, stringifyItem, parseItem } = useLocalStorage();
  const [pdfUrl, setPdfUrl] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

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
    <div className="bg-slate-100 grow grid grid-rows-8 grid-cols-8 gap-0 max-h-screen">
      <form
        className="col-start-4 col-end-9 row-start-1 row-end-3 rounded-md mt-2 mr-2 mb-1 ml-1 bg-white flex flex-col justify-between box-border"
        onSubmit={(e) => {
          e.preventDefault();
          if (inputRef.current?.value) {
            convertToPdf(inputRef.current.value);
            inputRef.current.value = "";
          }
        }}
      >
        <textarea
          name="text"
          className="grow border-solid rounded-tr-md rounded-tl-md border-slate-300 border-2 border-b-0 resize-none outline-0 p-3"
          ref={inputRef}
          required
          placeholder="Enter your text here..."
        ></textarea>
        <button
          type="submit"
          className="bg-red-700 hover:bg-red-600 duration-200 rounded-br-md rounded-bl-md text-white border-solid border-red-700 border-2 border-t-0 p-1"
        >
          Convert
        </button>
      </form>
      <div className="col-start-1 col-end-4 row-start-1 row-end-9 border-solid rounded-md border-slate-300 border-2 mt-2 mr-1 mb-2 ml-2 bg-white p-3 overflow-y-auto">
        {getItem("items") ? (
          <>
            <h2 className="text-lg font-bold">Recent conversions:</h2>
            <ul className="list-square ml-4">
              {parseItem(getItem("items") as string).map((el: any) => (
                <li
                  key={el.id}
                  onClick={() => convertToPdf(el.value)}
                  className="cursor-pointer hover:text-red-600 duration-200"
                >
                  <div className="text-ellipsis overflow-hidden text-nowrap">
                    {el.value}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h2 className="text-lg font-bold">No recent conversions.</h2>
        )}
      </div>
      <div className="col-start-4 col-end-9 row-start-3 row-end-9 border-solid rounded-md border-slate-300 border-2 mt-1 mr-2 mb-2 ml-1 bg-white flex overflow-y-auto">
        {pdfUrl ? (
          <PDFViewer
            document={{
              url: pdfUrl,
            }}
            loader={<div>loading...</div>}
            css="flex grow"
            canvasCss="flex grow"
            hideNavbar
          />
        ) : (
          <h3 className="text-lg font-bold m-3">No document selected.</h3>
        )}
      </div>
    </div>
  );
}

export default App;
