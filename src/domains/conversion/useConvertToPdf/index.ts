import { http } from "../../../utils/http";

export const useConvertToPdf = () => {
  const convertData = async (text: string): Promise<any> =>
    await http.post(
      "/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4",
      {
        text,
      },
      {
        responseType: "blob",
      }
    );

  return { convertData };
};
