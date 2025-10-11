"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { unescapeCode } from "@/lib/utils";

import {
  CheckCheck,
  Copy,
  Settings,
  RotateCcw,
  Minus,
  Plus,
  Play,
  Pause,
} from "lucide-react";

type EditorActionsProps = {
  startStreaming: boolean;
  toggleStartStreaming: () => void;
  handleCodeDownload: () => void;
  setValue: (value: string) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  tabSpace: number;
  setTabSpace: (value: number) => void;
  lineHeight: number;
  setLineHeight: (value: number) => void;
  intellisenseActive: boolean;
  setIntellisenseActive: (value: boolean) => void;
  copied: boolean;
  starter_code: string;
  name: string;
};

export default function EditorActions({
  startStreaming,
  toggleStartStreaming,
  handleCodeDownload,
  setValue,
  fontSize,
  setFontSize,
  tabSpace,
  setTabSpace,
  lineHeight,
  setLineHeight,
  intellisenseActive,
  setIntellisenseActive,
  copied,
  starter_code,
  name,
}: EditorActionsProps) {
  return (
    <div className="dark:text-almond text-charcoal ml-auto flex gap-4">
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={toggleStartStreaming}
        className="cursor-pointer hover:bg-transparent"
      >
        {startStreaming ? <Pause size={16} /> : <Play size={16} />}
      </Button>

      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={handleCodeDownload}
        className="cursor-pointer hover:bg-transparent"
      >
        {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="cursor-pointer hover:bg-transparent"
          >
            <Settings size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="bg-almond border-charcoal/20 dark:bg-charcoal dark:border-almond/20 dark:text-almond text-charcoal"
        >
          <div className="space-y-3">
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
        className="cursor-pointer hover:bg-transparent"
      >
        <RotateCcw size={16} />
      </Button>
    </div>
  );
}

type NumberSettingProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

function NumberSetting({
  label,
  value,
  min = 1,
  max = 100,
  step = 1,
  onChange,
}: NumberSettingProps) {
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
          className="bg-almond dark:bg-charcoal h-8 w-8 rounded-r-none"
          onClick={decrement}
          disabled={value <= min}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Decrease {label}</span>
        </Button>
        <div className="border-input bg-almond dark:bg-charcoal flex h-8 w-10 items-center justify-center border border-x-0 text-sm tabular-nums">
          {value}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="bg-almond dark:bg-charcoal h-8 w-8 rounded-l-none"
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
