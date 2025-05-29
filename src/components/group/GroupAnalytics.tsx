
import { TrendingUp, Users, Award, Clock, BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StudyGroup {
  id: string;
  name: string;
  role: "teacher" | "student" | "admin";
}

interface GroupAnalyticsProps {
  group: StudyGroup;
}

export const GroupAnalytics = ({ group }: GroupAnalyticsProps) => {
  // Sample analytics data - in real app, fetch from API
  const analyticsData = {
    performance: {
      avgScore: 87,
      improvement: 5.2,
      completionRate: 92,
      participationRate: 78
    },
    assignments: {
      total: 12,
      completed: 10,
      pending: 2,
      avgSubmissionTime: 2.3
    },
    engagement: {
      activeMembers: 23,
      totalMembers: 25,
      messagesThisWeek: 156,
      studySessionsThisWeek: 8
    },
    topicMastery: [
      { topic: "Derivatives", mastery: 94, students: 24 },
      { topic: "Integration", mastery: 87, students: 23 },
      { topic: "Limits", mastery: 91, students: 25 },
      { topic: "Functions", mastery: 85, students: 22 },
      { topic: "Algebra", mastery: 96, students: 25 }
    ],
    weeklyProgress: [
      { week: "Week 1", avgScore: 78, participation: 65 },
      { week: "Week 2", avgScore: 82, participation: 72 },
      { week: "Week 3", avgScore: 85, participation: 78 },
      { week: "Week 4", avgScore: 87, participation: 82 }
    ],
    topPerformers: [
      { name: "Alex Chen", avgScore: 96, improvement: 8 },
      { name: "Sophie Kim", avgScore: 94, improvement: 6 },
      { name: "Emma Rodriguez", avgScore: 92, improvement: 4 },
      { name: "James Wilson", avgScore: 89, improvement: 7 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>
        <p className="text-slate-600">Comprehensive insights into group performance and engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Average Score</CardTitle>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{analyticsData.performance.avgScore}%</div>
            <p className="text-xs text-green-600">
              +{analyticsData.performance.improvement}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Completion Rate</CardTitle>
            <Award className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{analyticsData.performance.completionRate}%</div>
            <p className="text-xs text-slate-500">
              {analyticsData.assignments.completed}/{analyticsData.assignments.total} assignments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active Members</CardTitle>
            <Users className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {analyticsData.engagement.activeMembers}/{analyticsData.engagement.totalMembers}
            </div>
            <p className="text-xs text-slate-500">
              {Math.round((analyticsData.engagement.activeMembers / analyticsData.engagement.totalMembers) * 100)}% participation rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg. Submission Time</CardTitle>
            <Clock className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{analyticsData.assignments.avgSubmissionTime} days</div>
            <p className="text-xs text-green-600">Ahead of schedule</p>
          </CardContent>
        </Card>
      </div>

      {/* Topic Mastery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            Topic Mastery Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topicMastery.map((topic) => (
              <div key={topic.topic} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{topic.topic}</span>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900">{topic.mastery}%</span>
                    <span className="text-slate-500 ml-2">({topic.students} students)</span>
                  </div>
                </div>
                <Progress value={topic.mastery} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends and Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              Weekly Progress Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.weeklyProgress.map((week, index) => (
                <div key={week.week} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{week.week}</span>
                    <span className="text-slate-600">Score: {week.avgScore}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Progress value={week.avgScore} className="h-2" />
                    </div>
                    <span className="text-xs text-slate-500 w-16">
                      {week.participation}% active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPerformers.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? "bg-yellow-100 text-yellow-800" :
                      index === 1 ? "bg-gray-100 text-gray-800" :
                      index === 2 ? "bg-orange-100 text-orange-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{student.name}</p>
                      <p className="text-sm text-slate-600">
                        +{student.improvement}% improvement
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{student.avgScore}%</p>
                    <p className="text-xs text-slate-500">avg score</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-teal-600" />
            Engagement Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {analyticsData.engagement.messagesThisWeek}
              </div>
              <p className="text-sm text-slate-600">Messages This Week</p>
              <p className="text-xs text-green-600 mt-1">+23% from last week</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {analyticsData.engagement.studySessionsThisWeek}
              </div>
              <p className="text-sm text-slate-600">Study Sessions</p>
              <p className="text-xs text-green-600 mt-1">+15% from last week</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {analyticsData.performance.participationRate}%
              </div>
              <p className="text-sm text-slate-600">Participation Rate</p>
              <p className="text-xs text-green-600 mt-1">Above target</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
