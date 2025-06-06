"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import {
  Dot,
  CheckCheck,
  Copy,
  Settings,
  RotateCcw,
  ChevronUp,
  Send,
  Terminal,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { unescapeCode } from "@/lib/codeFormat";
import { judge0ResponseType, problemType } from "@/lib/types";
import RunConsole from "@/app/problems/[name]/_components/RunConsole";
import SubmitConsole from "@/app/problems/[name]/_components/SubmitConsole";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { Label } from "@/components/ui/label";

interface SettingItemProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

type CodeEditorProps = {
  problem: problemType;
  handleRun: (value: string) => void;
  handleSubmit: (value: string) => void;
  problemRunStatus: judge0ResponseType | null;
  problemSubmitStatus: judge0ResponseType[] | null;
  clearConsole: () => void;
  isPending: boolean;
};

export default function CodeEditor({
  problem,
  handleRun,
  handleSubmit,
  problemRunStatus,
  problemSubmitStatus,
  clearConsole,
  isPending,
}: CodeEditorProps) {
  const { starter_code, name } = problem;
  const monacoRef = useRef<Monaco | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [codeSaved, setCodeSaved] = useState<boolean>(false);
  const [isCodeSavePending, startCodeSaveTransition] = useTransition();
  const [fontSize, setFontSize] = useState<number>(16);
  const [tabSpace, setTabSpace] = useState<number>(2);
  const [lineHeight, setLineHeight] = useState<number>(23);
  const [intellisenseActive, setIntellisenseActive] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [value, setValue] = useState<string>(
    String(unescapeCode(starter_code))
  );

  useEffect(() => {
    const val = window.localStorage.getItem(`${name}-code`);
    if (val) {
      setValue(val);
    }
  }, [name]);

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

  function toggleConsole() {
    setIsConsoleOpen(!isConsoleOpen);
  }

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

          <div className="ml-auto flex gap-4">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={handleCodeDownload}
              className="hover:bg-transparent cursor-pointer"
            >
              {copied ? (
                <CheckCheck className="h-5 w-5  " />
              ) : (
                <Copy size={16} />
              )}
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="hover:bg-transparent cursor-pointer"
                >
                  <Settings size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                <div className="space-y-3.5">
                  <NumberSetting
                    label="Font Size"
                    value={fontSize}
                    min={8}
                    max={32}
                    onChange={setFontSize}
                  />
                  <NumberSetting
                    label="Tab Space"
                    value={tabSpace}
                    min={1}
                    max={8}
                    onChange={setTabSpace}
                  />
                  <NumberSetting
                    label="Line Height"
                    value={lineHeight}
                    min={10}
                    max={30}
                    step={1}
                    onChange={setLineHeight}
                  />
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wrap-text" className="text-sm font-medium">
                      Intellisense
                    </Label>
                    <Switch
                      id="wrap-text"
                      checked={intellisenseActive}
                      onCheckedChange={setIntellisenseActive}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                setValue(String(unescapeCode(starter_code)));
                if (window) {
                  window.localStorage.removeItem(`${name}-code`);
                }
              }}
              className="hover:bg-transparent cursor-pointer"
            >
              <RotateCcw size={16} />
            </Button>
          </div>
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
            // lightbulb: {
            //   enabled: intellisenseActive ? ShowLightbulbIconMode : "off",
            // },
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

        {/* Console UI */}
        <AnimatePresence>
          {isConsoleOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "40%", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="absolute bg-charcoal bottom-0 w-full overflow-hidden text-muted-foreground"
              ref={consoleRef}
            >
              <div className="flex h-8 items-center justify-between border-b px-4">
                <div className="flex items-center gap-1">
                  <Terminal size={13} />
                  <h3 className="text-xs font-medium">Console</h3>
                </div>
                <div
                  className="ml-auto flex items-center gap-1 cursor-pointer"
                  onClick={clearConsole}
                >
                  <Trash2 size={13} />
                </div>
              </div>
              {problemSubmitStatus ? (
                <SubmitConsole data={problemSubmitStatus} />
              ) : (
                <RunConsole
                  data={
                    isPending
                      ? {
                          stdout: null,
                          time: null,
                          memory: null,
                          stderr: null,
                          token: null,
                          compile_output: null,
                          message: null,
                          status: { id: 2, description: "Processing" },
                          output: null,
                        }
                      : problemRunStatus
                  }
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Run and Submit buttons */}
      <div className="flex justify-end gap-2 pt-4 w-full">
        <Button
          size="lg"
          className="mr-auto cursor-pointer"
          onClick={toggleConsole}
        >
          Console
          <ChevronUp
            className={` ${isConsoleOpen ? "transition-all duration-400 ease-in-out rotate-180" : "transition-all duration-400 ease-in-out"} `}
            size="14"
          />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="border-charcoal text-charcoal bg-transparent cursor-pointer"
          type="submit"
          onClick={() => {
            if (!isConsoleOpen) setIsConsoleOpen(true);
            clearConsole();
            handleRun(value);
          }}
          disabled={isPending}
        >
          Run
        </Button>

        <Button
          size="lg"
          type="submit"
          className="bg-charcoal text-almond cursor-pointer"
          onClick={() => {
            if (!isConsoleOpen) setIsConsoleOpen(true);
            clearConsole();
            handleSubmit(value);
          }}
          disabled={isPending}
        >
          Submit
          <Send size={13} />
        </Button>
      </div>
    </div>
  );
}

function NumberSetting({
  label,
  value,
  min = 1,
  max = 100,
  step = 1,
  onChange,
}: SettingItemProps) {
  const increment = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Label
        htmlFor={label.toLowerCase().replace(/\s+/g, "-")}
        className="text-sm font-medium"
      >
        {label}
      </Label>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-none"
          onClick={decrement}
          disabled={value <= min}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Decrease {label}</span>
        </Button>
        <div className="flex h-8 w-10 items-center justify-center border border-x-0 border-input bg-background text-sm tabular-nums">
          {value}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          onClick={increment}
          disabled={value >= max}
        >
          <Plus className="h-3 w-3" />
          <span className="sr-only">Increase {label}</span>
        </Button>
      </div>
    </div>
  );
}
