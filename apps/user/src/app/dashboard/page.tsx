import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  BookMarked,
  CheckCircle,
  Clock,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import { Overview } from "./_components/Overview";
import { DifficultyDistribution } from "./_components/DifficultyDistribution";
import { RecentActivity } from "./_components/RecentActivity";
import { CompletionStats } from "./_components/CompletionStats";
import { TopicProgress } from "./_components/TopicProgress";
import { PopularProblems } from "./_components/PopularProblems";
import { PopularSolutions } from "./_components/PopularSolutions";
import { Badge } from "@/components/ui/badge";
import NavigationPane from "@/components/NavigationPane";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col rounded-xl my-4 mr-4 border-1 overflow-hidden">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <div className="flex items-center">
          <div>
            <div className="text-4xl font-bold">Morning Gourav!</div>
            <p className="text-xs text-muted-foreground">
              {`Been a while since you're back huh?`}
            </p>
          </div>

          <div className="flex-1">
            <NavigationPane />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-1">
                <CardTitle className="font-manrope flex items-center gap-1">
                  Trending Problems
                  <Badge variant="outline" className="px-2 py-0 text-xs">
                    782 new attempts this week <TrendingUp />
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Problems with the most bookmarks
                </CardDescription>
              </div>
              <BookMarked className="ml-auto h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <PopularProblems />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-1">
                <CardTitle className="font-manrope">
                  Trending Solutions
                </CardTitle>
                <CardDescription>
                  Solutions with the most upvotes
                </CardDescription>
              </div>
              <ThumbsUp className="ml-auto h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <PopularSolutions />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Problems Solved
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                +4% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14 days</div>
              <p className="text-xs text-muted-foreground">Current streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24 min</div>
              <p className="text-xs text-muted-foreground">Per problem</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="p-4">
              Overview
            </TabsTrigger>
            <TabsTrigger value="lists" className="p-4">
              Problem Lists
            </TabsTrigger>
            <TabsTrigger value="topics" className="p-4">
              Topics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle className="font-manrope">
                    Problem Solving Frequency
                  </CardTitle>
                  <CardDescription>
                    Number of problems solved over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="font-manrope">
                    Difficulty Distribution
                  </CardTitle>
                  <CardDescription>
                    Problems solved by difficulty level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DifficultyDistribution />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle className="font-manrope">
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your recent problem submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="font-manrope">Topic Progress</CardTitle>
                  <CardDescription>
                    Completion percentage by topic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TopicProgress />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lists" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-manrope">
                  Problem Lists Completion
                </CardTitle>
                <CardDescription>
                  Your progress across different problem lists
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <CompletionStats />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-manrope">Topic Progress</CardTitle>
                <CardDescription>
                  Your progress across different topics
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TopicProgress showAll={true} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
