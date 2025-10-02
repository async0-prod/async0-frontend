import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeRunResult } from "@/lib/types";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Loader,
} from "lucide-react";
import { motion } from "motion/react";

interface RunConsoleProps {
  data: CodeRunResult | null;
  isRunPending: boolean;
}

export default function RunConsole({ data, isRunPending }: RunConsoleProps) {
  if (isRunPending)
    return (
      <div className="w-full flex items-center justify-center h-full">
        <Loader className="animate-spin" />
        Running...
      </div>
    );

  if (!data)
    return (
      <div className="flex h-20 items-center justify-center text-slate-500">
        No output available
      </div>
    );

  function getStatusIcon(statusId: number) {
    switch (statusId) {
      case 1: // In Queue
      case 2: // Processing
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 3: // Accepted
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 4: // Wrong Answer
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 5: // Time Limit Exceeded
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 6: // Compilation Error
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  }

  function getStatusColor(statusId: number) {
    switch (statusId) {
      case 2:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 3:
        return "bg-green-100 text-green-800 border-green-300";
      case 5:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  }

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
            className={`flex items-center gap-1 px-2 py-1 font-medium ${getStatusColor(data.data.status_id)}`}
            variant="outline"
          >
            {getStatusIcon(data.data.status_id)}
            {data.data.status_description}
          </Badge>
        </div>

        {data.data.result && (
          <div className="space-y-1">
            <pre className="rounded-md bg-slate-950 p-3 text-green-400 overflow-x-auto">
              {data.data.result}
            </pre>
          </div>
        )}

        {data.data.error_message && (
          <div className="space-y-1">
            <div className="flex items-center text-xs text-slate-500">
              <AlertCircle className="mr-1 h-3 w-3" /> stderr
            </div>
            <pre className="rounded-md bg-slate-950 p-3 text-red-400 overflow-x-auto">
              {data.data.error_message}
            </pre>
          </div>
        )}
      </motion.div>

      <div className="pt-10" />
    </ScrollArea>
  );
}
