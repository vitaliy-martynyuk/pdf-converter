import React from "react";
//TODO: alias
import { PDFViewer } from "../../../utils/pdf";

interface ConversionPDFViewerProps {
  pdfUrl: string;
  isLoading: boolean;
}

export const ConversionPDFViewer: React.FC<ConversionPDFViewerProps> = ({
  pdfUrl,
  isLoading,
}) => {
  const PDFViewerWrapper = ({
    children,
  }: {
    children?: React.ReactNode;
  }): JSX.Element => (
    <div className="col-start-4 col-end-9 row-start-3 row-end-9 mt-1 mr-2 mb-2 ml-1 flex border-solid border-2 rounded-md border-slate-300 bg-white overflow-y-auto">
      {children}
    </div>
  );

  if (isLoading) {
    return (
      <PDFViewerWrapper>
        <h3 className="text-lg font-bold m-3">Loading...</h3>
      </PDFViewerWrapper>
    );
  }

  if (!pdfUrl) {
    return (
      <PDFViewerWrapper>
        <h3 className="text-lg font-bold m-3">No document selected.</h3>
      </PDFViewerWrapper>
    );
  }

  return (
    <PDFViewerWrapper>
      <PDFViewer
        document={{
          url: pdfUrl,
        }}
        loader={<span />}
        css="flex grow"
        canvasCss="flex grow"
        hideNavbar
      />
    </PDFViewerWrapper>
  );
};
