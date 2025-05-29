
import { useState, useEffect } from "react";
import { Users, Plus, Search, Calculator, Brain, ChevronRight, Settings, UserPlus, BookOpen, BarChart3, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { SimpleCalculator } from "@/components/SimpleCalculator";
import { CreateGroupDialog } from "@/components/group/CreateGroupDialog";

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
  isPrivate?: boolean;
  recentActivity?: string;
}

const EnhancedStudyGroups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterSubject, setFilterSubject] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const sampleGroups: StudyGroup[] = [
      {
        id: "1",
        name: "Advanced Mathematics",
        subject: "Mathematics",
        grade: "Grade 12",
        memberCount: 25,
        activeAssignments: 3,
        description: "Advanced calculus and algebra group for preparing college entrance exams",
        role: "teacher",
        avgScore: 87,
        isPrivate: false,
        recentActivity: "New assignment posted 2 hours ago"
      },
      {
        id: "2",
        name: "Physics Study Circle",
        subject: "Physics",
        grade: "Grade 11",
        memberCount: 18,
        activeAssignments: 2,
        description: "Weekly physics problem solving sessions with lab experiments",
        role: "student",
        unreadAssignments: 1,
        isPrivate: true,
        recentActivity: "Discussion started 1 day ago"
      },
      {
        id: "3",
        name: "Chemistry Lab Partners",
        subject: "Chemistry",
        grade: "Grade 10",
        memberCount: 12,
        activeAssignments: 1,
        description: "Collaborative chemistry experiments and detailed lab reports",
        role: "student",
        isPrivate: false,
        recentActivity: "Resource shared 3 days ago"
      },
      {
        id: "4",
        name: "AP Biology Prep",
        subject: "Biology",
        grade: "Grade 12",
        memberCount: 30,
        activeAssignments: 4,
        description: "Intensive AP Biology exam preparation with practice tests",
        role: "student",
        unreadAssignments: 2,
        avgScore: 92,
        isPrivate: false,
        recentActivity: "Quiz completed 5 hours ago"
      }
    ];
    setGroups(sampleGroups);
  }, []);

  const subjects = [...new Set(groups.map(g => g.subject))];

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = filterSubject === "all" || group.subject === filterSubject;
    
    return matchesSearch && matchesSubject;
  });

  const sortedGroups = [...filteredGroups].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "members":
        return b.memberCount - a.memberCount;
      case "activity":
        return b.activeAssignments - a.activeAssignments;
      default:
        return b.id.localeCompare(a.id); // Most recent first
    }
  });

  const handleCreateGroup = (groupData: any) => {
    const newGroup: StudyGroup = {
      id: Date.now().toString(),
      name: groupData.name,
      subject: groupData.subject,
      grade: groupData.grade,
      memberCount: 1,
      activeAssignments: 0,
      description: groupData.description,
      role: "teacher",
      isPrivate: groupData.isPrivate,
      recentActivity: "Group created just now"
    };
    setGroups([newGroup, ...groups]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-slate-600 hover:text-slate-900"
            >
              ← Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-teal-600" />
              <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Study Groups</h1>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCalculator(!showCalculator)}
              className="text-slate-600 hover:text-slate-900"
            >
              <Calculator className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Calculator</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/mindpages")}
              className="text-slate-600 hover:text-slate-900"
            >
              <Brain className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">MindPages</span>
            </Button>
            <CreateGroupDialog onCreateGroup={handleCreateGroup} />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Calculator Sidebar */}
        {showCalculator && (
          <div className="w-80 bg-white border-r border-slate-200 p-4 hidden lg:block">
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
        <main className="flex-1 p-4 lg:p-6">
          {/* Enhanced Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search groups, subjects, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="members">Most Members</SelectItem>
                    <SelectItem value="activity">Most Active</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-slate-200 rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-slate-900">{groups.length}</div>
                  <p className="text-sm text-slate-600">Total Groups</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-teal-600">
                    {groups.filter(g => g.role === "teacher").length}
                  </div>
                  <p className="text-sm text-slate-600">Teaching</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {groups.filter(g => g.role === "student").length}
                  </div>
                  <p className="text-sm text-slate-600">Studying</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-orange-600">
                    {groups.reduce((sum, g) => sum + g.activeAssignments, 0)}
                  </div>
                  <p className="text-sm text-slate-600">Active Tasks</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Groups Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedGroups.map((group) => (
                <Card 
                  key={group.id} 
                  className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  onClick={() => navigate(`/study-groups/${group.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                            {group.name}
                          </CardTitle>
                          {group.isPrivate && (
                            <Badge variant="outline" className="text-xs">
                              Private
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">
                          {group.subject} • {group.grade}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1 capitalize">
                          {group.role}
                        </Badge>
                      </div>
                      {group.unreadAssignments && (
                        <Badge variant="destructive" className="text-xs">
                          {group.unreadAssignments} new
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {group.description}
                    </p>
                    
                    {group.recentActivity && (
                      <p className="text-xs text-teal-600 mb-3 italic">
                        {group.recentActivity}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {group.memberCount}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {group.activeAssignments}
                        </span>
                        {group.avgScore && (
                          <span className="flex items-center">
                            <BarChart3 className="w-3 h-3 mr-1" />
                            {group.avgScore}%
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" className="flex-1 mr-2">
                        View Group
                      </Button>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {sortedGroups.map((group) => (
                <Card
                  key={group.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/study-groups/${group.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900">{group.name}</h3>
                            {group.isPrivate && (
                              <Badge variant="outline" className="text-xs">Private</Badge>
                            )}
                            {group.unreadAssignments && (
                              <Badge variant="destructive" className="text-xs">
                                {group.unreadAssignments} new
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">{group.subject} • {group.grade}</p>
                          <Badge variant="secondary" className="text-xs mt-1 capitalize">
                            {group.role}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {group.memberCount}
                          </span>
                          <span className="flex items-center">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {group.activeAssignments}
                          </span>
                          {group.avgScore && (
                            <span className="flex items-center">
                              <BarChart3 className="w-3 h-3 mr-1" />
                              {group.avgScore}%
                            </span>
                          )}
                        </div>
                        
                        <div className="text-right">
                          {group.recentActivity && (
                            <p className="text-xs text-teal-600 mb-1">{group.recentActivity}</p>
                          )}
                          <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {sortedGroups.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No groups found</h3>
              <p className="text-slate-600 mb-6">
                {searchQuery || filterSubject !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Create your first study group to get started"
                }
              </p>
              <CreateGroupDialog onCreateGroup={handleCreateGroup} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EnhancedStudyGroups;
