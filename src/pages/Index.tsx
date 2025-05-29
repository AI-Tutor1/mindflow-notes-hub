
import { Book, Brain, Users, BarChart3, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "🧠 MindPages",
      description: "Your digital notebook for notes, ideas, and learning",
      icon: Brain,
      action: () => navigate("/mindpages"),
      color: "bg-gradient-to-br from-blue-500 to-purple-600",
    },
    {
      title: "📚 Courses",
      description: "Access your enrolled courses and materials",
      icon: Book,
      action: () => {},
      color: "bg-gradient-to-br from-green-500 to-teal-600",
    },
    {
      title: "👥 Study Groups",
      description: "Collaborate with classmates and teachers",
      icon: Users,
      action: () => {},
      color: "bg-gradient-to-br from-orange-500 to-red-600",
    },
    {
      title: "📊 Progress",
      description: "Track your learning journey and achievements",
      icon: BarChart3,
      action: () => {},
      color: "bg-gradient-to-br from-indigo-500 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Tuitional AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                S
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Welcome back, Student!
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Your personalized learning dashboard. Access your courses, notes, and track your progress all in one place.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 overflow-hidden"
              onClick={action.action}
            >
              <div className={`h-2 ${action.color}`} />
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    {action.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  {action.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "note", title: "Mathematics Chapter 5 Notes", time: "2 hours ago", color: "bg-blue-100 text-blue-800" },
                { type: "course", title: "Completed Physics Quiz", time: "Yesterday", color: "bg-green-100 text-green-800" },
                { type: "mindpage", title: "Created Study Plan for Finals", time: "2 days ago", color: "bg-purple-100 text-purple-800" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}>
                    {item.type}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick MindPages Access */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <span>MindPages</span>
                </CardTitle>
                <CardDescription>Your digital notebook for learning</CardDescription>
              </div>
              <Button onClick={() => navigate("/mindpages")} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Page
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Study Notes", pages: 12, updated: "Today" },
                { title: "Project Ideas", pages: 5, updated: "Yesterday" },
                { title: "Quick Thoughts", pages: 8, updated: "2 days ago" },
              ].map((folder, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-slate-900 mb-1">{folder.title}</h4>
                  <p className="text-sm text-slate-500">{folder.pages} pages • Updated {folder.updated}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
