
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  FileText, 
  Check, 
  Clock, 
  RotateCcw,
  User,
  Calendar,
  Package
} from 'lucide-react';
import { OrderDetails } from '@/components/OrderDetails';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for demonstration purposes
const MOCK_ORDERS = [
  {
    id: '001',
    customerName: 'Acme Corp',
    productType: 'Tote Bag',
    quantity: 100,
    date: '2025-04-01',
    status: 'completed',
    total: 4500,
    details: {
      piping: 'Standard',
      colors: 'Blue, White',
      handles: 'Leather',
      additionalFeatures: 'Inner pocket, Zipper closure',
      accessories: 'Custom logo print',
      specifications: 'Water resistant material',
    }
  },
  {
    id: '002',
    customerName: 'Global Enterprises',
    productType: 'Messenger Bag',
    quantity: 50,
    date: '2025-04-05',
    status: 'pending',
    total: 2750,
    details: {
      piping: 'Premium',
      colors: 'Black, Red',
      handles: 'Nylon',
      additionalFeatures: 'Multiple compartments, Padded laptop sleeve',
      accessories: 'Metal buckles',
      specifications: 'Reinforced bottom',
    }
  },
  {
    id: '003',
    customerName: 'Tech Innovations',
    productType: 'Laptop Bag',
    quantity: 75,
    date: '2025-04-08',
    status: 'in-progress',
    total: 3375,
    details: {
      piping: 'Advanced',
      colors: 'Gray, Orange',
      handles: 'Padded',
      additionalFeatures: 'Anti-theft features, RFID blocking',
      accessories: 'USB charging port',
      specifications: 'Shock-proof design',
    }
  },
  {
    id: '004',
    customerName: 'Fashion Forward',
    productType: 'Clutch Bag',
    quantity: 200,
    date: '2025-03-28',
    status: 'completed',
    total: 3000,
    details: {
      piping: 'Deluxe',
      colors: 'Gold, Black',
      handles: 'Chain',
      additionalFeatures: 'Magnetic closure',
      accessories: 'Decorative tassels',
      specifications: 'Satin lining',
    }
  },
  {
    id: '005',
    customerName: 'Outdoor Adventures',
    productType: 'Backpack',
    quantity: 120,
    date: '2025-04-10',
    status: 'pending',
    total: 5400,
    details: {
      piping: 'Heavy-duty',
      colors: 'Green, Khaki',
      handles: 'Padded straps',
      additionalFeatures: 'Hydration system compatibility, Ventilated back panel',
      accessories: 'Compression straps',
      specifications: 'Waterproof material',
    }
  }
];

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const filteredOrders = activeFilter === 'all' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(order => order.status === activeFilter);

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

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
    <div className="min-h-screen bg-neutral-50">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        {!isMobile && (
          <div className="mb-6 flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <Button asChild variant="default">
                <Link to="/create-order" className="flex items-center gap-2">
                  Create New Order
                </Link>
              </Button>
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Orders</CardTitle>
          </CardHeader>
          <CardContent>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOrders.map((order) => (
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
                          onClick={() => handleViewDetails(order)}
                          className="flex items-center gap-1"
                        >
                          <FileText className="h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Order #{selectedOrder?.id} Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && <OrderDetails order={selectedOrder} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Orders;
