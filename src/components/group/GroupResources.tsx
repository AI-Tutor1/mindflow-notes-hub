
import { useState } from "react";
import { Plus, Brain, FileText, Image, Link as LinkIcon, Search, Download, Share, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Resource {
  id: string;
  title: string;
  type: 'mindpage' | 'file' | 'link' | 'image';
  description?: string;
  creator: string;
  createdDate: Date;
  tags: string[];
  url?: string;
  size?: string;
  isStarred: boolean;
  sharedBy: string;
}

interface StudyGroup {
  id: string;
  name: string;
  role: "teacher" | "student" | "admin";
}

interface GroupResourcesProps {
  group: StudyGroup;
}

export const GroupResources = ({ group }: GroupResourcesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resources] = useState<Resource[]>([
    {
      id: "1",
      title: "Calculus Integration Techniques",
      type: "mindpage",
      description: "Comprehensive notes on integration by parts, substitution, and partial fractions",
      creator: "Dr. Sarah Johnson",
      createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      tags: ["calculus", "integration", "techniques"],
      isStarred: true,
      sharedBy: "Dr. Sarah Johnson"
    },
    {
      id: "2",
      title: "Linear Algebra Study Guide",
      type: "file",
      description: "PDF study guide covering vector spaces and linear transformations",
      creator: "Alex Chen",
      createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      tags: ["linear-algebra", "vectors", "transformations"],
      size: "2.4 MB",
      isStarred: false,
      sharedBy: "Alex Chen"
    },
    {
      id: "3",
      title: "Khan Academy - Derivatives",
      type: "link",
      description: "Excellent video series on derivative concepts and applications",
      creator: "Emma Rodriguez",
      createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      tags: ["derivatives", "video", "external"],
      url: "https://khanacademy.org/derivatives",
      isStarred: true,
      sharedBy: "Emma Rodriguez"
    },
    {
      id: "4",
      title: "Function Graphs Diagram",
      type: "image",
      description: "Visual representation of different function types and their characteristics",
      creator: "James Wilson",
      createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tags: ["functions", "graphs", "visual"],
      size: "1.2 MB",
      isStarred: false,
      sharedBy: "James Wilson"
    },
    {
      id: "5",
      title: "Exam Preparation Checklist",
      type: "mindpage",
      description: "Step-by-step preparation guide for the upcoming midterm exam",
      creator: "Sophie Kim",
      createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: ["exam", "preparation", "checklist"],
      isStarred: true,
      sharedBy: "Sophie Kim"
    }
  ]);

  const isTeacher = group.role === "teacher" || group.role === "admin";

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "mindpage":
        return <Brain className="w-5 h-5 text-teal-600" />;
      case "file":
        return <FileText className="w-5 h-5 text-blue-600" />;
      case "link":
        return <LinkIcon className="w-5 h-5 text-purple-600" />;
      case "image":
        return <Image className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "mindpage":
        return "bg-teal-100 text-teal-800";
      case "file":
        return "bg-blue-100 text-blue-800";
      case "link":
        return "bg-purple-100 text-purple-800";
      case "image":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleStar = (resourceId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggle star for resource ${resourceId}`);
  };

  const mindPages = filteredResources.filter(r => r.type === "mindpage");
  const files = filteredResources.filter(r => r.type === "file" || r.type === "image");
  const links = filteredResources.filter(r => r.type === "link");
  const starred = filteredResources.filter(r => r.isStarred);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Resources</h2>
          <p className="text-slate-600">Shared materials and study resources</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Share Resource
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-slate-900">{resources.length}</div>
            <p className="text-sm text-slate-600">Total Resources</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-teal-600">{mindPages.length}</div>
            <p className="text-sm text-slate-600">MindPages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{files.length}</div>
            <p className="text-sm text-slate-600">Files & Images</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{links.length}</div>
            <p className="text-sm text-slate-600">External Links</p>
          </CardContent>
        </Card>
      </div>

      {/* Resources Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({filteredResources.length})</TabsTrigger>
          <TabsTrigger value="mindpages">MindPages ({mindPages.length})</TabsTrigger>
          <TabsTrigger value="files">Files ({files.length})</TabsTrigger>
          <TabsTrigger value="links">Links ({links.length})</TabsTrigger>
          <TabsTrigger value="starred">Starred ({starred.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getResourceIcon(resource.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{resource.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{resource.description}</p>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge className={getTypeColor(resource.type)}>
                            {resource.type}
                          </Badge>
                          {resource.size && (
                            <span className="text-xs text-slate-500">{resource.size}</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {resource.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500">
                          By {resource.creator} • {resource.createdDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(resource.id)}
                      className={resource.isStarred ? "text-yellow-500" : "text-slate-400"}
                    >
                      <Star className={`w-4 h-4 ${resource.isStarred ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      {resource.type === "mindpage" ? "Open" : "View"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                    {resource.type !== "mindpage" && (
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mindpages" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mindPages.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  {/* Same content structure as above, filtered for mindpages */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getResourceIcon(resource.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{resource.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{resource.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {resource.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500">
                          By {resource.creator} • {resource.createdDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(resource.id)}
                      className={resource.isStarred ? "text-yellow-500" : "text-slate-400"}
                    >
                      <Star className={`w-4 h-4 ${resource.isStarred ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Open MindPage
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Similar content for other tabs... */}
        <TabsContent value="files" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  {/* File-specific content */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getResourceIcon(resource.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{resource.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{resource.description}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getTypeColor(resource.type)}>
                            {resource.type}
                          </Badge>
                          {resource.size && (
                            <span className="text-xs text-slate-500">{resource.size}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          By {resource.creator} • {resource.createdDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  {/* Link-specific content */}
                  <div className="flex items-start space-x-3 mb-3">
                    {getResourceIcon(resource.type)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{resource.title}</h3>
                      <p className="text-sm text-slate-600 mb-2">{resource.description}</p>
                      {resource.url && (
                        <p className="text-xs text-blue-600 mb-2">{resource.url}</p>
                      )}
                      <p className="text-xs text-slate-500">
                        By {resource.creator} • {resource.createdDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Open Link
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="starred" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {starred.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow border-yellow-200">
                <CardContent className="p-4">
                  {/* Starred content with star highlight */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getResourceIcon(resource.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{resource.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{resource.description}</p>
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
