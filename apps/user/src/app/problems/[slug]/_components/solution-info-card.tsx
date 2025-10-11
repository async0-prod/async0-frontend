import { CodeBlock } from "@/components/code-block";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const code = `
  const hasPath = (graph, src, dst) => {
    if (src === dst) return true

    const stack = [src]

    while(stack.length != 0){
      const current = stack.pop()
      if(current === dst) return true

      for(let neighbor of graph[current]){
        stack.push(neighbor)
      }
    }

    return false

  };

`;

export default function SolutionInfoCard() {
  return (
    <Card className="border-charcoal/20 text-charcoal dark:border-almond/20 dark:text-almond gap-4 border-none bg-transparent shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center">Solution 1</CardTitle>
        <CardDescription>A simple DFS using a stack.</CardDescription>
      </CardHeader>
      <CodeBlock code={code} lang="ts" />
    </Card>
  );
}
