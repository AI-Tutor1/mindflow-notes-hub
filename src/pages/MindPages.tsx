
import { useState, useEffect } from "react";
import { Brain, Search, Plus, Star, Folder, Tag, Download, ArrowLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MindPageEditor } from "@/components/MindPageEditor";
import { PageSidebar } from "@/components/PageSidebar";
import { cn } from "@/lib/utils";

export interface MindPage {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  is_starred: boolean;
  folder?: string;
}

const MindPages = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState<MindPage | null>(null);
  const [pages, setPages] = useState<MindPage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    const samplePages: MindPage[] = [
      {
        id: "1",
        title: "Mathematics Chapter 5 Notes",
        content: "<h2>Calculus Fundamentals</h2><p>Key concepts and formulas for derivatives and integrals...</p>",
        tags: ["mathematics", "calculus", "study"],
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        is_starred: true,
        folder: "Study Notes"
      },
      {
        id: "2",
        title: "Project Ideas - AI Application",
        content: "<h2>AI Project Concepts</h2><ul><li>Chatbot for student support</li><li>Automated essay grading</li><li>Personalized learning paths</li></ul>",
        tags: ["projects", "ai", "ideas"],
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        is_starred: false,
        folder: "Projects"
      },
      {
        id: "3",
        title: "Daily Reflection",
        content: "<p>Today I learned about quantum mechanics. The concept of superposition is fascinating...</p>",
        tags: ["reflection", "daily", "physics"],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_starred: false,
        folder: "Personal"
      }
    ];
    setPages(samplePages);
    setSelectedPage(samplePages[0]);
  }, []);

  const createNewPage = () => {
    const newPage: MindPage = {
      id: Date.now().toString(),
      title: "Untitled Page",
      content: "",
      tags: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_starred: false,
    };
    setPages(prev => [newPage, ...prev]);
    setSelectedPage(newPage);
    setIsCreating(true);
  };

  const updatePage = (updatedPage: MindPage) => {
    setPages(prev => prev.map(page => 
      page.id === updatedPage.id 
        ? { ...updatedPage, updated_at: new Date().toISOString() }
        : page
    ));
    setSelectedPage(updatedPage);
    setIsCreating(false);
  };

  const deletePage = (pageId: string) => {
    setPages(prev => prev.filter(page => page.id !== pageId));
    if (selectedPage?.id === pageId) {
      const remainingPages = pages.filter(page => page.id !== pageId);
      setSelectedPage(remainingPages.length > 0 ? remainingPages[0] : null);
    }
  };

  const toggleStar = (pageId: string) => {
    setPages(prev => prev.map(page =>
      page.id === pageId ? { ...page, is_starred: !page.is_starred } : page
    ));
    if (selectedPage?.id === pageId) {
      setSelectedPage(prev => prev ? { ...prev, is_starred: !prev.is_starred } : null);
    }
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">MindPages</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
          <Button onClick={createNewPage} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Page
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <PageSidebar
          isOpen={sidebarOpen}
          pages={filteredPages}
          selectedPage={selectedPage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onPageSelect={setSelectedPage}
          onToggleStar={toggleStar}
          onDeletePage={deletePage}
        />

        {/* Main Content */}
        <main className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          sidebarOpen ? "lg:ml-0" : ""
        )}>
          {selectedPage ? (
            <MindPageEditor
              page={selectedPage}
              onUpdate={updatePage}
              isCreating={isCreating}
              onCreatingComplete={() => setIsCreating(false)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white">
              <div className="text-center">
                <Brain className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No page selected</h3>
                <p className="text-slate-600 mb-6">Choose a page from the sidebar or create a new one</p>
                <Button onClick={createNewPage} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Page
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MindPages;
