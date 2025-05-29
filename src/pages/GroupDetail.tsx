
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, ArrowLeft, Calculator, Brain, Settings, UserPlus, MessageSquare, FileText, BarChart3, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleCalculator } from "@/components/SimpleCalculator";
import { GroupOverview } from "@/components/group/GroupOverview";
import { GroupMembers } from "@/components/group/GroupMembers";
import { GroupAssignments } from "@/components/group/GroupAssignments";
import { GroupResources } from "@/components/group/GroupResources";
import { GroupChat } from "@/components/group/GroupChat";
import { GroupAnalytics } from "@/components/group/GroupAnalytics";

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  grade: string;
  memberCount: number;
  activeAssignments: number;
  description: string;
  role: "teacher" | "student" | "admin";
  unreadAssignments?: number;
  avgScore?: number;
  createdAt: Date;
  teacherName: string;
}

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Sample group data - in real app, fetch from API
    const sampleGroup: StudyGroup = {
      id: id || "1",
      name: "Advanced Mathematics",
      subject: "Mathematics",
      grade: "Grade 12",
      memberCount: 25,
      activeAssignments: 3,
      description: "Advanced calculus and algebra group for preparing college entrance exams",
      role: "teacher",
      avgScore: 87,
      createdAt: new Date("2024-01-15"),
      teacherName: "Dr. Sarah Johnson"
    };
    setGroup(sampleGroup);
  }, [id]);

  if (!group) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading group...</p>
        </div>
      </div>
    );
  }

  const isTeacher = group.role === "teacher" || group.role === "admin";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/study-groups")}
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Groups
            </Button>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-teal-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{group.name}</h1>
                <p className="text-sm text-slate-600">{group.subject} • {group.grade}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCalculator(!showCalculator)}
              className="text-slate-600 hover:text-slate-900"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculator
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/mindpages")}
              className="text-slate-600 hover:text-slate-900"
            >
              <Brain className="w-4 h-4 mr-2" />
              MindPages
            </Button>
            {isTeacher && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-slate-600 hover:text-slate-900"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Members
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-slate-900"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Calculator Sidebar */}
        {showCalculator && (
          <div className="w-80 bg-white border-r border-slate-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Quick Calculator</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCalculator(false)}
              >
                ×
              </Button>
            </div>
            <SimpleCalculator />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-white border-b border-slate-200 px-6">
              <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-none lg:flex">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="members" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Members</span>
                </TabsTrigger>
                <TabsTrigger value="assignments" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Assignments</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Resources</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Chat</span>
                </TabsTrigger>
                {isTeacher && (
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Analytics</span>
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="overview">
                <GroupOverview group={group} />
              </TabsContent>
              
              <TabsContent value="members">
                <GroupMembers group={group} />
              </TabsContent>
              
              <TabsContent value="assignments">
                <GroupAssignments group={group} />
              </TabsContent>
              
              <TabsContent value="resources">
                <GroupResources group={group} />
              </TabsContent>
              
              <TabsContent value="chat">
                <GroupChat group={group} />
              </TabsContent>
              
              {isTeacher && (
                <TabsContent value="analytics">
                  <GroupAnalytics group={group} />
                </TabsContent>
              )}
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default GroupDetail;
