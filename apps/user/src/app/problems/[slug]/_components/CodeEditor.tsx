"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { Dot } from "lucide-react";
import { CodeRunResult, CodeSubmitResult, Problem } from "@/lib/types";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import EditorConsole from "./EditorConsole";
import EditorActions from "./EditorActions";
import EditorButtons from "./EditorButtons";
import { Publisher } from "@/app/ws/publisher";
import { unescapeCode } from "@/lib/utils";

type CodeEditorProps = {
  problem?: Problem;
  handleRun: (value: string) => void;
  handleSubmit: (value: string) => void;
  clearConsole: () => void;
  problemRunResult: CodeRunResult | null;
  problemSubmitResult: CodeSubmitResult | null;
  isRunPending: boolean;
  isSubmitPending: boolean;
  consoleMode: "run" | "submit" | null;
  isConsoleOpen: boolean;
  toggleConsole: () => void;
};

export default function CodeEditor({
  problem,
  handleRun,
  handleSubmit,
  clearConsole,
  problemRunResult,
  problemSubmitResult,
  isRunPending,
  isSubmitPending,
  consoleMode,
  isConsoleOpen,
  toggleConsole,
}: CodeEditorProps) {
  const monacoRef = useRef<Monaco | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  const [codeSaved, setCodeSaved] = useState<boolean>(false);
  const [isCodeSavePending, startCodeSaveTransition] = useTransition();
  const [fontSize, setFontSize] = useState<number>(16);
  const [tabSpace, setTabSpace] = useState<number>(2);
  const [lineHeight, setLineHeight] = useState<number>(23);
  const [intellisenseActive, setIntellisenseActive] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [value, setValue] = useState<string>(
    String(unescapeCode(problem?.starter_code ?? ""))
  );
  const [startStreaming, setStartStreaming] = useState<boolean>(false);
  const [publisher, setPublisher] = useState<Publisher | null>(null);

  useEffect(() => {
    if (!problem) return;
    const val = window.localStorage.getItem(`${problem.name}-code`);
    if (val) setValue(val);
  }, [problem, problem?.name]);

  useEffect(() => {
    const monaco = monacoRef.current;
    if (!monaco) return;

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: !intellisenseActive,
      noSyntaxValidation: !intellisenseActive,
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: !intellisenseActive,
      noSyntaxValidation: !intellisenseActive,
    });
  }, [intellisenseActive]);

  function handleMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    editorRef.current = editor;
    editor.focus();

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      startCodeSaveTransition(() => {
        editor.getAction("editor.action.formatDocument")?.run();
        if (window) {
          window.localStorage.setItem(`${name}-code`, editor.getValue());
        }
        setCodeSaved(true);
      });
    });
  }

  function handleBeforeMount(monaco: Monaco) {
    monacoRef.current = monaco;
    monaco.editor.defineTheme("custom", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "", foreground: "D4D4D4", background: "1E1E1E" },
        { token: "comment", foreground: "6A9955", fontStyle: "italic" },
        { token: "keyword", foreground: "569CD6" },
        { token: "identifier", foreground: "9CDCFE" },
        { token: "string", foreground: "CE9178" },
        { token: "number", foreground: "B5CEA8" },
        { token: "delimiter", foreground: "D4D4D4" },
      ],
      colors: {
        "editor.background": "#1E1E1E",
        "editor.foreground": "#D4D4D4",
        "editor.lineHighlightBackground": "#2A2A2A",
        "editorLineNumber.foreground": "#858585",
        "editorLineNumber.activeForeground": "#C6C6C6",
        "editorCursor.foreground": "#AEAFAD",
        "editor.selectionBackground": "#264F78",
        "editor.inactiveSelectionBackground": "#3A3D41",
        "editorIndentGuide.background": "#404040",
        "editorIndentGuide.activeBackground": "#707070",
      },
    });
  }

  function handleCodeDownload() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function toggleStartStreaming() {
    if (!startStreaming) {
      const publisher = Publisher.getInstance(
        process.env.NEXT_PUBLIC_WS_URL!,
        "6232c0c5-70c0-422b-bdd0-f9b46bbc0222"
      );
      setPublisher(publisher);
      setStartStreaming(true);

      const editor = editorRef.current;
      if (!editor) return;

      const model = editor.getModel();
      if (!model) return;

      model.onDidChangeContent((e) => {
        const event = {
          type: "content-change",
          timestamp: Date.now(),
          fullContent: model.getValue(),
          changes: e.changes.map((change) => ({
            range: {
              startLineNumber: change.range.startLineNumber,
              startColumn: change.range.startColumn,
              endLineNumber: change.range.endLineNumber,
              endColumn: change.range.endColumn,
            },
            text: change.text,
            rangeLength: change.rangeLength,
          })),
        };

        publisher.publish(event);
      });

      editor.onDidChangeCursorSelection((e) => {
        const event = {
          type: "cursor-change",
          timestamp: Date.now(),
          fullContent: model.getValue(),
          changes: e.selection
            ? [
                {
                  startLineNumber: e.selection.startLineNumber,
                  startColumn: e.selection.startColumn,
                  endLineNumber: e.selection.endLineNumber,
                  endColumn: e.selection.endColumn,
                },
              ]
            : [],
        };

        publisher.publish(event);
      });

      let scrollThrottleTimer: NodeJS.Timeout;
      editor.onDidScrollChange((e) => {
        clearTimeout(scrollThrottleTimer);
        scrollThrottleTimer = setTimeout(() => {
          const event = {
            type: "scroll-change",
            timestamp: Date.now(),
            fullContent: model.getValue(),
            changes: {
              scrollTop: e.scrollTop,
              scrollLeft: e.scrollLeft,
            },
          };

          publisher.publish(event);
        }, 32);
      });
    } else {
      publisher?.disconnect();
      setPublisher(null);
      setStartStreaming(false);
    }
  }

  if (!problem) return null;

  const { starter_code, name } = problem;

  return (
    <div className="p-1.5">
      <Tabs className="py-2">
        <TabsList className="flex items-center">
          <div className="flex items-center">
            <Dot
              className={`${codeSaved && "text-green-600"} ${isCodeSavePending && "text-yellow-600"}`}
            />
            {codeSaved ? (
              <p
                className={`${codeSaved && "text-green-600"} ${isCodeSavePending && "text-yellow-600"} text-xs italic -ml-1`}
              >
                Saved
              </p>
            ) : (
              <p className={`text-xs -ml-1`}>Unsaved</p>
            )}
            {isCodeSavePending && (
              <p
                className={` ${codeSaved && "text-green-600"} ${isCodeSavePending && "text-yellow-600"} text-xs italic -ml-1`}
              >
                Saving...
              </p>
            )}
          </div>

          <EditorActions
            startStreaming={startStreaming}
            toggleStartStreaming={toggleStartStreaming}
            handleCodeDownload={handleCodeDownload}
            setValue={setValue}
            fontSize={fontSize}
            setFontSize={setFontSize}
            tabSpace={tabSpace}
            setTabSpace={setTabSpace}
            lineHeight={lineHeight}
            setLineHeight={setLineHeight}
            intellisenseActive={intellisenseActive}
            setIntellisenseActive={setIntellisenseActive}
            copied={copied}
            starter_code={starter_code}
            name={name}
          />
        </TabsList>
      </Tabs>

      <div className="relative overflow-hidden rounded-lg">
        <Editor
          value={value}
          height="60vh"
          defaultLanguage="javascript"
          theme="custom"
          onChange={(value) => setValue(value || "")}
          onMount={handleMount}
          beforeMount={handleBeforeMount}
          options={{
            quickSuggestions: intellisenseActive,
            suggestOnTriggerCharacters: intellisenseActive,
            hover: { enabled: intellisenseActive },
            parameterHints: { enabled: intellisenseActive },
            wordBasedSuggestions: intellisenseActive
              ? "currentDocument"
              : "off",
            inlineSuggest: { enabled: intellisenseActive },
            tabCompletion: intellisenseActive ? "on" : "off",
            fontSize: 14,
            fontFamily: "Fira Code, monospace",
            fontLigatures: true,
            wordWrap: "on",
            minimap: { enabled: false },
            bracketPairColorization: { enabled: true },
            cursorBlinking: "smooth",
            formatOnPaste: true,
            lineNumbers: "on",
            lineHeight: 22,
            padding: { top: 20 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
              handleMouseWheel: true,
              alwaysConsumeMouseWheel: false,
            },
            guides: { bracketPairs: false, indentation: false },
            renderLineHighlight: "all",
            renderLineHighlightOnlyWhenFocus: true,
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            copyWithSyntaxHighlighting: true,
            suggest: {
              showFunctions: false,
            },
          }}
        />

        <EditorConsole
          isConsoleOpen={isConsoleOpen}
          consoleRef={consoleRef}
          clearConsole={clearConsole}
          problemRunResult={problemRunResult}
          problemSubmitResult={problemSubmitResult}
          isRunPending={isRunPending}
          isSubmitPending={isSubmitPending}
          consoleMode={consoleMode}
        />
      </div>

      <EditorButtons
        value={value}
        toggleConsole={toggleConsole}
        isConsoleOpen={isConsoleOpen}
        handleRun={handleRun}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
