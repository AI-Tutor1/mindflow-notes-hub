
import { TrendingUp, Users, Award, Clock, BarChart3, PieChart, Calendar, Target, BookOpen, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
  // Enhanced analytics data with more comprehensive metrics
  const performanceData = [
    { month: "Jan", avgScore: 78, participation: 65, assignments: 12, improvement: 2 },
    { month: "Feb", avgScore: 82, participation: 72, assignments: 14, improvement: 4 },
    { month: "Mar", avgScore: 85, participation: 78, assignments: 16, improvement: 3 },
    { month: "Apr", avgScore: 87, participation: 82, assignments: 18, improvement: 2 },
    { month: "May", avgScore: 91, participation: 88, assignments: 20, improvement: 4 }
  ];

  const topicMasteryData = [
    { topic: "Algebra", mastery: 95, students: 25, difficulty: "Medium" },
    { topic: "Calculus", mastery: 87, students: 23, difficulty: "Hard" },
    { topic: "Geometry", mastery: 92, students: 24, difficulty: "Easy" },
    { topic: "Statistics", mastery: 89, students: 22, difficulty: "Medium" },
    { topic: "Trigonometry", mastery: 84, students: 20, difficulty: "Hard" }
  ];

  const engagementData = [
    { name: "Active Students", value: 23, color: "#0EA5E9" },
    { name: "Occasional Students", value: 7, color: "#10B981" },
    { name: "Inactive Students", value: 2, color: "#F59E0B" }
  ];

  const assignmentAnalytics = [
    { assignment: "Quiz 1", submitted: 25, pending: 0, avgScore: 88, dueDate: "2024-01-15" },
    { assignment: "Homework 3", submitted: 23, pending: 2, avgScore: 91, dueDate: "2024-01-20" },
    { assignment: "Project A", submitted: 20, pending: 5, avgScore: 85, dueDate: "2024-01-25" },
    { assignment: "Quiz 2", submitted: 24, pending: 1, avgScore: 89, dueDate: "2024-01-30" }
  ];

  const studentProgressData = [
    { student: "Alex Chen", algebra: 95, calculus: 88, geometry: 92, statistics: 85, trigonometry: 90 },
    { student: "Sophie Kim", algebra: 88, calculus: 91, geometry: 87, statistics: 94, trigonometry: 86 },
    { student: "Emma Rodriguez", algebra: 92, calculus: 85, geometry: 94, statistics: 88, trigonometry: 89 }
  ];

  const weeklyActivityData = [
    { week: "Week 1", messages: 45, sessions: 12, resources: 8, quizzes: 3 },
    { week: "Week 2", messages: 67, sessions: 15, resources: 12, quizzes: 4 },
    { week: "Week 3", messages: 89, sessions: 18, resources: 15, quizzes: 5 },
    { week: "Week 4", messages: 156, sessions: 22, resources: 18, quizzes: 6 }
  ];

  const chartConfig = {
    avgScore: { label: "Average Score", color: "#0EA5E9" },
    participation: { label: "Participation", color: "#10B981" },
    assignments: { label: "Assignments", color: "#F59E0B" },
    improvement: { label: "Improvement", color: "#8B5CF6" }
  };

  return (
    <div className="space-y-6">
      {/* Header with Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Average Performance</CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">91%</div>
            <p className="text-xs text-blue-600">+4% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Engagement Rate</CardTitle>
            <Users className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">88%</div>
            <p className="text-xs text-green-600">23/25 active students</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Completion Rate</CardTitle>
            <Award className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">94%</div>
            <p className="text-xs text-purple-600">Above target</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Study Time</CardTitle>
            <Clock className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">2.3h</div>
            <p className="text-xs text-orange-600">avg per week</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Performance Trends Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="avgScore" 
                stroke="#0EA5E9" 
                fill="#0EA5E9" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="participation" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Topic Mastery and Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Mastery Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Topic Mastery Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <BarChart data={topicMasteryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mastery" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Engagement Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              Student Engagement Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <RechartsPieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <RechartsPieChart dataKey="value" data={engagementData} cx="50%" cy="50%" outerRadius={80}>
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
                <Legend />
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-teal-600" />
            Assignment Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={assignmentAnalytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="assignment" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="submitted" fill="#0EA5E9" name="Submitted" />
              <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Student Progress Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            Individual Student Progress (Top 3)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {studentProgressData.map((student, index) => (
              <div key={student.student} className="text-center">
                <h4 className="font-medium mb-2">{student.student}</h4>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <RadarChart data={[student]} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={0} domain={[0, 100]} />
                    <Radar 
                      name={student.student} 
                      dataKey="algebra" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3} 
                    />
                  </RadarChart>
                </ChartContainer>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-pink-600" />
            Weekly Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="messages" stroke="#0EA5E9" strokeWidth={2} />
              <Line type="monotone" dataKey="sessions" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="resources" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="quizzes" stroke="#8B5CF6" strokeWidth={2} />
              <Legend />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detailed Topic Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Detailed Topic Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topicMasteryData.map((topic) => (
              <div key={topic.topic} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-slate-700">{topic.topic}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      topic.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      topic.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900">{topic.mastery}%</span>
                    <span className="text-slate-500 ml-2">({topic.students} students)</span>
                  </div>
                </div>
                <Progress value={topic.mastery} className="h-3" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Class Average</span>
                  <span>{topic.mastery >= 90 ? 'Excellent' : topic.mastery >= 80 ? 'Good' : 'Needs Improvement'}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
