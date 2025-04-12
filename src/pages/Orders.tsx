
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
  RotateCcw 
} from 'lucide-react';
import { OrderDetails } from '@/components/OrderDetails';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
        <div className="mb-6 flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link to="/dashboard" className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <Button asChild variant="default">
              <Link to="/" className="flex items-center gap-2">
                Create New Order
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'} 
                onClick={() => setActiveFilter('all')}
              >
                All Orders
              </Button>
              <Button 
                variant={activeFilter === 'pending' ? 'default' : 'outline'} 
                onClick={() => setActiveFilter('pending')}
                className="flex items-center gap-1"
              >
                <Clock className="h-4 w-4" />
                Pending
              </Button>
              <Button 
                variant={activeFilter === 'in-progress' ? 'default' : 'outline'} 
                onClick={() => setActiveFilter('in-progress')}
                className="flex items-center gap-1"
              >
                <RotateCcw className="h-4 w-4" />
                In Progress
              </Button>
              <Button 
                variant={activeFilter === 'completed' ? 'default' : 'outline'} 
                onClick={() => setActiveFilter('completed')}
                className="flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Completed
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.productType}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>${order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetails(order)}
                          className="flex items-center gap-1"
                        >
                          <FileText className="h-4 w-4" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
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
