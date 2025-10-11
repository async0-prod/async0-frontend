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
      <div className="text-almond flex h-full w-full items-center justify-center text-xs">
        <Loader size={16} className="mr-1 animate-spin" />
        Running...
      </div>
    );

  if (!data)
    return (
      <div className="flex h-20 items-center justify-center">No output</div>
    );

  return (
    <ScrollArea className="h-full p-4 text-sm">
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "100%", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{
          type: "tween",
          duration: 0.2,
          ease: [0.4, 0.0, 0.2, 1],
        }}
      >
        <div className="flex flex-col gap-2 p-2">
          <div className="text-muted-foreground flex items-center text-xs">
            <AlertCircle className="mr-1 h-3 w-3" /> stdout
          </div>
          <div className="text-almond overflow-x-auto">
            {data.data.result ? (
              data.data.result
            ) : (
              <p className="text-muted-foreground">
                No output. Try adding console.log statements.
              </p>
            )}
          </div>
        </div>

        {data.data.error_message && (
          <div className="flex flex-col gap-2 p-2">
            <div className="text-muted-foreground flex items-center text-xs">
              <AlertCircle className="mr-1 h-3 w-3" /> stderr
            </div>
            <div className="overflow-x-auto text-red-400">
              {data.data.error_message}
            </div>
          </div>
        )}
      </motion.div>
    </ScrollArea>
  );
}
