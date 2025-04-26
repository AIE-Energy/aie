
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
