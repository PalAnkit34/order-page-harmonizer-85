
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Printer } from 'lucide-react';

interface OrdersHeaderProps {
  onAddPrintingDetails?: () => void;
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({ onAddPrintingDetails }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <Button variant="outline" asChild>
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </Button>
      <div className="flex items-center gap-2">
        {onAddPrintingDetails && (
          <Button 
            onClick={onAddPrintingDetails}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Printer size={18} />
            <Plus size={18} />
            Add Printing Details
          </Button>
        )}
        <Button asChild variant="default">
          <Link to="/create-order" className="flex items-center gap-2">
            Create New Order
          </Link>
        </Button>
      </div>
    </div>
  );
};
