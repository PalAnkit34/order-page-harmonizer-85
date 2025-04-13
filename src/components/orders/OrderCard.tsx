
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, User, Package, Calendar } from 'lucide-react';

interface OrderCardProps {
  order: {
    id: string;
    customerName: string;
    productType: string;
    quantity: number;
    date: string;
    status: string;
    total: number;
    details: Record<string, string>;
  };
  onViewDetails: (order: any) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <div className="h-5 w-5 text-green-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg></div>;
      case 'pending':
        return <div className="h-5 w-5 text-amber-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>;
      case 'in-progress':
        return <div className="h-5 w-5 text-blue-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></div>;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      default:
        return status;
    }
  };

  return (
    <Card key={order.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className={`h-2 w-full ${
          order.status === 'completed' ? 'bg-green-500' : 
          order.status === 'pending' ? 'bg-amber-500' : 'bg-blue-500'
        }`} />
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold">#{order.id}</h3>
            <div className="flex items-center gap-1 text-sm">
              {getStatusIcon(order.status)}
              <span>{getStatusText(order.status)}</span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{order.productType} × {order.quantity}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{order.date}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="font-medium">${order.total.toLocaleString()}</div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(order)}
              className="flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
