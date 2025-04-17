
import React from 'react';
import { OrderCard } from './OrderCard';

interface OrdersListProps {
  filteredOrders: Array<{
    id: string;
    customerName: string;
    productType: string;
    quantity: number;
    date: string;
    status: string;
    total: number;
    details: Record<string, string>;
  }>;
  onViewDetails: (order: any) => void;
}

export const OrdersList: React.FC<OrdersListProps> = ({ 
  filteredOrders, 
  onViewDetails 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredOrders.map((order) => (
        <OrderCard 
          key={order.id}
          order={order} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
};
