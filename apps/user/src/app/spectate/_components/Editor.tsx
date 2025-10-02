"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { editor } from "monaco-editor";
import { Editor, Monaco } from "@monaco-editor/react";
import { WebsocketMessage } from "@/lib/types";

interface MonacoEditorProps {
  coderName: string;
  problemTitle: string;
  avatarUrl?: string;
  initialCode?: string;
  className?: string;
  showHeader?: boolean;
  enableLiveSimulation?: boolean;
  messages?: WebsocketMessage[];
}

export function MonacoEditor({
  coderName,
  problemTitle,
  avatarUrl,
  initialCode = "",
  className = "",
  showHeader = true,
  messages = [],
}: MonacoEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [value, setValue] = useState<string>(initialCode);

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

  function handleMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    editor.focus();
  }

  console.log("Messages", messages);
  useEffect(() => {
    if (!editorRef.current || messages.length === 0) return;

    const latestMessage = JSON.parse(messages[messages.length - 1]?.data) as {
      type: string;
      timestamp: number;
      fullContent: string;
      changes: any[];
    };
    setValue(latestMessage.fullContent);
  }, [messages]);

  return (
    <Card className={`overflow-hidden ${className}`}>
      {showHeader && (
        <div className="flex items-center gap-3 p-4 border-b bg-card">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={avatarUrl || "/placeholder.svg"}
              alt={coderName}
            />
            <AvatarFallback>{coderName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{coderName}</h3>
            <p className="text-xs text-muted-foreground">{problemTitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
      <Editor
        value={value}
        height="60vh"
        defaultLanguage="javascript"
        theme="custom"
        onMount={handleMount}
        beforeMount={handleBeforeMount}
        options={{
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
          hover: { enabled: false },
          parameterHints: { enabled: false },
          wordBasedSuggestions: false ? "currentDocument" : "off",
          inlineSuggest: { enabled: false },
          tabCompletion: false ? "on" : "off",
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
    </Card>
  );
}
