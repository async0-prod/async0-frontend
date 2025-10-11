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
      process.env.NEXT_PUBLIC_WS_URL!,
    );

    handleConnection(true);

    return () => {
      sub.disconnectAll();
      handleConnection(false);
    };
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="animate-in slide-in-from-bottom duration-700 xl:col-span-3">
            <div className="mb-4">
              <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                Featured Coder
                <Badge variant="destructive" className="animate-pulse">
                  LIVE
                </Badge>
              </h2>
              <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
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
              className="shadow-primary/5 h-[600px] shadow-xl"
              messages={messages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
