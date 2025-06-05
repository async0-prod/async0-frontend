"use client";

import { useEffect, useState } from "react";
import type { JSX } from "react";
import type { BundledLanguage } from "shiki/bundle/web";
import { codeToHast } from "shiki/bundle/web";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { CopyTextButton } from "./CopyTextButton";

export async function highlightToJSX(code: string, lang: BundledLanguage) {
  const hast = await codeToHast(code, {
    lang,
    theme: "github-dark",
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}

export function CodeBlock({
  code,
  lang = "ts",
}: {
  code: string;
  lang?: BundledLanguage;
}) {
  const [highlighted, setHighlighted] = useState<JSX.Element | null>(null);

  useEffect(() => {
    highlightToJSX(code, lang).then(setHighlighted);
  }, [code, lang]);

  return (
    <pre className="rounded-md text-sm overflow-auto relative">
      <CopyTextButton
        text={code}
        className="absolute top-1 right-0 text-almond hover:text-almond cursor-pointer"
      />
      {highlighted ?? "Loading..."}
    </pre>
  );
}
