import React, { useRef } from "react";

interface ConversionFormProps {
  onConversionFormSubmit: (text: string) => void;
}

export const ConversionForm: React.FC<ConversionFormProps> = ({
  onConversionFormSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form
      className="col-start-4 col-end-9 row-start-1 row-end-3 mt-2 mr-2 mb-1 ml-1 flex flex-col justify-between rounded-md bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        if (textareaRef.current?.value) {
          onConversionFormSubmit(textareaRef.current.value);
          textareaRef.current.value = "";
        }
      }}
    >
      <textarea
        name="text"
        className="grow p-3 border-solid border-slate-300 border-2 border-b-0 rounded-tr-md rounded-tl-md resize-none outline-0"
        ref={textareaRef}
        required
        placeholder="Enter your text here..."
      />
      <button
        type="submit"
        className="p-1 duration-200 bg-red-700 hover:bg-red-600 border-red-700 rounded-br-md rounded-bl-md border-solid border-2 border-t-0 text-white"
      >
        Convert
      </button>
    </form>
  );
};
