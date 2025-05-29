
import { Users, FileText, TrendingUp, Calendar, Clock, Award, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  grade: string;
  memberCount: number;
  activeAssignments: number;
  description: string;
  role: "teacher" | "student" | "admin";
  avgScore?: number;
  createdAt: Date;
  teacherName: string;
}

interface GroupOverviewProps {
  group: StudyGroup;
}

export const GroupOverview = ({ group }: GroupOverviewProps) => {
  const isTeacher = group.role === "teacher" || group.role === "admin";

  const recentActivities = [
    { id: 1, type: "assignment", message: "New assignment 'Calculus Practice' posted", time: "2 hours ago" },
    { id: 2, type: "member", message: "Sarah Johnson joined the group", time: "1 day ago" },
    { id: 3, type: "resource", message: "Study guide uploaded by Dr. Smith", time: "2 days ago" },
    { id: 4, type: "chat", message: "Active discussion about quadratic equations", time: "3 days ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Group Info Header */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">{group.name}</h2>
            <p className="text-slate-600 max-w-2xl">{group.description}</p>
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span>Created {group.createdAt.toLocaleDateString()}</span>
              <span>•</span>
              <span>Taught by {group.teacherName}</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">
            {group.role === "teacher" ? "Teacher" : group.role === "admin" ? "Admin" : "Student"}
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Members</CardTitle>
            <Users className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{group.memberCount}</div>
            <p className="text-xs text-slate-500">+3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active Assignments</CardTitle>
            <FileText className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{group.activeAssignments}</div>
            <p className="text-xs text-slate-500">2 due this week</p>
          </CardContent>
        </Card>

        {group.avgScore && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Average Score</CardTitle>
              <TrendingUp className="w-4 h-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{group.avgScore}%</div>
              <p className="text-xs text-green-600">+5% from last month</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Completion Rate</CardTitle>
            <Award className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">92%</div>
            <p className="text-xs text-green-600">Above average</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {isTeacher && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex flex-col items-center p-4 space-y-2">
                <FileText className="w-6 h-6 text-teal-600" />
                <span className="text-sm">Create Assignment</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center p-4 space-y-2">
                <Users className="w-6 h-6 text-teal-600" />
                <span className="text-sm">Add Members</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center p-4 space-y-2">
                <MessageSquare className="w-6 h-6 text-teal-600" />
                <span className="text-sm">Send Announcement</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center p-4 space-y-2">
                <TrendingUp className="w-6 h-6 text-teal-600" />
                <span className="text-sm">View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-teal-600 mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">{activity.message}</p>
                  <p className="text-xs text-slate-500 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
