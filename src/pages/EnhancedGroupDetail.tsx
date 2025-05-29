
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Users, ArrowLeft, Calculator, Brain, Settings, UserPlus, MessageSquare, FileText, BarChart3, BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SimpleCalculator } from "@/components/SimpleCalculator";
import { GroupOverview } from "@/components/group/GroupOverview";
import { GroupMembers } from "@/components/group/GroupMembers";
import { GroupAssignments } from "@/components/group/GroupAssignments";
import { EnhancedGroupResources } from "@/components/group/EnhancedGroupResources";
import { EnhancedGroupChat } from "@/components/group/EnhancedGroupChat";
import { GroupAnalytics } from "@/components/group/GroupAnalytics";
import { UserInviteSystem } from "@/components/group/UserInviteSystem";

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

const EnhancedGroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
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

  const CalculatorSidebar = () => (
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
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/study-groups")}
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Groups</span>
            </Button>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-teal-600" />
              <div>
                <h1 className="text-lg lg:text-2xl font-bold text-slate-900">{group.name}</h1>
                <p className="text-sm text-slate-600 hidden sm:block">{group.subject} • {group.grade}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Mobile Menu */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="space-y-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowCalculator(!showCalculator);
                      setSidebarOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculator
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigate("/mindpages");
                      setSidebarOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    MindPages
                  </Button>
                  {isTeacher && (
                    <>
                      <UserInviteSystem groupName={group.name} groupId={group.id} />
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </>
                  )}
                </div>
                {showCalculator && (
                  <div className="mt-6">
                    <SimpleCalculator />
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2">
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
                  <UserInviteSystem groupName={group.name} groupId={group.id} />
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
        </div>
      </header>

      <div className="flex">
        {/* Calculator Sidebar - Desktop Only */}
        {showCalculator && (
          <div className="hidden lg:block">
            <CalculatorSidebar />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Enhanced Tab Navigation */}
            <div className="bg-white border-b border-slate-200 px-4 lg:px-6">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full lg:w-auto lg:flex gap-1">
                <TabsTrigger value="overview" className="flex items-center gap-2 text-xs lg:text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="members" className="flex items-center gap-2 text-xs lg:text-sm">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Members</span>
                </TabsTrigger>
                <TabsTrigger value="assignments" className="flex items-center gap-2 text-xs lg:text-sm">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Tasks</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2 text-xs lg:text-sm">
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Resources</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2 text-xs lg:text-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Chat</span>
                </TabsTrigger>
                {isTeacher && (
                  <TabsTrigger value="analytics" className="flex items-center gap-2 text-xs lg:text-sm">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Analytics</span>
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="p-4 lg:p-6">
              <TabsContent value="overview" className="mt-0">
                <GroupOverview group={group} />
              </TabsContent>
              
              <TabsContent value="members" className="mt-0">
                <GroupMembers group={group} />
              </TabsContent>
              
              <TabsContent value="assignments" className="mt-0">
                <GroupAssignments group={group} />
              </TabsContent>
              
              <TabsContent value="resources" className="mt-0">
                <EnhancedGroupResources group={group} />
              </TabsContent>
              
              <TabsContent value="chat" className="mt-0">
                <div className="h-[calc(100vh-200px)] lg:h-[600px]">
                  <EnhancedGroupChat group={group} />
                </div>
              </TabsContent>
              
              {isTeacher && (
                <TabsContent value="analytics" className="mt-0">
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

export default EnhancedGroupDetail;
