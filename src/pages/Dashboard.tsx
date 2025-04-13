
import React from 'react';
import { Link } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard';
import { Button } from '@/components/ui/button';
import { FileText, Printer } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="mb-6 flex justify-end items-center gap-3">
          <Button variant="outline" asChild className="md:flex hidden">
            <Link to="/printing" className="flex items-center gap-2">
              <Printer size={18} />
              Printing Dashboard
            </Link>
          </Button>
          <Button variant="default" asChild className="md:flex hidden">
            <Link to="/orders" className="flex items-center gap-2">
              <FileText size={18} />
              View All Orders
            </Link>
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
