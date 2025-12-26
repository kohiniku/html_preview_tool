import { fireEvent, render, screen } from "@testing-library/react";

import HtmlPreviewer from "../components/HtmlPreviewer";

describe("HtmlPreviewer", () => {
  it("updates the preview iframe as the HTML changes", () => {
    render(<HtmlPreviewer />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "<h1>Updated</h1>" } });

    const iframe = screen.getByTitle("HTML Preview") as HTMLIFrameElement;
    expect(iframe).toHaveAttribute("srcdoc", "<h1>Updated</h1>");
  });
});
