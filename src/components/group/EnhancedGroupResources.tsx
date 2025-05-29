
import { useState } from "react";
import { Plus, Brain, FileText, Image, Link as LinkIcon, Search, Download, Share, Star, Upload, Grid, List, Filter, MoreVertical, Eye, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  views?: number;
  downloads?: number;
}

interface StudyGroup {
  id: string;
  name: string;
  role: "teacher" | "student" | "admin";
}

interface EnhancedGroupResourcesProps {
  group: StudyGroup;
}

export const EnhancedGroupResources = ({ group }: EnhancedGroupResourcesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("date");
  const [filterType, setFilterType] = useState("all");
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
      sharedBy: "Dr. Sarah Johnson",
      views: 45,
      downloads: 12
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
      sharedBy: "Alex Chen",
      views: 32,
      downloads: 18
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
      sharedBy: "Emma Rodriguez",
      views: 67,
      downloads: 0
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
      sharedBy: "James Wilson",
      views: 23,
      downloads: 8
    }
  ]);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === "all" || resource.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "size":
        return (a.size || "0").localeCompare(b.size || "0");
      case "views":
        return (b.views || 0) - (a.views || 0);
      default:
        return b.createdDate.getTime() - a.createdDate.getTime();
    }
  });

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

  const handleSelectResource = (resourceId: string) => {
    setSelectedResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload here
    console.log("Files dropped:", e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Resources</h2>
          <p className="text-slate-600">Shared materials and study resources</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="w-4 h-4 mr-2" />
                Share Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Share New Resource</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter resource title" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the resource" />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mindpage">MindPage</SelectItem>
                      <SelectItem value="file">File</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="math, calculus, integration" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    Share Resource
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="mindpage">MindPages</SelectItem>
              <SelectItem value="file">Files</SelectItem>
              <SelectItem value="link">Links</SelectItem>
              <SelectItem value="image">Images</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="views">Sort by Views</SelectItem>
              <SelectItem value="size">Sort by Size</SelectItem>
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

      {/* Bulk Actions */}
      {selectedResources.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedResources.length} resource(s) selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? "border-teal-500 bg-teal-50" : "border-slate-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-slate-900 mb-2">
          Drop files here to upload
        </p>
        <p className="text-slate-600 mb-4">
          Or click to browse files
        </p>
        <Button variant="outline">
          Browse Files
        </Button>
      </div>

      {/* Resources Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow group">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <Checkbox
                      checked={selectedResources.includes(resource.id)}
                      onCheckedChange={() => handleSelectResource(resource.id)}
                      className="mt-1"
                    />
                    {getResourceIcon(resource.type)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-1 truncate">{resource.title}</h3>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">{resource.description}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                        {resource.size && (
                          <span className="text-xs text-slate-500">{resource.size}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-slate-500 mb-2">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {resource.views || 0}
                        </span>
                        <span className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {resource.downloads || 0}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        By {resource.creator} • {resource.createdDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={resource.isStarred ? "text-yellow-500" : "text-slate-400"}
                    >
                      <Star className={`w-4 h-4 ${resource.isStarred ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
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
      ) : (
        <div className="space-y-2">
          {sortedResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedResources.includes(resource.id)}
                    onCheckedChange={() => handleSelectResource(resource.id)}
                  />
                  {getResourceIcon(resource.type)}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-slate-900">{resource.title}</h3>
                      <p className="text-sm text-slate-600">{resource.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(resource.type)} className="text-xs">
                        {resource.type}
                      </Badge>
                      {resource.size && (
                        <span className="text-xs text-slate-500">{resource.size}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-xs text-slate-500 flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {resource.views || 0}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={resource.isStarred ? "text-yellow-500" : "text-slate-400"}
                      >
                        <Star className={`w-4 h-4 ${resource.isStarred ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {sortedResources.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No resources found</h3>
          <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
