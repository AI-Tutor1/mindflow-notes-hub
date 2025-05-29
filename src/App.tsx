
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MindPages from "./pages/MindPages";
import StudyGroups from "./pages/StudyGroups";
import GroupDetail from "./pages/GroupDetail";
import EnhancedStudyGroups from "./pages/EnhancedStudyGroups";
import EnhancedGroupDetail from "./pages/EnhancedGroupDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mindpages" element={<MindPages />} />
          <Route path="/study-groups" element={<EnhancedStudyGroups />} />
          <Route path="/study-groups/:id" element={<EnhancedGroupDetail />} />
          <Route path="/study-groups-old" element={<StudyGroups />} />
          <Route path="/study-groups-old/:id" element={<GroupDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
