
import React from 'react';
import { Link } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard';
import { Button } from '@/components/ui/button';
import { FileText, Printer, Scissors, Factory } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserManagement } from '@/components/UserManagement';

const DashboardPage = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Welcome, {user?.name || 'User'}
          </h1>
          
          {!isMobile && (
            <div className="flex gap-3">
              {user?.role === 'admin' && (
                <Button variant="outline" asChild className="md:flex hidden">
                  <Link to="/orders" className="flex items-center gap-2">
                    <FileText size={18} />
                    View All Orders
                  </Link>
                </Button>
              )}
              
              {(user?.role === 'admin' || user?.role === 'printing') && (
                <Button variant="outline" asChild className="md:flex hidden">
                  <Link to="/printing" className="flex items-center gap-2">
                    <Printer size={18} />
                    Printing Dashboard
                  </Link>
                </Button>
              )}
              
              {(user?.role === 'admin' || user?.role === 'cutting') && (
                <Button variant="outline" asChild className="md:flex hidden">
                  <Link to="/cutting" className="flex items-center gap-2">
                    <Scissors size={18} />
                    Cutting Dashboard
                  </Link>
                </Button>
              )}
              
              {user?.role === 'admin' && (
                <Button variant="outline" asChild className="md:flex hidden">
                  <Link to="/assembly" className="flex items-center gap-2">
                    <Factory size={18} />
                    Assembly Line
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Dashboard />
        </div>
        
        {user?.role === 'admin' && (
          <>
            <div className="mt-6">
              <Button variant="default" asChild>
                <Link to="/create-order" className="flex items-center gap-2">
                  Create New Order
                </Link>
              </Button>
            </div>
            
            <UserManagement />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
