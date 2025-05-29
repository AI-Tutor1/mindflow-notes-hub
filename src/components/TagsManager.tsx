
import { useState } from "react";
import { Tag, Plus, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface TagsManagerProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagsManager = ({ tags, onTagsChange }: TagsManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Predefined suggested tags
  const suggestedTags = [
    "mathematics", "physics", "chemistry", "biology", "history", "geography",
    "literature", "programming", "study-notes", "revision", "homework",
    "exam-prep", "project", "research", "important", "urgent", "draft",
    "completed", "in-progress", "formulas", "definitions", "examples"
  ];

  const availableTags = suggestedTags.filter(tag => 
    !tags.includes(tag) && 
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      onTagsChange([...tags, tag.trim()]);
    }
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
          <Tag className="w-3 h-3 mr-1" />
          Manage Tags
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Tag className="w-5 h-5" />
            <span>Manage Tags</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Tags */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Current Tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-slate-200 pr-1"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-red-100"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
              {tags.length === 0 && (
                <p className="text-sm text-slate-500">No tags added yet</p>
              )}
            </div>
          </div>

          {/* Add New Tag */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Add New Tag</h4>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter tag name..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag(newTag)}
                className="flex-1"
              />
              <Button 
                onClick={() => addTag(newTag)}
                disabled={!newTag.trim() || tags.includes(newTag.trim())}
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Suggested Tags */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Suggested Tags</h4>
            
            {/* Search */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search suggested tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tags Grid */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {availableTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="justify-start text-xs h-8"
                      onClick={() => addTag(tag)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {tag}
                    </Button>
                  ))}
                </div>
                {availableTags.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">
                    {searchQuery ? "No matching tags found" : "All suggested tags are already added"}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
