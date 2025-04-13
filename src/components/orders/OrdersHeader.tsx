
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const OrdersHeader: React.FC = () => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <Button variant="outline" asChild>
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </Button>
      <div>
        <Button asChild variant="default">
          <Link to="/create-order" className="flex items-center gap-2">
            Create New Order
          </Link>
        </Button>
      </div>
    </div>
  );
};
