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

import { Badge } from "@/components/ui/badge";
import NavigationPane from "@/components/nav-panel";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="my-4 mr-4 flex w-full flex-col overflow-hidden rounded-xl border">
      <main className="bg-background flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <div>
            <div className="text-4xl font-bold">Morning Gourav!</div>
            <p className="text-muted-foreground text-xs">
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
                <CardTitle className="flex items-center gap-1">
                  Trending Problems
                  <Badge variant="outline" className="px-2 py-0 text-xs">
                    782 new attempts this week <TrendingUp />
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Problems with the most bookmarks
                </CardDescription>
              </div>
              <BookMarked className="text-muted-foreground ml-auto h-5 w-5" />
            </CardHeader>
            <CardContent>{/* <PopularProblems /> */}</CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-1">
                <CardTitle className="">Trending Solutions</CardTitle>
                <CardDescription>
                  Solutions with the most upvotes
                </CardDescription>
              </div>
              <ThumbsUp className="text-muted-foreground ml-auto h-5 w-5" />
            </CardHeader>
            <CardContent>{/* <PopularSolutions /> */}</CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Problems Solved
              </CardTitle>
              <CheckCircle className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-muted-foreground text-xs">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-muted-foreground text-xs">
                +4% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Activity className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14 days</div>
              <p className="text-muted-foreground text-xs">Current streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Time
              </CardTitle>
              <Clock className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24 min</div>
              <p className="text-muted-foreground text-xs">Per problem</p>
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
                  <CardTitle className="">Problem Solving Frequency</CardTitle>
                  <CardDescription>
                    Number of problems solved over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">{/* <Overview /> */}</CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="">Difficulty Distribution</CardTitle>
                  <CardDescription>
                    Problems solved by difficulty level
                  </CardDescription>
                </CardHeader>
                <CardContent>{/* <DifficultyDistribution /> */}</CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle className="">Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent problem submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>{/* <RecentActivity /> */}</CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="">Topic Progress</CardTitle>
                  <CardDescription>
                    Completion percentage by topic
                  </CardDescription>
                </CardHeader>
                <CardContent>{/* <TopicProgress /> */}</CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lists" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="">Problem Lists Completion</CardTitle>
                <CardDescription>
                  Your progress across different problem lists
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                {/* <CompletionStats /> */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="">Topic Progress</CardTitle>
                <CardDescription>
                  Your progress across different topics
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                {/* <TopicProgress showAll={true} /> */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
