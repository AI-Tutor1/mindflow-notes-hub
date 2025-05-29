
import { useState, useEffect } from "react";
import { Users, Plus, Search, Calculator, Brain, ChevronRight, Settings, UserPlus, BookOpen, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { SimpleCalculator } from "@/components/SimpleCalculator";

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
}

const StudyGroups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    // Sample data
    const sampleGroups: StudyGroup[] = [
      {
        id: "1",
        name: "Advanced Mathematics",
        subject: "Mathematics",
        grade: "Grade 12",
        memberCount: 25,
        activeAssignments: 3,
        description: "Advanced calculus and algebra group",
        role: "teacher",
        avgScore: 87
      },
      {
        id: "2",
        name: "Physics Study Circle",
        subject: "Physics",
        grade: "Grade 11",
        memberCount: 18,
        activeAssignments: 2,
        description: "Weekly physics problem solving sessions",
        role: "student",
        unreadAssignments: 1
      },
      {
        id: "3",
        name: "Chemistry Lab Partners",
        subject: "Chemistry",
        grade: "Grade 10",
        memberCount: 12,
        activeAssignments: 1,
        description: "Collaborative chemistry experiments and notes",
        role: "student"
      }
    ];
    setGroups(sampleGroups);
  }, []);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
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
              <h1 className="text-2xl font-bold text-slate-900">Study Groups</h1>
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
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
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
        <main className="flex-1 p-6">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card 
                key={group.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/study-groups/${group.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-slate-900">
                        {group.name}
                      </CardTitle>
                      <p className="text-sm text-slate-600 mt-1">
                        {group.subject} • {group.grade}
                      </p>
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
                  
                  <div className="flex items-center justify-between text-sm text-slate-500">
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
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No groups found</h3>
              <p className="text-slate-600 mb-6">Create your first study group to get started</p>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudyGroups;
