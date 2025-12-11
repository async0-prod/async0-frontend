"use client";

import { MonacoEditor } from "./_components/editor";
import { useState } from "react";
import { WebsocketMessage } from "@/lib/types";
import { Monitor, Send, Settings } from "lucide-react";
import { motion } from "motion/react";
import { Header } from "./_components/header";

const THEME = {
  charcoal: "#1e1b18",
  almond: "#eee5da",
  accent: "#d4c5b0", // Slightly darker almond for borders
  glass: "rgba(30, 27, 24, 0.8)",
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

  // useEffect(() => {
  //   const sub = Subscriber.getInstance();

  //   sub.onMessage((msg) => {
  //     setMessages((prev) => {
  //       const newMessages = [...prev, msg];

  //       if (newMessages.length > 1000) {
  //         return newMessages.slice(-1000);
  //       }
  //       return newMessages;
  //     });

  //     setConnectionStats((prev) => ({
  //       ...prev,
  //       lastEventTime: Date.now(),
  //       eventCount: prev.eventCount + 1,
  //     }));
  //   });

  //   sub.subscribe(
  //     "6232c0c5-70c0-422b-bdd0-f9b46bbc0222",
  //     env("NEXT_PUBLIC_WS_URL")!,
  //   );

  //   handleConnection(true);

  //   return () => {
  //     sub.disconnectAll();
  //     handleConnection(false);
  //   };
  // }, []);

  const MOCK_CHAT = [
    {
      id: 1,
      user: "dev_guru",
      color: "#FF6B6B",
      text: "Yo, that recursion logic is clean! 🔥",
    },
    {
      id: 2,
      user: "rust_ace",
      color: "#4ECDC4",
      text: "Why not use an iterative approach?",
    },
    {
      id: 3,
      user: "algo_bot",
      color: "#FFE66D",
      text: "Welcome to the stream everyone!",
    },
    {
      id: 4,
      user: "junior_dev",
      color: "#FF9F1C",
      text: "Can you explain line 14 again?",
    },
    { id: 5, user: "vim_user", color: "#6B5B95", text: ":q!" },
  ];

  const StreamerCam = () => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="group absolute top-4 right-4 z-10 aspect-video w-64 overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl"
    >
      {/* Mock Video Feed */}
      <div className="relative h-full w-full bg-zinc-800">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80"
          alt="Streamer"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur-md">
          CAM 01
        </div>
      </div>
    </motion.div>
  );

  const ChatMessage = ({ msg }: { msg: (typeof MOCK_CHAT)[0] }) => (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="mb-3 text-sm leading-relaxed break-words"
    >
      <span
        style={{ color: msg.color }}
        className="mr-2 cursor-pointer font-bold hover:underline"
      >
        {msg.user}:
      </span>
      <span className="text-[#eee5da] opacity-90">{msg.text}</span>
    </motion.div>
  );

  const ChatSidebar = () => {
    return (
      <aside
        className="relative hidden w-80 flex-col border-l lg:flex"
        style={{
          backgroundColor: THEME.charcoal,
          borderColor: "rgba(238, 229, 218, 0.1)",
        }}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-3 text-xs font-semibold tracking-wider text-[#eee5da] uppercase opacity-70">
          <span>Stream Chat</span>
          <Monitor size={14} />
        </div>

        {/* Chat Messages Area */}
        <div className="scrollbar-thin scrollbar-thumb-white/10 flex-1 overflow-y-auto p-4">
          {MOCK_CHAT.map((msg) => (
            <ChatMessage key={msg.id} msg={msg} />
          ))}
          {/* Fading gradient at top to smooth scrolling looks */}
          <div className="pointer-events-none absolute top-10 right-0 left-0 h-4 bg-gradient-to-b from-[#1e1b18] to-transparent" />
        </div>

        {/* Chat Input */}
        <div className="border-t border-white/10 bg-[#1e1b18] p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Send a message..."
              className="w-full rounded-lg bg-white/5 py-2.5 pr-10 pl-3 text-sm text-[#eee5da] placeholder-white/30 transition-all focus:ring-1 focus:ring-[#eee5da]/30 focus:outline-none"
            />
            <button className="absolute top-2 right-2 text-[#eee5da]/50 transition-colors hover:text-[#eee5da]">
              <Send size={16} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-[#eee5da] opacity-40">
            <span>0 / 500</span>
            <button className="transition-opacity hover:opacity-100">
              <Settings size={14} />
            </button>
          </div>
        </div>
      </aside>
    );
  };

  return (
    <div className="selection:bg-almond selection:text-charcoal flex h-screen w-full flex-col overflow-hidden">
      <Header />

      {/* <div className="mb-6 flex items-center gap-4 px-6">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-orange-500 text-sm font-bold text-white ring-2 ring-[#1e1b18]">
            JS
          </div>
          <div className="absolute -right-1 -bottom-1 rounded border-2 border-[#1e1b18] bg-red-500 px-1.5 text-[10px] font-bold text-white">
            LIVE
          </div>
        </div>
        <div>
          <h1 className="text-sm leading-tight font-semibold md:text-base">
            Solving Two Sum
          </h1>
          <p className="flex items-center gap-1 text-xs opacity-60">
            <span className="text-purple-400">Gourav Barik</span>
          </p>
        </div>
      </div> */}

      <main className="relative flex flex-1 overflow-hidden">
        <MonacoEditor
          initialCode="// Waiting for stream..."
          messages={messages}
        />

        {/* <StreamerCam /> */}

        {/* <div
            className="pointer-events-none absolute bottom-0 z-10 flex h-6 w-full items-center px-4 font-mono text-[10px]"
            style={{
              backgroundColor: "#1e1b18",
              color: THEME.almond,
              borderTop: "1px solid rgba(238, 229, 218, 0.1)",
            }}
          >
            <div className="flex gap-4 opacity-60">
              <span>Ln 14, Col 22</span>
              <span>UTF-8</span>
              <span>TypeScript</span>
            </div>
            <div className="ml-auto flex items-center gap-2 opacity-60">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              <span>Connected</span>
            </div>
          </div> */}

        {/* <ChatSidebar /> */}
      </main>
    </div>
  );
}
