import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { unescapeCode } from "@/lib/codeFormat";
import { problemType, judge0ResponseType, testcaseType } from "@/lib/types";
import { CheckCheck, Bookmark, Flame } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function ProblemInfoCard({
  problem,
  problemSubmitStatus,
}: {
  problem: problemType;
  problemSubmitStatus: judge0ResponseType[] | null;
}) {
  const { name, difficulty, testcases, link } = problem;

  return (
    <Card className="bg-transparent border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond border-none shadow-none gap-4">
      <CardHeader className="p-0">
        <div className="flex justify-between items-start ">
          <div>
            <CardTitle className="text-2xl font-semibold text-wrap">
              {name}
            </CardTitle>
            <CardDescription className="flex items-center gap-6 sm:gap-4 text-xs text-center">
              <div className="flex items-center text-xs rounded-full ">
                <span>Time: O(1)</span>
              </div>
              <div className="flex items-center text-xs rounded-full ">
                <span>Space: O(n)</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-xs rounded-full ">
                <CheckCheck
                  size={13}
                  className="text-charcoal/60 dark:text-almond/60 mb-0.5"
                />
                <span>67</span>
              </div>
              <div className="flex items-center gap-1 justify-center text-xs rounded-full ">
                <Bookmark
                  size={13}
                  className="text-charcoal/60 dark:text-almond/60 mb-0.5"
                />
                <span>343k</span>
              </div>
              <div className="flex items-center gap-1 justify-center text-xs rounded-full ">
                <Flame
                  size={13}
                  className="text-charcoal/60 dark:text-almond/60 mb-0.5"
                />
                <span>{difficulty}</span>
              </div>
            </CardDescription>
          </div>
          <Bookmark size={20} className="mt-2 cursor-pointer" />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="mb-4 flex flex-col gap-2">
          <p>
            Given an integer array nums, return true if any value appears more
            than once in the array, otherwise return false.
          </p>
          <Link
            href={link ?? "#"}
            target="#"
            className="text-xs hover:underline text-charcoal/60  w-fit"
          >
            View problem on neetcode
          </Link>
        </div>

        {testcases.map((testcase, i) => {
          return (
            <motion.div
              key={testcase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <TestCaseBlock
                testcase={testcase}
                testcaseStatus={
                  problemSubmitStatus ? problemSubmitStatus[i] : null
                }
              />
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function TestCaseBlock({
  testcase,
  testcaseStatus,
}: {
  testcase: testcaseType;
  testcaseStatus: judge0ResponseType | null;
}) {
  function getStatusColor(statusId: number | null) {
    switch (statusId) {
      case 3: // Accepted
        return "text-green-800 border-green-300";
      case 4: // Wrong Answer
        return "text-red-800 border-red-300";
      case 5: // Time Limit Exceeded
        return "text-yellow-800 border-yellow-300";
      default:
        return " border-charcoal/20";
    }
  }

  return (
    <Card
      className={`px-4 py-4 mb-6 text-sm text-muted-foreground overflow-x-auto text-nowrap bg-transparent border-charcoal/20 ${getStatusColor(testcaseStatus?.status.id ?? null)}`}
    >
      <div className="flex flex-col items-start justify-between">
        {/* <code>Testcase - {i}</code> */}
        <div>
          <pre className="overflow-x-auto">
            <code>{`${unescapeCode(testcase.input)}`}</code>
          </pre>
          <pre className="overflow-x-auto">{`Output: ${unescapeCode(
            testcase.output
          )}`}</pre>
        </div>
      </div>
    </Card>
  );
}
