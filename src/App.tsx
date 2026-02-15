import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DrawsPage from "./pages/DrawsPage";
import Legal from "./pages/Legal"; 
import NotFound from "./pages/NotFound";
import NumberStatsPage from "./pages/NumberStatsPage"; 
import WikiPage from "./pages/WikiPage";
import StatistiekPage from "./pages/StatistiekPage"; // New
import MeestGevallenNummersPage from "./pages/MeestGevallenNummersPage"; // New
import LuckyStarsPage from "./pages/LuckyStarsPage"; // New
import KansberekeningPage from "./pages/KansberekeningPage"; // New
import PatronenPage from "./pages/PatronenPage"; // New
import AIAnalysePage from "./pages/AIAnalysePage"; // New
import AnalyseToolPage from "./pages/AnalyseToolPage"; // New
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="bottom-right" theme="system" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/generator" element={<Index />} /> {/* Alias for generator */}
          <Route path="/draws" element={<DrawsPage />} />
          <Route path="/historiek" element={<DrawsPage />} /> {/* Alias for historiek */}
          <Route path="/wiki" element={<WikiPage />} />
          <Route path="/legal" element={<Legal />} />
          
          {/* New SEO Hub Pages */}
          <Route path="/statistiek" element={<StatistiekPage />} />
          <Route path="/meest-gevallen-nummers" element={<MeestGevallenNummersPage />} />
          <Route path="/lucky-stars" element={<LuckyStarsPage />} />
          <Route path="/kansberekening" element={<KansberekeningPage />} />
          <Route path="/patronen" element={<PatronenPage />} />
          <Route path="/ai-analyse" element={<AIAnalysePage />} />
          <Route path="/analyse-tool" element={<AnalyseToolPage />} />
          
          <Route path="/nummers/:id" element={<NumberStatsPage type="number" />} />
          <Route path="/sterren/:id" element={<NumberStatsPage type="star" />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    <Analytics />
  </QueryClientProvider>
);

export default App;