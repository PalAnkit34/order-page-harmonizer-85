
import React from 'react';
import { Link } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="mb-6 flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Order Form
            </Link>
          </Button>
          <Button variant="default" asChild>
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
