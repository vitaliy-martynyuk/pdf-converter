import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import HomePage from ".";

jest.mock("src/domains/conversion/useConvertToPdf", () => ({
  useConvertToPdf: () => ({
    convertData: async () => Promise.resolve({ data: "test" }),
  }),
}));

describe("Home page", () => {
  global.URL.createObjectURL = jest.fn();

  it("Display received data", async () => {
    render(<HomePage />);

    const convertButton = screen.getByRole("button", { name: "Convert" });
    const convertInput = screen.getByRole("textbox");

    expect(convertButton).toBeInTheDocument();
    expect(convertInput).toBeInTheDocument();

    fireEvent.change(convertInput, {
      target: {
        value: "new text value",
      },
    });

    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("new text value")).toBeInTheDocument();
    expect(convertInput).toHaveValue("");
  });
});
