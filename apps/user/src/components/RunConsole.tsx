import { judge0ResponseType } from "@/lib/types";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  TerminalIcon,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

export default function RunConsole({
  data,
}: {
  data: judge0ResponseType | null;
}) {
  const formatMemory = (memory: number | null) => {
    if (!memory) return "N/A";
    return memory < 1024 ? `${memory} KB` : `${(memory / 1024).toFixed(2)} MB`;
  };

  const getStatusIcon = (statusId: number) => {
    switch (statusId) {
      case 1: // In Queue
      case 2: // Processing
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 3: // Accepted
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 4: // Wrong Answer
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 5: // Time Limit Exceeded
        return <Clock className="h-4 w-4 text-red-500" />;
      case 6: // Compilation Error
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 7: // Runtime Error (SIGSEGV)
      case 8: // Runtime Error (SIGXFSZ)
      case 9: // Runtime Error (SIGFPE)
      case 10: // Runtime Error (SIGABRT)
      case 11: // Runtime Error (NZEC)
      case 12: // Runtime Error (Other)
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 13: // Internal Error
      case 14: // Exec Format Error
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (statusId: number) => {
    switch (statusId) {
      case 1:
      case 2:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 3:
        return "bg-green-100 text-green-800 border-green-300";
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        return "bg-red-100 text-red-800 border-red-300";
      case 13:
      case 14:
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (!data) return;

  return (
    <ScrollArea className="h-full w-full p-4 font-mono text-sm">
      <motion.div
        className="space-y-4"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "40%", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{
          type: "tween",
          duration: 0.2,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            className={`flex items-center gap-1 px-2 py-1 font-medium ${getStatusColor(data.status.id)}`}
            variant="outline"
          >
            {getStatusIcon(data.status.id)}
            {data.status.description || "Unknown Status"}
          </Badge>

          {data.time && (
            <Badge variant="outline" className="bg-slate-100">
              <Clock className="mr-1 h-3 w-3" /> {data.time}s
            </Badge>
          )}

          {data.memory !== null && (
            <Badge variant="outline" className="bg-slate-100">
              <TerminalIcon className="mr-1 h-3 w-3" />{" "}
              {formatMemory(data.memory)}
            </Badge>
          )}
        </div>

        {data.stdout && (
          <div className="space-y-1">
            <div className="flex items-center text-xs text-slate-500">
              <TerminalIcon className="mr-1 h-3 w-3" /> stdout
            </div>
            <pre className="rounded-md bg-slate-950 p-3 text-green-400 overflow-x-auto">
              {data.stdout}
            </pre>
          </div>
        )}

        {data.stderr && (
          <div className="space-y-1">
            <div className="flex items-center text-xs text-slate-500">
              <AlertCircle className="mr-1 h-3 w-3" /> stderr
            </div>
            <pre className="rounded-md bg-slate-950 p-3 text-red-400 overflow-x-auto">
              {data.stderr}
            </pre>
          </div>
        )}

        {data.compile_output && (
          <div className="space-y-1">
            <div className="flex items-center text-xs text-slate-500">
              <Info className="mr-1 h-3 w-3" /> compilation output
            </div>
            <pre className="rounded-md bg-slate-950 p-3 text-yellow-400 overflow-x-auto">
              {data.compile_output}
            </pre>
          </div>
        )}

        {data.message && (
          <div className="space-y-1">
            <div className="flex items-center text-xs text-slate-500">
              <Info className="mr-1 h-3 w-3" /> message
            </div>
            <div className="rounded-md bg-slate-100 p-3 text-slate-800">
              {data.message}
            </div>
          </div>
        )}

        {data.output && !data.stdout && (
          <div className="space-y-1">
            <div className="flex items-center text-xs text-slate-500">
              <TerminalIcon className="mr-1 h-3 w-3" /> output
            </div>
            <pre className="rounded-md bg-slate-950 p-3 text-green-400 overflow-x-auto">
              {data.output}
            </pre>
          </div>
        )}

        {!data.stdout &&
          !data.stderr &&
          !data.compile_output &&
          !data.message &&
          !data.output && (
            <div className="flex h-20 items-center justify-center text-slate-500">
              No output available
            </div>
          )}
      </motion.div>

      <div className="pt-10" />
    </ScrollArea>
  );
}
