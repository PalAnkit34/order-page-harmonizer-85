
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clock, RotateCcw } from 'lucide-react';

interface OrdersFilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const OrdersFilterBar: React.FC<OrdersFilterBarProps> = ({ 
  activeFilter, 
  setActiveFilter 
}) => {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      <Button 
        variant={activeFilter === 'all' ? 'default' : 'outline'} 
        onClick={() => setActiveFilter('all')}
        size="sm"
      >
        All
      </Button>
      <Button 
        variant={activeFilter === 'pending' ? 'default' : 'outline'} 
        onClick={() => setActiveFilter('pending')}
        className="flex items-center gap-1"
        size="sm"
      >
        <Clock className="h-4 w-4" />
        Pending
      </Button>
      <Button 
        variant={activeFilter === 'in-progress' ? 'default' : 'outline'} 
        onClick={() => setActiveFilter('in-progress')}
        className="flex items-center gap-1"
        size="sm"
      >
        <RotateCcw className="h-4 w-4" />
        In Progress
      </Button>
      <Button 
        variant={activeFilter === 'completed' ? 'default' : 'outline'} 
        onClick={() => setActiveFilter('completed')}
        className="flex items-center gap-1"
        size="sm"
      >
        <Check className="h-4 w-4" />
        Completed
      </Button>
    </div>
  );
};
