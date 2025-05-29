
import { useState } from "react";
import { Search, Star, Folder, Tag, MoreVertical, Trash2, StarOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MindPage } from "@/pages/MindPages";

interface PageSidebarProps {
  isOpen: boolean;
  pages: MindPage[];
  selectedPage: MindPage | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPageSelect: (page: MindPage) => void;
  onToggleStar: (pageId: string) => void;
  onDeletePage: (pageId: string) => void;
}

export const PageSidebar = ({
  isOpen,
  pages,
  selectedPage,
  searchQuery,
  onSearchChange,
  onPageSelect,
  onToggleStar,
  onDeletePage,
}: PageSidebarProps) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "starred" | "recent">("all");

  const groupedPages = pages.reduce((acc, page) => {
    const folder = page.folder || "Uncategorized";
    if (!acc[folder]) {
      acc[folder] = [];
    }
    acc[folder].push(page);
    return acc;
  }, {} as Record<string, MindPage[]>);

  const filteredPages = () => {
    switch (activeFilter) {
      case "starred":
        return pages.filter(page => page.is_starred);
      case "recent":
        return pages.slice(0, 10);
      default:
        return pages;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return "Today";
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-slate-200 focus:border-blue-300"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex space-x-2">
          {[
            { key: "all", label: "All", icon: Folder },
            { key: "starred", label: "Starred", icon: Star },
            { key: "recent", label: "Recent", icon: Tag },
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter.key as any)}
              className={cn(
                "flex-1 justify-center",
                activeFilter === filter.key 
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200" 
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <filter.icon className="w-3 h-3 mr-1" />
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Pages List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {activeFilter === "all" ? (
            // Grouped view
            Object.entries(groupedPages).map(([folder, folderPages]) => (
              <div key={folder} className="mb-4">
                <div className="flex items-center space-x-2 px-2 py-1 text-xs font-medium text-slate-500 uppercase tracking-wide">
                  <Folder className="w-3 h-3" />
                  <span>{folder}</span>
                </div>
                <div className="space-y-1">
                  {folderPages.map((page) => (
                    <PageItem
                      key={page.id}
                      page={page}
                      isSelected={selectedPage?.id === page.id}
                      onSelect={() => onPageSelect(page)}
                      onToggleStar={() => onToggleStar(page.id)}
                      onDelete={() => onDeletePage(page.id)}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Flat view for filtered results
            <div className="space-y-1">
              {filteredPages().map((page) => (
                <PageItem
                  key={page.id}
                  page={page}
                  isSelected={selectedPage?.id === page.id}
                  onSelect={() => onPageSelect(page)}
                  onToggleStar={() => onToggleStar(page.id)}
                  onDelete={() => onDeletePage(page.id)}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

interface PageItemProps {
  page: MindPage;
  isSelected: boolean;
  onSelect: () => void;
  onToggleStar: () => void;
  onDelete: () => void;
  formatDate: (date: string) => string;
}

const PageItem = ({ page, isSelected, onSelect, onToggleStar, onDelete, formatDate }: PageItemProps) => {
  const getPreview = (content: string) => {
    // Strip HTML and get first 60 characters
    const text = content.replace(/<[^>]*>/g, '').trim();
    return text.length > 60 ? text.substring(0, 60) + '...' : text;
  };

  return (
    <div
      className={cn(
        "group relative p-3 rounded-lg cursor-pointer transition-all hover:bg-slate-50",
        isSelected && "bg-blue-50 border-l-2 border-blue-500"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className={cn(
              "font-medium truncate text-sm",
              isSelected ? "text-blue-900" : "text-slate-900"
            )}>
              {page.title}
            </h4>
            {page.is_starred && (
              <Star className="w-3 h-3 text-yellow-500 fill-current flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-slate-500 mb-2 line-clamp-2">
            {getPreview(page.content) || "No content"}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {formatDate(page.updated_at)}
            </span>
            {page.tags.length > 0 && (
              <div className="flex space-x-1">
                {page.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-1.5 py-0.5 text-xs bg-slate-100 text-slate-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {page.tags.length > 2 && (
                  <span className="text-xs text-slate-400">+{page.tags.length - 2}</span>
                )}
              </div>
            )}
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 h-6 w-6 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onToggleStar(); }}>
              {page.is_starred ? (
                <>
                  <StarOff className="w-4 h-4 mr-2" />
                  Unstar
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 mr-2" />
                  Star
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
