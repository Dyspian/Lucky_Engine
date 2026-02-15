import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import DrawsPage from "./pages/DrawsPage";
import Legal from "./pages/Legal"; 
import NotFound from "./pages/NotFound";
import NumberStatsPage from "./pages/NumberStatsPage"; 
import WikiPage from "./pages/WikiPage";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="lucky-engine-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner position="bottom-right" theme="system" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/draws" element={<DrawsPage />} />
            <Route path="/wiki" element={<WikiPage />} />
            <Route path="/legal" element={<Legal />} />
            
            <Route path="/nummers/:id" element={<NumberStatsPage type="number" />} />
            <Route path="/sterren/:id" element={<NumberStatsPage type="star" />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      <Analytics />
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;