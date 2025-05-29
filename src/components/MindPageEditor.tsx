
import { useState, useEffect, useRef } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, Link, Code, Table, Star, Download, Share, Save, Tag, Clock, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MindPage } from "@/pages/MindPages";
import { useToast } from "@/hooks/use-toast";
import { TagsManager } from "./TagsManager";
import { ImageUpload } from "./ImageUpload";
import { ShareDialog } from "./ShareDialog";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: number;
}

interface MindPageEditorProps {
  page: MindPage;
  onUpdate: (page: MindPage) => void;
  isCreating?: boolean;
  onCreatingComplete?: () => void;
}

export const MindPageEditor = ({ page, onUpdate, isCreating, onCreatingComplete }: MindPageEditorProps) => {
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);
  const [tags, setTags] = useState<string[]>(page.tags);
  const [isStarred, setIsStarred] = useState(page.is_starred);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [folder, setFolder] = useState(page.folder || "");
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Auto-focus title when creating new page
  useEffect(() => {
    if (isCreating && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.select();
    }
  }, [isCreating]);

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (title !== page.title || content !== page.content || isStarred !== page.is_starred || JSON.stringify(tags) !== JSON.stringify(page.tags) || folder !== page.folder) {
        handleSave();
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [title, content, tags, isStarred, folder]);

  const handleSave = () => {
    const updatedPage: MindPage = {
      ...page,
      title: title || "Untitled Page",
      content,
      tags,
      is_starred: isStarred,
      folder: folder || undefined,
    };
    onUpdate(updatedPage);
    setLastSaved(new Date());
    onCreatingComplete?.();
  };

  const formatContent = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  const createFolder = () => {
    if (newFolderName.trim()) {
      setFolder(newFolderName.trim());
      setNewFolderName("");
      setIsCreatingFolder(false);
      toast({
        title: "Folder created",
        description: `Page moved to "${newFolderName.trim()}" folder`,
      });
    }
  };

  const exportPage = () => {
    const element = document.createElement("a");
    const file = new Blob([`# ${title}\n\n${content.replace(/<[^>]*>/g, '')}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Page exported",
      description: "Your page has been saved as a Markdown file.",
    });
  };

  const toolbarButtons = [
    { icon: Bold, command: "bold", tooltip: "Bold" },
    { icon: Italic, command: "italic", tooltip: "Italic" },
    { icon: Underline, command: "underline", tooltip: "Underline" },
    { icon: Heading1, command: "formatBlock", value: "h1", tooltip: "Heading 1" },
    { icon: Heading2, command: "formatBlock", value: "h2", tooltip: "Heading 2" },
    { icon: List, command: "insertUnorderedList", tooltip: "Bullet List" },
    { icon: ListOrdered, command: "insertOrderedList", tooltip: "Numbered List" },
    { icon: Code, command: "formatBlock", value: "pre", tooltip: "Code Block" },
  ];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.abs(now.getTime() - date.getTime()) / (1000 * 60);
    
    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Editor Header */}
      <div className="border-b border-slate-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 flex-1">
            <Input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title..."
              className="text-2xl font-bold border-none p-0 focus:ring-0 focus:outline-none bg-transparent placeholder:text-slate-400"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsStarred(!isStarred)}
              className={cn(
                "ml-2",
                isStarred ? "text-yellow-500 hover:text-yellow-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Star className={cn("w-4 h-4", isStarred && "fill-current")} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-xs text-slate-500">
              <Clock className="w-3 h-3 mr-1" />
              Saved {formatDate(lastSaved)}
            </div>
            <Button variant="ghost" size="sm" onClick={exportPage}>
              <Download className="w-4 h-4" />
            </Button>
            <ShareDialog pageTitle={title} pageId={page.id} />
            <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Folder and Tags Row */}
        <div className="flex items-center space-x-4 mb-4">
          {/* Folder Management */}
          <div className="flex items-center space-x-2">
            <FolderPlus className="w-4 h-4 text-slate-400" />
            {isCreatingFolder ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && createFolder()}
                  placeholder="Folder name..."
                  className="w-32 h-6 text-xs"
                />
                <Button size="sm" variant="ghost" onClick={createFolder} className="h-6 px-2 text-xs">
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsCreatingFolder(false)} className="h-6 px-2 text-xs">
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {folder ? (
                  <Badge variant="outline" className="text-xs">
                    📁 {folder}
                  </Badge>
                ) : (
                  <span className="text-xs text-slate-500">No folder</span>
                )}
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setIsCreatingFolder(true)}
                  className="h-6 px-2 text-xs"
                >
                  {folder ? "Change" : "Add Folder"}
                </Button>
              </div>
            )}
          </div>

          <Separator orientation="vertical" className="h-4" />

          {/* Tags */}
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <div className="flex flex-wrap items-center gap-2">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{tags.length - 3} more
                </Badge>
              )}
              <TagsManager tags={tags} onTagsChange={setTags} />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => formatContent(button.command, button.value)}
                className="h-8 w-8 p-0 hover:bg-slate-100"
                title={button.tooltip}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-1">
            <ImageUpload images={images} onImagesChange={setImages} />
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          className={cn(
            "min-h-full outline-none prose prose-slate max-w-none",
            "prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
            "prose-p:text-slate-700 prose-p:leading-relaxed",
            "prose-ul:list-disc prose-ol:list-decimal",
            "prose-li:text-slate-700 prose-li:my-1",
            "prose-pre:bg-slate-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto",
            "prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
            "prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic",
            "focus:outline-none"
          )}
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
          style={{ minHeight: "calc(100vh - 200px)" }}
        />
        
        {content === "" && (
          <div className="text-slate-400 pointer-events-none absolute">
            Start writing your thoughts here...
          </div>
        )}
      </div>
    </div>
  );
};
