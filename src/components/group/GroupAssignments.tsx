
import { useState } from "react";
import { Plus, Calendar, Users, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GroupAssignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'draft' | 'active' | 'completed';
  type: 'test' | 'homework' | 'project' | 'reading';
  submissions: number;
  totalStudents: number;
  avgScore?: number;
  createdDate: Date;
}

interface StudyGroup {
  id: string;
  name: string;
  role: "teacher" | "student" | "admin";
}

interface GroupAssignmentsProps {
  group: StudyGroup;
}

export const GroupAssignments = ({ group }: GroupAssignmentsProps) => {
  const [assignments] = useState<GroupAssignment[]>([
    {
      id: "1",
      title: "Calculus Integration Practice",
      description: "Practice problems focusing on integration techniques and applications",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: "active",
      type: "homework",
      submissions: 18,
      totalStudents: 25,
      avgScore: 87,
      createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      title: "Midterm Exam - Differential Calculus",
      description: "Comprehensive exam covering derivatives, limits, and continuity",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "active",
      type: "test",
      submissions: 5,
      totalStudents: 25,
      createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: "3",
      title: "Linear Algebra Chapter 5",
      description: "Reading assignment on vector spaces and linear transformations",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: "active",
      type: "reading",
      submissions: 22,
      totalStudents: 25,
      createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "4",
      title: "Polynomial Functions Quiz",
      description: "Quick assessment on polynomial operations and graphing",
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "completed",
      type: "test",
      submissions: 25,
      totalStudents: 25,
      avgScore: 92,
      createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    }
  ]);

  const isTeacher = group.role === "teacher" || group.role === "admin";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "active":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "test":
        return "bg-red-100 text-red-800";
      case "homework":
        return "bg-purple-100 text-purple-800";
      case "project":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const isOverdue = date < now;
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (isOverdue) {
      return { text: `${diffDays} days ago`, color: "text-red-600" };
    } else if (diffDays === 0) {
      return { text: "Due today", color: "text-orange-600" };
    } else if (diffDays === 1) {
      return { text: "Due tomorrow", color: "text-orange-600" };
    } else {
      return { text: `Due in ${diffDays} days`, color: "text-slate-600" };
    }
  };

  const activeAssignments = assignments.filter(a => a.status === "active");
  const completedAssignments = assignments.filter(a => a.status === "completed");
  const draftAssignments = assignments.filter(a => a.status === "draft");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Assignments</h2>
          <p className="text-slate-600">Manage and track assignment progress</p>
        </div>
        {isTeacher && (
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Assignment
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">{assignments.length}</div>
            <p className="text-sm text-slate-600">Total Assignments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{activeAssignments.length}</div>
            <p className="text-sm text-slate-600">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{completedAssignments.length}</div>
            <p className="text-sm text-slate-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">
              {Math.round(assignments.filter(a => a.avgScore).reduce((acc, a) => acc + (a.avgScore || 0), 0) / assignments.filter(a => a.avgScore).length) || 0}%
            </div>
            <p className="text-sm text-slate-600">Avg Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active ({activeAssignments.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedAssignments.length})</TabsTrigger>
          {isTeacher && <TabsTrigger value="draft">Drafts ({draftAssignments.length})</TabsTrigger>}
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{assignment.title}</h3>
                      <Badge className={getTypeColor(assignment.type)}>
                        {assignment.type}
                      </Badge>
                      <Badge className={getStatusColor(assignment.status)}>
                        {getStatusIcon(assignment.status)}
                        {assignment.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-4">{assignment.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className={formatDueDate(assignment.dueDate).color}>
                          {formatDueDate(assignment.dueDate).text}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {assignment.submissions}/{assignment.totalStudents} submitted
                      </div>
                      {assignment.avgScore && (
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          Avg: {assignment.avgScore}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      {group.role === "student" ? "Submit" : "View Details"}
                    </Button>
                    {isTeacher && (
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{assignment.title}</h3>
                      <Badge className={getTypeColor(assignment.type)}>
                        {assignment.type}
                      </Badge>
                      <Badge className={getStatusColor(assignment.status)}>
                        {getStatusIcon(assignment.status)}
                        {assignment.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-4">{assignment.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Completed {assignment.dueDate.toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {assignment.submissions}/{assignment.totalStudents} submitted
                      </div>
                      {assignment.avgScore && (
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          Avg: {assignment.avgScore}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Results
                    </Button>
                    {isTeacher && (
                      <Button variant="ghost" size="sm">
                        Analytics
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {isTeacher && (
          <TabsContent value="draft" className="space-y-4">
            {draftAssignments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No draft assignments</h3>
                  <p className="text-slate-600 mb-4">Create your first assignment to get started</p>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </CardContent>
              </Card>
            ) : (
              draftAssignments.map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {/* Draft assignment content */}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
