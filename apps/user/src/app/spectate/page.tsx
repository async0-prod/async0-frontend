"use client";

import { Badge } from "@/components/ui/badge";
import { MonacoEditor } from "./_components/Editor";
import { useEffect, useState } from "react";
import { Subscriber } from "../ws/subscriber";
import { WebsocketMessage } from "@/lib/types";

const featuredCoder = {
  id: "alex_dev",
  name: "Alex Chen",
  problem: "Two Sum - LeetCode Hard",
  avatar: "/developer-avatar.png",
  viewerCount: 1247,
  code: `function twoSum(nums, target) { }`,
};

interface ConnectionStats {
  isConnected: boolean;
  lastEventTime: number | null;
  eventCount: number;
}

export default function SpectatePage() {
  const [messages, setMessages] = useState<WebsocketMessage[]>([]);
  const [_, setConnectionStats] = useState<ConnectionStats>({
    isConnected: false,
    lastEventTime: null,
    eventCount: 0,
  });

  function handleConnection(connected: boolean) {
    setConnectionStats((prev) => ({
      ...prev,
      isConnected: connected,
    }));
  }

  useEffect(() => {
    const sub = Subscriber.getInstance();

    sub.onMessage((msg) => {
      setMessages((prev) => {
        const newMessages = [...prev, msg];

        if (newMessages.length > 1000) {
          return newMessages.slice(-1000);
        }
        return newMessages;
      });

      setConnectionStats((prev) => ({
        ...prev,
        lastEventTime: Date.now(),
        eventCount: prev.eventCount + 1,
      }));
    });

    sub.subscribe(
      "6232c0c5-70c0-422b-bdd0-f9b46bbc0222",
      process.env.NEXT_PUBLIC_WS_URL!
    );

    handleConnection(true);

    return () => {
      sub.disconnectAll();
      handleConnection(false);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent animate-in slide-in-from-left duration-500">
                CodeStream
              </h1>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground animate-in slide-in-from-left duration-700">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                <span>{24} coders live</span>
                <Badge variant="secondary" className="ml-2 animate-pulse">
                  Hot
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-in slide-in-from-right duration-500">
              <span className="hidden sm:inline">Total viewers:</span>
              <span className="font-semibold text-foreground">
                {/* <AnimatedCounter value={totalViewers} /> */}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 animate-in slide-in-from-bottom duration-700">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                Featured Coder
                <Badge variant="destructive" className="animate-pulse">
                  LIVE
                </Badge>
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span className="font-medium">
                  {/* <AnimatedCounter value={featuredCoder.viewerCount} /> viewers */}
                </span>
                <span>•</span>
                <span>Solving: Two Sum</span>
              </div>
            </div>

            <MonacoEditor
              coderName={featuredCoder.name}
              problemTitle={featuredCoder.problem}
              avatarUrl={featuredCoder.avatar}
              initialCode={featuredCoder.code}
              className="h-[600px] shadow-xl shadow-primary/5"
              messages={messages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
