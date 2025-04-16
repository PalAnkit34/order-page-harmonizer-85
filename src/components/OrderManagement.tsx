
import React, { useState, useEffect } from 'react';
import { FileUp, Printer, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OrderManagementProps {
  selectedOrder?: any;
  onOrderDataChange?: (orderData: any) => void;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({ 
  selectedOrder, 
  onOrderDataChange 
}) => {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderDate, setOrderDate] = useState<Date | undefined>(undefined);
  const [orderStatus, setOrderStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);

  // Update form when selectedOrder changes
  useEffect(() => {
    if (selectedOrder) {
      setCompanyName(selectedOrder.customerName || selectedOrder.customer_name || '');
      setOrderQuantity(selectedOrder.quantity?.toString() || '');
      setOrderStatus(selectedOrder.status || 'pending');
      
      // Convert string date to Date object if it exists
      if (selectedOrder.date || selectedOrder.order_date) {
        try {
          const dateStr = selectedOrder.date || selectedOrder.order_date;
          if (typeof dateStr === 'string') {
            // Handle different date formats
            if (dateStr.includes('/')) {
              const dateParts = dateStr.split('/');
              if (dateParts.length === 3) {
                const [month, day, year] = dateParts;
                setOrderDate(new Date(`${year}-${month}-${day}`));
              }
            } else {
              setOrderDate(new Date(dateStr));
            }
          } else if (dateStr instanceof Date) {
            setOrderDate(dateStr);
          }
        } catch (error) {
          console.error('Error parsing date:', error);
        }
      }

      // Call the callback with the order data
      if (onOrderDataChange) {
        onOrderDataChange({
          customer_name: selectedOrder.customerName || selectedOrder.customer_name,
          quantity: parseInt(selectedOrder.quantity) || 0,
          order_date: selectedOrder.date || selectedOrder.order_date,
          status: selectedOrder.status || 'pending',
          id: selectedOrder.id
        });
      }
    }
  }, [selectedOrder, onOrderDataChange]);

  // Call the callback whenever form data changes
  useEffect(() => {
    if (onOrderDataChange) {
      onOrderDataChange({
        customer_name: companyName,
        quantity: parseInt(orderQuantity) || 0,
        order_date: orderDate,
        status: orderStatus
      });
    }
  }, [companyName, orderQuantity, orderDate, orderStatus, onOrderDataChange]);

  return (
    <div className="border rounded-md p-3 md:p-4 space-y-4 md:space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-0.5">
          <h2 className="text-lg md:text-xl font-bold">Orders</h2>
          <div className="text-xs md:text-sm text-neutral-500 flex items-center gap-1">
            <span>Dashboard</span>
            <span>›</span>
            <span className="text-purple">Orders</span>
          </div>
        </div>
        <div className="flex gap-2 md:gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <FileUp size={16} />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <Printer size={16} />
            <span className="hidden sm:inline">Print</span>
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-3 md:p-4 space-y-3 md:space-y-4">
        <div className="space-y-1 md:space-y-2">
          <label htmlFor="company-name" className="block text-xs md:text-sm font-medium text-neutral-700">
            Company Name
          </label>
          <Input 
            id="company-name"
            placeholder="Enter company name" 
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="space-y-1 md:space-y-2">
            <label htmlFor="order-quantity" className="block text-xs md:text-sm font-medium text-neutral-700">
              Order Quantity
            </label>
            <Input 
              id="order-quantity"
              placeholder="Enter quantity" 
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(e.target.value)}
              className="text-sm"
              type="number"
            />
          </div>
          <div className="space-y-1 md:space-y-2">
            <label htmlFor="order-date" className="block text-xs md:text-sm font-medium text-neutral-700">
              Order Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-neutral-500 font-normal text-sm">
                  {orderDate ? format(orderDate, 'PPP') : 'Select date'}
                  <Calendar className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={orderDate}
                  onSelect={setOrderDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-1 md:space-y-2">
          <label htmlFor="order-status" className="block text-xs md:text-sm font-medium text-neutral-700">
            Order Status
          </label>
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
