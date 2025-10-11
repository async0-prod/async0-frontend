import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeSubmitResult, TestcaseResult } from "@/lib/types";
import { formatMemory } from "@/lib/utils";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Loader,
} from "lucide-react";
import { motion } from "motion/react";

interface SubmitConsoleProps {
  data: CodeSubmitResult | null;
  isSubmitPending: boolean;
}

export default function SubmitConsole({
  data,
  isSubmitPending,
}: SubmitConsoleProps) {
  if (isSubmitPending) {
    return (
      <div className="text-almond flex h-full w-full items-center justify-center text-xs">
        <Loader size={16} className="mr-1 animate-spin" />
        Running...
      </div>
    );
  }

  if (!data)
    return (
      <div className="flex h-20 items-center justify-center">No output</div>
    );

  console.log(data);

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
      case 1:
      case 2:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 3:
        return "bg-green-100 text-green-800 border-green-300";
      case 4:
        return "bg-red-100 text-red-800 border-red-300";
      case 5:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  }

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
        <div className="flex items-center justify-start gap-2 p-2">
          <Badge
            className={`${getStatusColor(data.data?.overall_status_id ?? 0)}`}
          >
            {getStatusIcon(data.data?.overall_status_id ?? 0)}
            {data.data?.overall_status}
          </Badge>

          <Badge className="border-almond">
            {data.data?.passed_testcases}/{data.data?.total_testcases} testcases
            passed
          </Badge>
        </div>

        {/* Test cases */}
        <div className="flex flex-col gap-2 p-2">
          {data.data?.testcases_results.map((tc, index) => (
            <TestCaseItem key={index} tc={tc} index={index} />
          ))}
        </div>
      </motion.div>
    </ScrollArea>
  );
}

function TestCaseItem({ tc, index }: { tc: TestcaseResult; index: number }) {
  function getStatusIcon(statusId: number) {
    switch (statusId) {
      case 3:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 4:
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 5:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  }

  return (
    <div className="flex items-center justify-start gap-9">
      <div className="flex items-center gap-2">
        {getStatusIcon(tc.tc_status_id)}
        <span className="font-medium">Testcase {index + 1}</span>
      </div>
      <div className="flex items-center gap-2">
        {tc.tc_time && <span>{tc.tc_time}s</span>}
        {tc.tc_memory && <span>{formatMemory(tc.tc_memory)}</span>}
      </div>
    </div>
  );
}
