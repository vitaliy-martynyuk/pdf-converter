import { http } from "../../utils";

export const useConvert = () => {
  const convertData = (text: string): Promise<any> =>
    http.post(
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
