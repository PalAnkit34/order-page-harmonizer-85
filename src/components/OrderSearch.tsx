
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OrderSearchProps {
  onOrderSelect: (order: any) => void;
}

export const OrderSearch: React.FC<OrderSearchProps> = ({ onOrderSelect }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch and filter orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      if (searchTerm.trim() === '') {
        setFilteredOrders([]);
        return;
      }

      setIsLoading(true);
      try {
        const lowercasedSearch = searchTerm.toLowerCase();
        
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .or(`id.ilike.%${lowercasedSearch}%,customer_name.ilike.%${lowercasedSearch}%`)
          .limit(5);
          
        if (error) throw error;
        
        setFilteredOrders(data || []);
        if (data && data.length > 0) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: 'Error searching orders',
          description: error.message || 'Failed to fetch orders. Please try again.',
          variant: 'destructive'
        });
        setFilteredOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchOrders, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, toast]);

  const handleOrderClick = (order: any) => {
    onOrderSelect(order);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4">
      <Popover open={isOpen && filteredOrders.length > 0} onOpenChange={setIsOpen}>
        <div className="relative flex w-full max-w-lg items-center">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <PopoverTrigger asChild>
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search orders by ID or customer name"
                className="pl-8 w-full md:w-80 lg:w-96"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (filteredOrders.length > 0) {
                    setIsOpen(true);
                  }
                }}
              />
            </PopoverTrigger>
          </div>
        </div>
        
        <PopoverContent className="w-[calc(100vw-2rem)] md:w-80 lg:w-96 p-0" align="start">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="max-h-[300px] overflow-auto">
              {filteredOrders.map((order) => (
                <button
                  key={order.id}
                  className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between"
                  onClick={() => handleOrderClick(order)}
                >
                  <div>
                    <p className="font-medium">Order #{order.id?.substring(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {order.status}
                  </span>
                </button>
              ))}
            </div>
          ) : searchTerm.trim() !== '' ? (
            <div className="p-4 text-center text-muted-foreground">
              No orders found
            </div>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
};
