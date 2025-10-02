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
      <div className="w-full flex items-center justify-center h-full">
        <Loader className="animate-spin" />
        Running...
      </div>
    );
  }

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
      case 1:
      case 2:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 3:
        return "bg-green-100 text-green-800 border-green-300";
      case 4:
      case 5:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  }

  return (
    <ScrollArea className="h-full w-full p-4 font-mono text-sm">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge
              className={`flex items-center gap-1 px-2 py-1 font-medium ${getStatusColor(data.data.overall_status_id)}`}
              variant="outline"
            >
              {getStatusIcon(data.data.overall_status_id)}
              {data.data.overall_status}
            </Badge>

            <Badge variant="outline" className="bg-slate-100">
              {data.data.passed_testcases}/{data.data.total_testcases} test
              cases passed
            </Badge>
          </div>
        </div>

        {/* Test cases */}
        <div className="space-y-2">
          {data.data.testcases_results.map((tc, index) => (
            <TestCaseItem key={index} tc={tc} index={index} />
          ))}
        </div>
      </div>
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
    <div className="border rounded-md overflow-hidden">
      <div className="flex w-full items-center justify-between text-left">
        <div className="flex items-center gap-2">
          {getStatusIcon(tc.tc_status_id)}
          <span className="font-medium">Test Case {index + 1}</span>
        </div>
        <div className="flex items-center gap-2">
          {tc.tc_time && (
            <span className="text-xs text-slate-500">{tc.tc_time}s</span>
          )}
          {tc.tc_memory && (
            <span className="text-xs text-slate-500">
              {formatMemory(tc.tc_memory)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
