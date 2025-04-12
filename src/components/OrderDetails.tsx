
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Check, 
  Clock, 
  RotateCcw, 
  Package, 
  Calendar, 
  DollarSign,
  User,
  Settings
} from 'lucide-react';

interface OrderDetailProps {
  order: {
    id: string;
    customerName: string;
    productType: string;
    quantity: number;
    date: string;
    status: string;
    total: number;
    details: {
      piping: string;
      colors: string;
      handles: string;
      additionalFeatures: string;
      accessories: string;
      specifications: string;
    };
  };
}

export const OrderDetails: React.FC<OrderDetailProps> = ({ order }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'in-progress':
        return <RotateCcw className="h-5 w-5 text-blue-500" />;
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
    <div className="space-y-6 py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-sm font-medium leading-none">Customer</p>
              <p className="text-sm text-muted-foreground">{order.customerName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-sm font-medium leading-none">Product</p>
              <p className="text-sm text-muted-foreground">{order.productType}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div>
              <p className="text-sm font-medium leading-none">Quantity</p>
              <p className="text-sm text-muted-foreground">{order.quantity}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-sm font-medium leading-none">Order Date</p>
              <p className="text-sm text-muted-foreground">{order.date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {getStatusIcon(order.status)}
            <div>
              <p className="text-sm font-medium leading-none">Status</p>
              <p className="text-sm text-muted-foreground">{getStatusText(order.status)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-sm font-medium leading-none">Total Amount</p>
              <p className="text-sm text-muted-foreground">${order.total.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Order Timeline</CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Created</span>
                <span className="text-green-500">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Processing</span>
                {order.status === 'in-progress' || order.status === 'completed' ? (
                  <span className="text-green-500">✓</span>
                ) : (
                  <span className="text-gray-300">○</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Completed</span>
                {order.status === 'completed' ? (
                  <span className="text-green-500">✓</span>
                ) : (
                  <span className="text-gray-300">○</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Product Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2">
                <span className="font-medium">Piping:</span>
                <span>{order.details.piping}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Colors:</span>
                <span>{order.details.colors}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Handles:</span>
                <span>{order.details.handles}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Additional Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2">
                <span className="font-medium">Features:</span>
                <span>{order.details.additionalFeatures}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Accessories:</span>
                <span>{order.details.accessories}</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="font-medium">Specifications:</span>
                <span>{order.details.specifications}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
