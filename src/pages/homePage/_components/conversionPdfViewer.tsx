import React from "react";
//TODO: alias
import { PDFViewer } from "../../../utils/pdf";

interface ConversionPdfViewerProps {
  pdfUrl: string;
  isLoading: boolean;
}

export const ConversionPdfViewer: React.FC<ConversionPdfViewerProps> = ({
  pdfUrl,
  isLoading,
}) => {
  return (
    <div className="col-start-4 col-end-9 row-start-3 row-end-9 mt-1 mr-2 mb-2 ml-1 flex border-solid border-2 rounded-md border-slate-300 bg-white overflow-y-auto">
      {pdfUrl ? (
        <PDFViewer
          document={{
            url: pdfUrl,
          }}
          loader={<span />}
          css="flex grow"
          canvasCss="flex grow"
          hideNavbar
        />
      ) : (
        <h3 className="text-lg font-bold m-3">No document selected.</h3>
      )}
    </div>
  );
};
