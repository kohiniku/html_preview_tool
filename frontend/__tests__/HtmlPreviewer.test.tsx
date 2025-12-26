import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import HtmlPreviewer from "../components/HtmlPreviewer";

describe("HtmlPreviewer", () => {
  it("updates the preview iframe as the HTML changes", () => {
    render(<HtmlPreviewer />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "<h1>Updated</h1>" } });

    const iframe = screen.getByTitle("HTML Preview") as HTMLIFrameElement;
    expect(iframe).toHaveAttribute("srcdoc", "<h1>Updated</h1>");
  });

  it("resizes panes when the divider is dragged", () => {
    render(<HtmlPreviewer />);

    const container = screen.getByTestId("pane-container");
    const leftPane = screen.getByTestId("pane-left");
    const resizer = screen.getByTestId("pane-resizer");

    vi.spyOn(container, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      right: 1000,
      bottom: 0,
      width: 1000,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ""
    });

    fireEvent.pointerDown(resizer, { clientX: 800 });
    fireEvent.pointerMove(window, { clientX: 800 });
    fireEvent.pointerUp(window);

    expect(leftPane).toHaveStyle({ flexBasis: "80%" });
  });
});
