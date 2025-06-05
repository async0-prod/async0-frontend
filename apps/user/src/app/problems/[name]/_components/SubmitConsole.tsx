import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { judge0ResponseType } from "@/lib/types";
import { formatMemory } from "@/lib/utils";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

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
}

export default function SubmitConsole({
  data,
}: {
  data: judge0ResponseType[] | null;
}) {
  if (!data) return;

  const getOverallStatus = () => {
    if (data.some((result) => result.status.id === 6)) {
      return { id: 6, description: "Compilation Error" };
    }

    if (data.every((result) => result.status.id === 3)) {
      return { id: 3, description: "Accepted" };
    }

    if (data.some((result) => result.status.id === 4)) {
      return { id: 4, description: "Wrong Answer" };
    }

    if (data.some((result) => result.status.id === 5)) {
      return { id: 5, description: "Time Limit Exceeded" };
    }

    if (
      data.some((result) => result.status.id >= 7 && result.status.id <= 12)
    ) {
      return { id: 7, description: "Runtime Error" };
    }

    return data[0]?.status || { id: 0, description: "Unknown" };
  };

  const overallStatus = getOverallStatus();
  const passedCount = data.filter((result) => result.status.id === 3).length;
  const totalCount = data.length;

  return (
    <ScrollArea className="h-full w-full p-4 font-mono text-sm">
      <div className="space-y-4">
        {/* Overall status */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge
              className={`flex items-center gap-1 px-2 py-1 font-medium ${getStatusColor(overallStatus.id)}`}
              variant="outline"
            >
              {getStatusIcon(overallStatus.id)}
              {overallStatus.description || "Unknown Status"}
            </Badge>

            <Badge variant="outline" className="bg-slate-100">
              {passedCount}/{totalCount} test cases passed
            </Badge>
          </div>

          {/* Compilation error is shown at the top level since it applies to all test cases */}
          {data.some((result) => result.compile_output) && (
            <div className="space-y-1 mt-2">
              <div className="flex items-center text-xs text-slate-500">
                <AlertCircle className="mr-1 h-3 w-3" /> Compilation Error
              </div>
              <pre className="rounded-md bg-slate-950 p-3 text-red-400 overflow-x-auto">
                {data.find((result) => result.compile_output)?.compile_output}
              </pre>
            </div>
          )}
        </div>

        {/* Test cases */}
        <div className="space-y-2">
          {data.map((d, index) => (
            <TestCaseItem key={index} data={d} index={index} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

function TestCaseItem({
  data,
  index,
}: {
  data: judge0ResponseType;
  index: number;
}) {
  // Get status icon based on status ID
  function getStatusIcon(statusId: number) {
    switch (statusId) {
      case 3: // Accepted
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 4: // Wrong Answer
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 5: // Time Limit Exceeded
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex w-full items-center justify-between text-left">
        <div className="flex items-center gap-2">
          {getStatusIcon(data.status.id)}
          <span className="font-medium">Test Case {index + 1}</span>
        </div>
        <div className="flex items-center gap-2">
          {data.time && (
            <span className="text-xs text-slate-500">{data.time}s</span>
          )}
          {data.memory && (
            <span className="text-xs text-slate-500">
              {formatMemory(data.memory)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
