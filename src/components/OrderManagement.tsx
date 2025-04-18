
import React, { useState } from 'react';
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
import { orderService } from '@/services/orderService';
import { useToast } from '@/components/ui/use-toast';

export const OrderManagement = () => {
  const [companyName, setCompanyName] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [orderDate, setOrderDate] = useState<Date | undefined>(undefined);
  const [orderStatus, setOrderStatus] = useState('');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!companyName || !orderQuantity || !orderDate || !orderStatus) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    try {
      await orderService.submitOrder({
        companyName,
        orderQuantity,
        orderDate: format(orderDate, 'yyyy-MM-dd'),
        orderStatus,
      });

      toast({
        title: "Success",
        description: "Order submitted successfully",
      });

      // Reset form
      setCompanyName('');
      setOrderQuantity('');
      setOrderDate(undefined);
      setOrderStatus('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit order",
      });
    }
  };

  return (
    <div className="border rounded-md p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold">Orders</h2>
          <div className="text-sm text-neutral-500 flex items-center gap-1">
            <span>Dashboard</span>
            <span>›</span>
            <span className="text-purple">Orders</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <FileUp size={18} />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={18} />
            Print
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-4 space-y-4">
        <div className="space-y-2">
          <label htmlFor="company-name" className="block text-sm font-medium text-neutral-700">
            Company Name
          </label>
          <Input 
            id="company-name"
            placeholder="Enter company name" 
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="order-quantity" className="block text-sm font-medium text-neutral-700">
              Order Quantity
            </label>
            <Input 
              id="order-quantity"
              placeholder="Enter quantity" 
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="order-date" className="block text-sm font-medium text-neutral-700">
              Order Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-neutral-500 font-normal">
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

        <div className="space-y-2">
          <label htmlFor="order-status" className="block text-sm font-medium text-neutral-700">
            Order Status
          </label>
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            <SelectTrigger>
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

        <Button 
          className="w-full mt-4" 
          onClick={handleSubmit}
        >
          Submit Order
        </Button>
      </div>
    </div>
  );
};
