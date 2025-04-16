
import React, { useState, useEffect } from 'react';
import { OrderCard } from './OrderCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OrdersListProps {
  filteredOrders?: any[];
  onViewDetails: (order: any) => void;
  filter?: string;
}

export const OrdersList: React.FC<OrdersListProps> = ({ 
  filteredOrders, 
  onViewDetails,
  filter = 'all'
}) => {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If filteredOrders is provided, use that instead of fetching
    if (filteredOrders) {
      setOrders(filteredOrders);
      setLoading(false);
      return;
    }
    
    const fetchOrders = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
          
        // Apply filter if needed
        if (filter !== 'all') {
          query = query.eq('status', filter);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Format the data for display
        const formattedOrders = data.map(order => ({
          id: order.id,
          customerName: order.customer_name,
          productType: 'Bags',  // Default product type for now
          quantity: order.quantity,
          date: new Date(order.order_date).toLocaleDateString(),
          status: order.status,
          total: order.quantity * 10,  // Placeholder calculation
          details: {
            piping: 'Standard',
            colors: 'Multi',
            handles: 'Regular',
            additionalFeatures: 'None',
            accessories: 'None',
            specifications: 'Standard'
          }
        }));
        
        setOrders(formattedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch orders. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [filteredOrders, filter, toast]);

  if (loading) {
    return (
      <div className="text-center p-8">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center p-8">
        <p>No orders found. Create an order to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <OrderCard 
          key={order.id}
          order={order} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
};
