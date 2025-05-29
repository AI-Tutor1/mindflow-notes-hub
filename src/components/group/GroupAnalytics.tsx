
import { useState } from "react";
import { 
  TrendingUp, 
  Users, 
  Award, 
  Clock, 
  BarChart3, 
  PieChart, 
  Calendar, 
  Target, 
  BookOpen, 
  Activity,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Cell, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

interface StudyGroup {
  id: string;
  name: string;
  role: "teacher" | "student" | "admin";
}

interface GroupAnalyticsProps {
  group: StudyGroup;
}

export const GroupAnalytics = ({ group }: GroupAnalyticsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [subjectsExpanded, setSubjectsExpanded] = useState(true);
  const [gradesExpanded, setGradesExpanded] = useState(false);
  const [performanceExpanded, setPerformanceExpanded] = useState(true);
  const [tagsExpanded, setTagsExpanded] = useState(true);

  // Sample data matching the reference
  const scoreDistributionData = [
    { range: "0-20", count: 0 },
    { range: "21-40", count: 1 },
    { range: "41-60", count: 3 },
    { range: "61-80", count: 8 },
    { range: "81-100", count: 12 }
  ];

  const subjectPerformanceData = [
    { subject: "Statistics", score: 95 },
    { subject: "Calculus", score: 82 },
    { subject: "Geometry", score: 78 },
    { subject: "Algebra", score: 85 }
  ];

  const assessmentTypeData = [
    { name: "Tests", value: 45, color: "#2563eb" },
    { name: "Quizzes", value: 30, color: "#16a34a" },
    { name: "Study Plans", value: 25, color: "#ea580c" }
  ];

  const groupScoreTrendData = [
    { week: "Week 1", score: 77 },
    { week: "Week 2", score: 79 },
    { week: "Week 3", score: 81 },
    { week: "Week 4", score: 81.5 },
    { week: "Week 5", score: 83 },
    { week: "Week 6", score: 82 }
  ];

  const sessionData = [
    { student: "Lisa Wang", sessions: 0.8 },
    { student: "Alex Kim", sessions: 0.6 },
    { student: "Emma Davis", sessions: 0.4 },
    { student: "Mike Johnson", sessions: 0.3 },
    { student: "Sarah Chen", sessions: 0.2 }
  ];

  const loginFrequencyData = [
    { day: "Mon", logins: 25 },
    { day: "Tue", logins: 22 },
    { day: "Wed", logins: 28 },
    { day: "Thu", logins: 24 },
    { day: "Fri", logins: 26 }
  ];

  const studentPerformanceData = [
    { 
      name: "Sarah Chen", 
      avgScore: "94.8%", 
      completion: "96.2%", 
      timeSpent: "52 min", 
      sessions: 45, 
      lastActive: "2 hours ago",
      tags: ["High-achiever", "Advanced"]
    },
    { 
      name: "Lisa Wang", 
      avgScore: "90.1%", 
      completion: "93.4%", 
      timeSpent: "49 min", 
      sessions: 43, 
      lastActive: "1 hour ago",
      tags: ["High-achiever"]
    },
    { 
      name: "Emma Davis", 
      avgScore: "86.7%", 
      completion: "91.8%", 
      timeSpent: "47 min", 
      sessions: 41, 
      lastActive: "3 hours ago",
      tags: ["High-achiever"]
    },
    { 
      name: "Alex Kim", 
      avgScore: "83.4%", 
      completion: "88.9%", 
      timeSpent: "43 min", 
      sessions: 38, 
      lastActive: "3 hours ago",
      tags: []
    },
    { 
      name: "Mike Johnson", 
      avgScore: "78.2%", 
      completion: "82.5%", 
      timeSpent: "38 min", 
      sessions: 32, 
      lastActive: "1 day ago",
      tags: ["Needs support"]
    }
  ];

  const heatmapData = {
    students: ["Sarah Chen", "Mike Johnson", "Emma Davis", "Alex Kim", "Lisa Wang"],
    subjects: ["Algebra", "Geometry", "Calculus", "Statistics"],
    scores: {
      "Sarah Chen": { "Algebra": 95, "Geometry": 93, "Calculus": 96, "Statistics": 89 },
      "Mike Johnson": { "Algebra": 87, "Geometry": 78, "Calculus": 72, "Statistics": 85 },
      "Emma Davis": { "Algebra": 92, "Geometry": 85, "Calculus": 79, "Statistics": 87 },
      "Alex Kim": { "Algebra": 89, "Geometry": 91, "Calculus": 83, "Statistics": 92 },
      "Lisa Wang": { "Algebra": 94, "Geometry": 88, "Calculus": 90, "Statistics": 86 }
    }
  };

  const chartConfig = {
    score: { label: "Score", color: "#2563eb" },
    count: { label: "Count", color: "#2563eb" },
    sessions: { label: "Sessions", color: "#2563eb" },
    logins: { label: "Logins", color: "#ea580c" }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 90) return "text-green-700";
    if (score >= 80) return "text-yellow-700";
    return "text-red-700";
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Filters Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-slate-900">Filters</h3>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            Clear All
          </Button>
        </div>

        {/* Subjects Filter */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setSubjectsExpanded(!subjectsExpanded)}
            className="w-full justify-between p-0 h-auto text-slate-700 hover:text-slate-900"
          >
            <span className="font-medium">Subjects</span>
            {subjectsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          {subjectsExpanded && (
            <div className="mt-3 space-y-2">
              {["Mathematics", "Physics", "Chemistry", "Biology", "English"].map((subject) => (
                <label key={subject} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-slate-300" defaultChecked={subject === "Mathematics"} />
                  <span className="text-slate-600">{subject}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Grades Filter */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setGradesExpanded(!gradesExpanded)}
            className="w-full justify-between p-0 h-auto text-slate-700 hover:text-slate-900"
          >
            <span className="font-medium">Grades</span>
            {gradesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {/* Performance Range */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setPerformanceExpanded(!performanceExpanded)}
            className="w-full justify-between p-0 h-auto text-slate-700 hover:text-slate-900"
          >
            <span className="font-medium">Performance Range</span>
            {performanceExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          {performanceExpanded && (
            <div className="mt-3">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>0%</span>
                <span>100%</span>
              </div>
              <div className="relative">
                <div className="w-full h-2 bg-slate-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: "100%" }}></div>
                </div>
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full -mt-1 border-2 border-white shadow"></div>
                <div className="absolute right-0 top-0 w-4 h-4 bg-blue-500 rounded-full -mt-1 border-2 border-white shadow"></div>
              </div>
            </div>
          )}
        </div>

        {/* Student Tags */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setTagsExpanded(!tagsExpanded)}
            className="w-full justify-between p-0 h-auto text-slate-700 hover:text-slate-900"
          >
            <span className="font-medium">Student Tags</span>
            {tagsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          {tagsExpanded && (
            <div className="mt-3 space-y-2">
              {["At-risk", "High-achiever", "Needs support", "Advanced"].map((tag) => (
                <label key={tag} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-slate-600">{tag}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-slate-900">Group Analytics</h1>
              <select className="border border-slate-300 rounded-md px-3 py-1 text-sm">
                <option>Mathematics - Grade 10</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search students, topics, assignments..."
                  className="pl-10 w-80"
                />
              </div>
              <select className="border border-slate-300 rounded-md px-3 py-2 text-sm">
                <option>Last 30 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="bg-white border-b border-slate-200 px-6">
            <TabsList className="grid w-full max-w-4xl grid-cols-5 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent"
              >
                Performance Metrics
              </TabsTrigger>
              <TabsTrigger 
                value="engagement" 
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent"
              >
                Engagement & Activity
              </TabsTrigger>
              <TabsTrigger 
                value="drill-downs" 
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent"
              >
                Drill-Downs
              </TabsTrigger>
              <TabsTrigger 
                value="export" 
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent"
              >
                Export & Reporting
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Avg. Group Score</p>
                      <p className="text-xl font-bold">82.4%</p>
                      <p className="text-xs text-green-600">↗ +2.3% from last period</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Completion Rate</p>
                      <p className="text-xl font-bold">87.2%</p>
                      <p className="text-xs text-green-600">↗ +5.1% from last period</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Avg. Time Spent</p>
                      <p className="text-xl font-bold">47 min</p>
                      <p className="text-xs text-red-600">↘ -3.2% from last period</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Top Performer</p>
                      <p className="text-lg font-bold">Sarah Chen</p>
                      <p className="text-xs text-slate-600">(94.8%)</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Award className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">At-Risk Students</p>
                      <p className="text-xl font-bold">3</p>
                      <p className="text-xs text-green-600">↗ -1 from last period</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Plan Adherence</p>
                      <p className="text-xl font-bold">91.5%</p>
                      <p className="text-xs text-green-600">↗ +1.8% from last period</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Group Score Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle>Group Score Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px]">
                      <LineChart data={groupScoreTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[70, 90]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Topic Mastery Heatmap */}
                <Card>
                  <CardHeader>
                    <CardTitle>Topic Mastery Heatmap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {heatmapData.subjects.map((subject) => (
                        <div key={subject}>
                          <h4 className="font-medium mb-2">{subject}</h4>
                          <div className="grid grid-cols-5 gap-2">
                            {heatmapData.students.map((student) => {
                              const score = heatmapData.scores[student][subject];
                              return (
                                <div
                                  key={`${subject}-${student}`}
                                  className={`p-2 text-center text-white rounded text-xs ${getScoreColor(score)}`}
                                >
                                  <div className="font-medium">{student.split(' ')[0]}</div>
                                  <div>{score}%</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Metrics Tab */}
            <TabsContent value="performance" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Score Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Score Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={scoreDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Score Range by Assessment Type */}
                <Card>
                  <CardHeader>
                    <CardTitle>Score Range by Assessment Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Tests</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-600">Min: 45%</span>
                          <div className="w-48 h-6 bg-blue-100 rounded relative">
                            <div className="h-full bg-blue-500 rounded" style={{ width: "78%" }}></div>
                            <div className="absolute right-2 top-0 h-full w-0.5 bg-blue-700"></div>
                          </div>
                          <span className="text-sm text-slate-600">Max: 98%</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Quizzes</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-600">Min: 52%</span>
                          <div className="w-48 h-6 bg-blue-100 rounded relative">
                            <div className="h-full bg-blue-500 rounded" style={{ width: "82%" }}></div>
                            <div className="absolute right-1 top-0 h-full w-0.5 bg-blue-700"></div>
                          </div>
                          <span className="text-sm text-slate-600">Max: 100%</span>
                          <span className="text-sm font-medium">82%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Study Plans</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-600">Min: 60%</span>
                          <div className="w-48 h-6 bg-blue-100 rounded relative">
                            <div className="h-full bg-blue-500 rounded" style={{ width: "85%" }}></div>
                            <div className="absolute right-0 top-0 h-full w-0.5 bg-blue-700"></div>
                          </div>
                          <span className="text-sm text-slate-600">Max: 98%</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Subject Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={subjectPerformanceData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="subject" type="category" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="score" fill="#2563eb" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Assessment Type Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Type Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <RechartsPieChart dataKey="value" data={assessmentTypeData} cx="50%" cy="50%" outerRadius={100} innerRadius={40}>
                          {assessmentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                        <Legend />
                      </RechartsPieChart>
                    </ChartContainer>
                    <div className="flex justify-center space-x-6 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">Tests (45%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span className="text-sm">Quizzes (30%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                        <span className="text-sm">Study Plans (25%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Engagement & Activity Tab */}
            <TabsContent value="engagement" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Total Sessions by Student */}
                <Card>
                  <CardHeader>
                    <CardTitle>Total Sessions by Student</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={sessionData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 1]} />
                        <YAxis dataKey="student" type="category" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="sessions" fill="#2563eb" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Average Session Length */}
                <Card>
                  <CardHeader>
                    <CardTitle>Average Session Length</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={sessionData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 1]} />
                        <YAxis dataKey="student" type="category" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="sessions" fill="#2563eb" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Top Resources Accessed */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Resources Accessed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Quadratic Equations Guide", views: 127 },
                        { name: "Practice Problem Set A", views: 98 },
                        { name: "Formula Reference Sheet", views: 86 },
                        { name: "Sample Test Questions", views: 73 },
                        { name: "Video: Solving Systems", views: 68 },
                        { name: "Interactive Graph Tool", views: 52 }
                      ].map((resource) => (
                        <div key={resource.name} className="flex items-center justify-between">
                          <span className="text-sm">{resource.name}</span>
                          <span className="text-sm text-blue-600 font-medium">{resource.views} views</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Login Frequency */}
                <Card>
                  <CardHeader>
                    <CardTitle>Login Frequency (Last 30 Days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={loginFrequencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="logins" fill="#ea580c" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Study Plan Completion Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle>Study Plan Completion Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-slate-600">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {[
                      { value: 3, color: "bg-yellow-200" },
                      { value: 5, color: "bg-green-200" },
                      { value: 2, color: "bg-red-200" },
                      { value: 4, color: "bg-yellow-200" },
                      { value: 6, color: "bg-green-200" },
                      { value: 1, color: "bg-red-200" },
                      { value: 0, color: "bg-slate-100" },
                      { value: 4, color: "bg-yellow-200" },
                      { value: 7, color: "bg-green-300" },
                      { value: 3, color: "bg-yellow-200" },
                      { value: 0, color: "bg-slate-100" },
                      { value: 0, color: "bg-slate-100" },
                      { value: 0, color: "bg-slate-100" },
                      { value: 0, color: "bg-slate-100" }
                    ].map((cell, index) => (
                      <div
                        key={index}
                        className={`h-12 rounded flex items-center justify-center text-sm font-medium ${cell.color}`}
                      >
                        {cell.value || ""}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                    <span>Less active</span>
                    <span>More active</span>
                  </div>
                </CardContent>
              </Card>

              {/* Student Activity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Student Activity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Sarah Chen", sessions: 45, avgTime: "52 min", level: "High" },
                      { name: "Mike Johnson", sessions: 32, avgTime: "38 min", level: "Medium" },
                      { name: "Emma Davis", sessions: 41, avgTime: "47 min", level: "High" },
                      { name: "Alex Kim", sessions: 38, avgTime: "43 min", level: "Medium" },
                      { name: "Lisa Wang", sessions: 43, avgTime: "49 min", level: "High" }
                    ].map((student) => (
                      <div key={student.name} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{student.name}</span>
                          <span className="text-sm text-slate-600">{student.sessions} sessions • {student.avgTime} avg</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.level === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {student.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Drill-Downs Tab */}
            <TabsContent value="drill-downs" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Student Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Avg. Score</TableHead>
                        <TableHead>Completion %</TableHead>
                        <TableHead>Time Spent</TableHead>
                        <TableHead>Sessions</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentPerformanceData.map((student) => (
                        <TableRow key={student.name}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell className={getScoreTextColor(parseFloat(student.avgScore))}>
                            {student.avgScore}
                          </TableCell>
                          <TableCell>{student.completion}</TableCell>
                          <TableCell>{student.timeSpent}</TableCell>
                          <TableCell>{student.sessions}</TableCell>
                          <TableCell>{student.lastActive}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {student.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    tag === "High-achiever" ? "bg-green-100 text-green-700" :
                                    tag === "Advanced" ? "bg-blue-100 text-blue-700" :
                                    "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Export & Reporting Tab */}
            <TabsContent value="export" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Report Builder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Report Name</label>
                    <Input placeholder="Group Analytics Report" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Select Metrics to Include</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-slate-700 mb-2">Performance</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <span className="text-sm">Average Score</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span className="text-sm">Assessment Scores</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-700 mb-2">Engagement</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <span className="text-sm">Completion Rate</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <span className="text-sm">Time Spent</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span className="text-sm">Resource Access</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <span className="text-sm">Session Count</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span className="text-sm">Last Active</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-700 mb-2">Progress</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span className="text-sm">Topic Mastery</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span className="text-sm">Login Frequency</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span className="text-sm">Study Plan Progress</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Selected Metrics (4)</label>
                    <div className="flex flex-wrap gap-2">
                      {["Average Score", "Completion Rate", "Time Spent", "Session Count"].map((metric) => (
                        <span key={metric} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center space-x-2">
                          <span>{metric}</span>
                          <button className="text-blue-500 hover:text-blue-700">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Export Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-medium mb-1">CSV</h3>
                      <p className="text-sm text-slate-600 mb-3">Comma-separated values for Excel</p>
                      <Button className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export as CSV
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" />
                      <h3 className="font-medium mb-1">PDF</h3>
                      <p className="text-sm text-slate-600 mb-3">Formatted report document</p>
                      <Button className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export as PDF
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <h3 className="font-medium mb-1">PowerPoint</h3>
                      <p className="text-sm text-slate-600 mb-3">Presentation slides</p>
                      <Button className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export as PowerPoint
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scheduled Reports */}
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <p className="text-sm text-slate-600">Enable automatic report scheduling</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-medium">Active Scheduled Reports</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Weekly Performance Summary</p>
                          <p className="text-sm text-slate-600">Every Monday at 9:00 AM • teacher@school.edu</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Monthly Engagement Report</p>
                          <p className="text-sm text-slate-600">First Monday of month • admin@school.edu</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
