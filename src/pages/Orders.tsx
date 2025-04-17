
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer, Plus, FileText } from 'lucide-react';
import { OrderDetails } from '@/components/OrderDetails';
import { PrintingForm } from '@/components/PrintingForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { OrdersHeader } from '@/components/orders/OrdersHeader';
import { OrdersFilterBar } from '@/components/orders/OrdersFilterBar';
import { OrdersList } from '@/components/orders/OrdersList';
import { MOCK_ORDERS } from '@/data/mockOrders';

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPrintingFormOpen, setIsPrintingFormOpen] = useState(false);
  const [isNewOrderPrinting, setIsNewOrderPrinting] = useState(false);
  const isMobile = useIsMobile();

  const filteredOrders = activeFilter === 'all' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(order => order.status === activeFilter);

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleAddPrintingDetails = () => {
    if (selectedOrder) {
      setIsPrintingFormOpen(true);
      setIsNewOrderPrinting(false);
    }
  };

  const handleAddNewPrintingDetails = () => {
    setSelectedOrder(null);
    setIsPrintingFormOpen(true);
    setIsNewOrderPrinting(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container max-w-7xl mx-auto py-8 px-4">
        {!isMobile && (
          <OrdersHeader onAddPrintingDetails={handleAddNewPrintingDetails} />
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersFilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <OrdersList filteredOrders={filteredOrders} onViewDetails={handleViewDetails} />
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Order #{selectedOrder?.id} Details</span>
                <Button 
                  onClick={handleAddPrintingDetails}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Printer size={16} />
                  <Plus size={16} />
                  Add Printing Details
                </Button>
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && <OrderDetails order={selectedOrder} />}
          </DialogContent>
        </Dialog>

        <PrintingForm 
          open={isPrintingFormOpen} 
          onOpenChange={setIsPrintingFormOpen}
          orderId={isNewOrderPrinting ? undefined : selectedOrder?.id}
        />

        {isMobile && (
          <div className="fixed bottom-20 right-4 z-10">
            <Button 
              onClick={handleAddNewPrintingDetails}
              size="icon"
              className="rounded-full h-14 w-14 shadow-lg"
            >
              <Plus size={24} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
