
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MOCK_ORDERS } from '@/data/mockOrders';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';

interface OrderSearchProps {
  onOrderSelect: (order: any) => void;
}

export const OrderSearch: React.FC<OrderSearchProps> = ({ onOrderSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter orders based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOrders([]);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = MOCK_ORDERS.filter(order => 
      order.id.toLowerCase().includes(lowercasedSearch) || 
      order.customerName.toLowerCase().includes(lowercasedSearch)
    ).slice(0, 5); // Limit to 5 results

    setFilteredOrders(filtered);
    if (filtered.length > 0 && searchTerm.trim() !== '') {
      setIsOpen(true);
    }
  }, [searchTerm]);

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
          {filteredOrders.length > 0 ? (
            <div className="max-h-[300px] overflow-auto">
              {filteredOrders.map((order) => (
                <button
                  key={order.id}
                  className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between"
                  onClick={() => handleOrderClick(order)}
                >
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customerName}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {order.status}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No orders found
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
