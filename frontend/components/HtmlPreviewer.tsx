"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Preview</title>
  </head>
  <body>
    <h1>Hello HTML Preview</h1>
    <p>Edit the HTML on the left to see updates.</p>
  </body>
</html>`;

export default function HtmlPreviewer() {
  const [html, setHtml] = useState<string>(DEFAULT_HTML);
  const [leftWidth, setLeftWidth] = useState<number>(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const iframeSrcDoc = useMemo(() => html, [html]);

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      if (rect.width === 0) {
        return;
      }

      const nextWidth = ((event.clientX - rect.left) / rect.width) * 100;
      const clamped = Math.min(80, Math.max(20, nextWidth));
      setLeftWidth(clamped);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "preview.html";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-slate-50 px-6 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">HTML Preview Tool</h1>
        <p className="text-sm text-slate-600">
          Paste or type HTML on the left and preview it instantly.
        </p>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:gap-0" ref={containerRef} data-testid="pane-container">
        <section
          className="flex w-full flex-col gap-3 md:w-auto md:pr-3"
          style={{ flexBasis: `${leftWidth}%` }}
          data-testid="pane-left"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">HTML Input</h2>
            <button
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
              onClick={handleDownload}
              type="button"
            >
              Save HTML
            </button>
          </div>
          <textarea
            className="min-h-[420px] w-full rounded-lg border border-slate-200 bg-white p-4 text-sm leading-relaxed shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={html}
            onChange={(event) => setHtml(event.target.value)}
          />
        </section>

        <div className="relative hidden md:flex md:w-2 md:flex-none md:items-stretch">
          <div
            role="separator"
            aria-orientation="vertical"
            aria-valuenow={Math.round(leftWidth)}
            className="w-full cursor-col-resize rounded-full bg-slate-200 transition hover:bg-blue-200"
            onPointerDown={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            data-testid="pane-resizer"
          />
        </div>

        <section
          className="flex w-full flex-col gap-3 md:w-auto md:pl-3"
          style={{ flexBasis: `${100 - leftWidth}%` }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Live Preview</h2>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <iframe
              className="h-[520px] w-full"
              sandbox="allow-scripts allow-same-origin"
              srcDoc={iframeSrcDoc}
              title="HTML Preview"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
