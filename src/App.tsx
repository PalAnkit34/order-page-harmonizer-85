
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import PrintingDashboard from "./pages/PrintingDashboard";
import CuttingDashboard from "./pages/CuttingDashboard";
import AssemblyDashboard from "./pages/AssemblyDashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import BottomNavigation from "./components/BottomNavigation";
import { useIsMobile } from "./hooks/use-mobile";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppHeader from "./components/AppHeader";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="relative pb-16 md:pb-0 min-h-screen">
              <AppHeader />
              <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="/" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/create-order" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Index />
                  </ProtectedRoute>
                } />
                
                <Route path="/orders" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Orders />
                  </ProtectedRoute>
                } />
                
                <Route path="/printing" element={
                  <ProtectedRoute allowedRoles={['admin', 'printing']}>
                    <PrintingDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/cutting" element={
                  <ProtectedRoute allowedRoles={['admin', 'cutting']}>
                    <CuttingDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/assembly" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AssemblyDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              {isMobile && <BottomNavigation />}
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
