import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DrawsPage from "./pages/DrawsPage"; // Import the new DrawsPage
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react"; // Import Analytics

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="bottom-right" theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/draws" element={<DrawsPage />} /> {/* Add the new route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    <Analytics /> {/* Voeg de Analytics component hier toe */}
  </QueryClientProvider>
);

export default App;