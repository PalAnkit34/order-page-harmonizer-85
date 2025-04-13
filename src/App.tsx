
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import PrintingDashboard from "./pages/PrintingDashboard";
import CuttingDashboard from "./pages/CuttingDashboard";
import NotFound from "./pages/NotFound";
import BottomNavigation from "./components/BottomNavigation";
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative pb-16 md:pb-0 min-h-screen">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-order" element={<Index />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/printing" element={<PrintingDashboard />} />
              <Route path="/cutting" element={<CuttingDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {isMobile && <BottomNavigation />}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
