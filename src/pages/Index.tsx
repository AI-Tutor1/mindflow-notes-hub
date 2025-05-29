
import { Brain, Users, Calculator, BarChart3, Settings, Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "🧠 MindPages",
      description: "Create and organize your digital notes",
      icon: Brain,
      action: () => navigate("/mindpages"),
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      title: "👥 Study Groups",
      description: "Join or create collaborative learning groups",
      icon: Users,
      action: () => navigate("/study-groups"),
      color: "bg-teal-50 hover:bg-teal-100 border-teal-200",
      iconColor: "text-teal-600"
    },
    {
      title: "📊 Analytics",
      description: "Track your learning progress and insights",
      icon: BarChart3,
      action: () => {},
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      title: "🔧 Settings",
      description: "Customize your learning experience",
      icon: Settings,
      action: () => {},
      color: "bg-gray-50 hover:bg-gray-100 border-gray-200",
      iconColor: "text-gray-600"
    }
  ];

  const recentActivities = [
    {
      type: "mindpage",
      title: "Mathematics Chapter 5 Notes",
      description: "Updated calculus formulas and examples",
      time: "2 hours ago",
      badge: "Updated"
    },
    {
      type: "group",
      title: "Physics Study Circle",
      description: "New assignment: Quantum Mechanics Problems",
      time: "4 hours ago",
      badge: "New Assignment"
    },
    {
      type: "mindpage",
      title: "Project Ideas - AI Application",
      description: "Added new chatbot features brainstorm",
      time: "1 day ago",
      badge: "Created"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Welcome back! Ready to learn something new?</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search anything..."
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Quick Create
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all hover:shadow-lg ${action.color}`}
                onClick={action.action}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-white ${action.iconColor}`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{action.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Recent Activity</span>
                  <Badge variant="secondary">3 updates</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'mindpage' ? 'bg-blue-100 text-blue-600' : 'bg-teal-100 text-teal-600'
                      }`}>
                        {activity.type === 'mindpage' ? <Brain className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-900">{activity.title}</h4>
                          <Badge variant={activity.badge === 'New Assignment' ? 'destructive' : 'secondary'} className="text-xs">
                            {activity.badge}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-slate-500 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Learning Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">MindPages Created</span>
                    <span className="font-semibold text-slate-900">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Study Groups</span>
                    <span className="font-semibold text-slate-900">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Hours Studied</span>
                    <span className="font-semibold text-slate-900">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Assignments Due</span>
                    <span className="font-semibold text-red-600">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Physics Quiz</p>
                      <p className="text-xs text-slate-500">Tomorrow, 2:00 PM</p>
                    </div>
                    <Badge variant="destructive">Due Soon</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Math Assignment</p>
                      <p className="text-xs text-slate-500">Friday, 11:59 PM</p>
                    </div>
                    <Badge variant="secondary">Upcoming</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
